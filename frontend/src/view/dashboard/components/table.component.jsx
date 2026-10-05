import { ROLES, USER_STATUS, NEXT_USER_STATUS } from "@/config/constants";
import { useState } from "react";
import { useAllUsers } from "@/hooks/users/useAllUsers.hooks";
import { useUpdateStatusUsers } from "@/hooks/users/useUpdateStatusUsers.hooks";
import { renderIcon } from "@/utils/icons.utils";
import NoDataFound from "@/components/handleError/NotFound";
import { useUpdateUsers } from "@/hooks/users/useUpdateUsers.hooks";
import { useSingleUsers } from "@/hooks/users/useSingleUsers.hooks";
import FormComponent from "@/components/form.component";
import { useTranslation } from "react-i18next";
import TableLoading from "@/components/loading/table.loading";
import { useDebounce } from "@/hooks/useDebounce";
import { adminUserSchema } from "@/utils/schemas";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function TableComponent({ search, sort, filter }) {
  const debouncedSearchTerm = useDebounce(search ?? "");
  const { users, loadingUsers } = useAllUsers({
    search: debouncedSearchTerm,
    sort,
    filter: JSON.stringify(filter),
  });
  const { updateUsers } = useUpdateUsers();
  const [selectedUserId, setSelectedUserId] = useState(null);
  const { updateStatus, loadingUpdateStatus } = useUpdateStatusUsers();
  const { user, loadingSingleUsers } = useSingleUsers(selectedUserId);
  const [actionMenu, setActionMenu] = useState(null);
  const { t } = useTranslation();

  //_ tutup popover aksi begitu data user selesai dimuat
  const closeActionMenu = () => setActionMenu(null);

  return (
    <>
      <div className="w-full overflow-x-scroll rounded-xl border border-gray-200 dark:border-neutral-800">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 dark:bg-neutral-900">
            <tr className="text-left text-gray-700 dark:text-neutral-200">
              <th className="px-4 py-3 whitespace-nowrap">No</th>
              <th className="px-4 py-3 whitespace-nowrap">Profile</th>
              <th className="px-4 py-3 whitespace-nowrap">Username</th>
              <th className="px-4 py-3 whitespace-nowrap">Email</th>
              <th className="px-4 py-3 whitespace-nowrap">Role</th>
              <th className="px-4 py-3 whitespace-nowrap">Status</th>
              <th className="px-4 py-3 whitespace-nowrap">Verified</th>
              <th className="px-4 py-3 whitespace-nowrap">Total Recipe</th>
              <th className="px-4 py-3 whitespace-nowrap">Action</th>
            </tr>
          </thead>

          <tbody className="bg-white dark:bg-neutral-950 text-gray-700 dark:text-neutral-200">
            {loadingUsers ? (
              Array.from({ length: 12 }).map((_, i) => {
                return <TableLoading key={i} />;
              })
            ) : users?.length > 0 ? (
              Array.isArray(users) &&
              users?.map((user, index) => (
                <tr
                  key={user?.id}
                  className="border-t border-gray-200 dark:border-neutral-800 hover:bg-gray-50 dark:hover:bg-neutral-900"
                >
                  <td className="px-4 py-3 whitespace-nowrap">{index + 1}</td>

                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex justify-center">
                      {user?.profile && user.profile.startsWith("data:image") ? (
                        <img
                          src={user.profile}
                          alt="profile"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-200 dark:bg-neutral-800 rounded-full flex items-center justify-center">
                          {renderIcon("User", {
                            className: "w-5 h-5 text-gray-500",
                          })}
                        </div>
                      )}
                    </div>
                  </td>

                  <td className="px-4 py-3 whitespace-nowrap">
                    {user?.username}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">{user?.email}</td>
                  <td className="px-4 py-3 whitespace-nowrap capitalize">
                    {user?.role}
                  </td>

                  <td className="px-4 py-3 whitespace-nowrap">
                    {user?.is_active === USER_STATUS.ACTIVE ? (
                      <span className="text-green-600 font-semibold">
                        {t("dashboard.admin.users.filter_status.active")}
                      </span>
                    ) : user?.is_active === USER_STATUS.BANNED ? (
                      <span className="text-red-500 font-semibold">
                        {t("dashboard.admin.users.banned")}
                      </span>
                    ) : user?.is_active === USER_STATUS.DELETED ? (
                      <span className="text-red-500 font-semibold">
                        {t("dashboard.admin.users.deletes")}
                      </span>
                    ) : (
                      <span className="text-orange-500 font-semibold">
                        {t("dashboard.admin.users.filter_status.in_active")}
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-3 whitespace-nowrap">
                    {user?.is_verified === "verified" ? (
                      <span className="text-green-600 font-semibold">
                        {t("dashboard.admin.users.filter_verified.verified")}
                      </span>
                    ) : (
                      <span className="text-yellow-500 font-semibold">
                        {t("dashboard.admin.users.filter_verified.in_verified")}
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-3 whitespace-nowrap">
                    {user?.role === ROLES.CHIEF ? user?.recipes?.length : "-"}
                  </td>

                  <td className="px-4 py-3 whitespace-nowrap relative">
                    <Popover>
                      <PopoverTrigger
                        render={
                          <button
                            onClick={() => {
                              setActionMenu(
                                actionMenu?.id === user?.id
                                  ? null
                                  : {
                                      id: user?.id,
                                      userss: user,
                                    },
                              );
                            }}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-300"
                          >
                            {renderIcon("EllipsisVertical", {
                              className: "w-6 h-6",
                            })}
                          </button>
                        }
                      />
                      <PopoverContent align="end" className="w-40 p-0 ring-0">
                        <div
                          className={`fixed z-9999 w-44 rounded-xl border border-gray-200 dark:bg-neutral-800 dark:border-none bg-white p-2 flex flex-col gap-3 shadow-xl`}
                        >
                          <button
                            disabled={loadingSingleUsers}
                            className="w-full rounded-lg px-3 py-2 text-left text-green-600 hover:bg-green-50 dark:hover:bg-green-500/10"
                            onClick={() => {
                              setSelectedUserId(actionMenu?.userss?.id);
                              closeActionMenu();
                            }}
                          >
                            {loadingSingleUsers ? (
                              <span className="animate-spin inline-block w-5 h-5 border-4 border-white-500 rounded-full border-t-transparent"></span>
                            ) : (
                              <span>{t("dashboard.admin.users.edit")}</span>
                            )}
                          </button>

                          <button
                            type="button"
                            disabled={loadingUpdateStatus}
                            className="w-full rounded-lg px-3 py-2 text-left text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 disabled:pointer-events-none disabled:opacity-50"
                            onClick={async () => {
                              if (
                                loadingUpdateStatus ||
                                !actionMenu?.userss?.id
                              )
                                return;

                              const user = actionMenu.userss;
                              const nextStatus = NEXT_USER_STATUS[user.is_active];

                              if (!nextStatus) return;

                              try {
                                await updateStatus({
                                  id: user.id,
                                  payload: {
                                    is_active: nextStatus,
                                  },
                                });

                                closeActionMenu();
                              } catch (err) {
                                //_ pesan sudah ditampilkan oleh hook
                                console.error(err);
                              }
                            }}
                          >
                            {loadingUpdateStatus ? (
                              <span className="inline-block w-5 h-5 animate-spin rounded-full border-4 border-white border-t-transparent" />
                            ) : actionMenu?.userss?.is_active === USER_STATUS.ACTIVE ? (
                              <span>{t("dashboard.admin.users.banned")}</span>
                            ) : actionMenu?.userss?.is_active === USER_STATUS.BANNED ? (
                              <span>{t("dashboard.admin.users.unbanned")}</span>
                            ) : actionMenu?.userss?.is_active === USER_STATUS.DELETED ? (
                              <span>{t("dashboard.admin.users.restore")}</span>
                            ) : (
                              <span>{t("dashboard.admin.users.banned")}</span>
                            )}
                          </button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </td>
                </tr>
              ))
            ) : debouncedSearchTerm ? (
              <tr>
                <td colSpan="9" className="px-4 py-10 text-center">
                  <NoDataFound
                    type={"search"}
                    title={t("common.no_data_found.users.search.title")}
                    subtitle={`${t("common.no_data_found.users.search.subtitle.users")} ${debouncedSearchTerm} ${t("common.no_data_found.users.search.subtitle.not_found")}`}
                  />
                </td>
              </tr>
            ) : (
              <tr>
                <td colSpan="9" className="px-4 py-10 text-center">
                  <NoDataFound
                    title={t("common.no_data_found.users.empty.title")}
                    subtitle={t("common.no_data_found.users.empty.subtitle")}
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <FormComponent
        schema={adminUserSchema}
        initialData={user}
        showForm={selectedUserId === user?.id}
        onClose={() => setSelectedUserId(null)}
        title={t("dashboard.admin.users.form.title")}
        fields={[
          {
            name: "username",
            label: t("dashboard.admin.users.form.username"),
            type: "text",
          },
          {
            name: "email",
            label: t("dashboard.admin.users.form.email"),
            type: "email",
          },
          {
            name: "profile",
            label: t("dashboard.admin.users.form.profile"),
            type: "text",
          },
          {
            name: "role",
            label: t("dashboard.admin.users.form.role"),
            type: "select",
            options: [
              { value: ROLES.USER, label: t("dashboard.admin.users.role.user") },
              { value: ROLES.ADMIN, label: t("dashboard.admin.users.role.admin") },
              { value: ROLES.CHIEF, label: t("dashboard.admin.users.role.chief") },
            ],
          },
          {
            name: "gender",
            label: t("dashboard.admin.users.form.gender.title"),
            required: true,
            type: "select",
            options: [
              {
                value: "male",
                label: t("dashboard.admin.users.form.gender.options.male"),
              },
              {
                value: "female",
                label: t("dashboard.admin.users.form.gender.options.female"),
              },
            ],
          },
          {
            name: "is_active",
            label: t("dashboard.admin.users.form.is_active.title"),
            required: true,
            type: "select",
            options: [
              {
                value: USER_STATUS.ACTIVE,
                label: t("dashboard.admin.users.form.is_active.options.active"),
              },
              {
                value: USER_STATUS.IN_ACTIVE,
                label: t(
                  "dashboard.admin.users.form.is_active.options.in_active",
                ),
              },
              {
                value: USER_STATUS.BANNED,
                label: t("dashboard.admin.users.form.is_active.options.banned"),
              },
            ],
          },
          {
            name: "is_verified",
            label: t("dashboard.admin.users.form.is_verified.title"),
            type: "select",
            options: [
              {
                value: "verified",
                label: t(
                  "dashboard.admin.users.form.is_verified.options.verified",
                ),
              },
              {
                value: "in_verified",
                label: t(
                  "dashboard.admin.users.form.is_verified.options.in_verified",
                ),
              },
            ],
          },
        ]}
        defaultForm={{
          username: "",
          email: "",
          profile: "",
          role: ROLES.USER,
          gender: "male",
          is_active: USER_STATUS.ACTIVE,
          is_verified: "in_verified",
        }}
        onSubmit={async (form) => {
          await updateUsers({ id: selectedUserId, payload: form });

          setSelectedUserId(null);

          return true;
        }}
      />
    </>
  );
}
