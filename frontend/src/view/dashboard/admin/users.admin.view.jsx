import TableComponent from "@/view/dashboard/components/table.component";
import { useState } from "react";
import { renderIcon } from "@/utils/icons.utils";
import Modal from "@/components/modal.component";
import { useDebounce } from "@/hooks/useDebounce";
import { useSearchLoading } from "@/hooks/useSearchLoading";
import { ROLES, USER_STATUS } from "@/config/constants";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useTranslation } from "react-i18next";

const selectTriggerClass =
  "w-full h-12 rounded-lg ring ring-neutral-600 dark:ring-neutral-500 bg-white dark:bg-neutral-900 dark:text-orange-500 px-4 text-slate-800 shadow-sm focus:ring-2 focus:ring-orange-500";

const selectContentClass =
  "rounded-lg border border-slate-200 bg-white dark:bg-neutral-900 dark:text-neutral-400 text-slate-800 shadow-lg";

const selectItemClass =
  "cursor-pointer focus:bg-orange-50 dark:focus:bg-orange-500/10 dark:focus-text-orange-500 focus:text-orange-600";

const selectLabelClass =
  "px-2 py-2 text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-orange-500";

export default function UsersAdminView() {
  const [formFilter, setFormFilter] = useState({
    role: "",
    is_active: "",
    is_verified: "",
  });
  const [sort, setSort] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [onFilterChangeFinal, setOnFilterChangeFinal] = useState({});
  const { t } = useTranslation();

  const debouncedSearchTerm = useDebounce(searchTerm);
  const loadingSearch = useSearchLoading(searchTerm, false);

  const filterRole = [
    {
      value: "all",
      label: t("dashboard.admin.users.filter_role.all"),
    },
    {
      value: ROLES.ADMIN,
      label: t("dashboard.admin.users.filter_role.admin"),
    },
    {
      value: ROLES.CHIEF,
      label: t("dashboard.admin.users.filter_role.chief"),
    },
    {
      value: ROLES.USER,
      label: t("dashboard.admin.users.filter_role.users"),
    },
  ];

  const filterStatus = [
    {
      value: "all",
      label: t("dashboard.admin.users.filter_status.all"),
    },
    {
      value: USER_STATUS.ACTIVE,
      label: t("dashboard.admin.users.filter_status.active"),
    },
    {
      value: USER_STATUS.IN_ACTIVE,
      label: t("dashboard.admin.users.filter_status.in_active"),
    },
    {
      value: USER_STATUS.BANNED,
      label: t("dashboard.admin.users.filter_status.banned"),
    },
    {
      value: USER_STATUS.DELETED,
      label: t("dashboard.admin.users.filter_status.deletes"),
    },
  ];

  const filterVerify = [
    {
      value: "all",
      label: t("dashboard.admin.users.filter_verified.all"),
    },
    {
      value: "verified",
      label: t("dashboard.admin.users.filter_verified.verified"),
    },
    {
      value: "in_verified",
      label: t("dashboard.admin.users.filter_verified.in_verified"),
    },
  ];

  const filterSort = [
    {
      value: "all",
      label: t("dashboard.admin.users.filter_sort.all"),
    },
    {
      value: "asc",
      label: "A-Z",
    },
    {
      value: "desc",
      label: "Z-A",
    },
  ];

  const filterRoleLabel = {
    all: t("dashboard.admin.users.filter_role.all"),
    admin: t("dashboard.admin.users.filter_role.admin"),
    chief: t("dashboard.admin.users.filter_role.chief"),
    users: t("dashboard.admin.users.filter_role.users"),
  };

  const filterStatusLabel = {
    all: t("dashboard.admin.users.filter_status.all"),
    active: t("dashboard.admin.users.filter_status.active"),
    in_active: t("dashboard.admin.users.filter_status.in_active"),
  };

  const filterVerifyLabel = {
    all: t("dashboard.admin.users.filter_verified.all"),
    verified: t("dashboard.admin.users.filter_verified.verified"),
    in_verified: t("dashboard.admin.users.filter_verified.in_verified"),
  };

  const filterSortLabel = {
    all: t("dashboard.admin.users.filter_sort.all"),
    asc: "A-Z",
    desc: "Z-A",
  };

  const handleConfirmFilter = () => {
    const filter = Object.fromEntries(
      Object.entries(formFilter).map(([key, value]) => [
        key,
        value === "all" ? "" : value,
      ]),
    );

    setOnFilterChangeFinal(filter);
    setIsModalOpen(false);
  };

  return (
    <>
      <main className="flex flex-col bg-white dark:bg-neutral-900 rounded-2xl w-full p-5 gap-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          {/* Title + Mobile Menu */}
          <div className="flex items-center justify-between gap-3">
            <h1 className="font-bold text-2xl md:w-fit dark:text-orange-500">
              {t("dashboard.admin.users.title")}
            </h1>

            {/* Mobile: Sort + Filter */}
            <div className="flex items-center gap-3 md:hidden">
              <div className="w-20">
                <Select
                  value={filterSortLabel[sort] || ""}
                  onValueChange={setSort}
                >
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue
                      placeholder={t("dashboard.admin.users.filter_sort.all")}
                    />
                  </SelectTrigger>

                  <SelectContent className={selectContentClass}>
                    <SelectGroup>
                      <SelectLabel>
                        {t("dashboard.admin.users.filter_sort.title")}
                      </SelectLabel>

                      {Array.isArray(filterSort) &&
                        filterSort.map((item) => (
                          <SelectItem
                            className={selectItemClass}
                            value={item.value}
                            key={item.value}
                          >
                            {item.label}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <button
                className="h-10 w-10 flex items-center justify-center rounded-lg border border-slate-300 dark:border-neutral-500 dark:text-neutral-500 hover:border-orange-500 hover:text-orange-500"
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                {renderIcon("ListFilter", {
                  className: "w-5 h-5",
                })}
              </button>
            </div>
          </div>

          {/* Search + Desktop Menu */}
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-end">
            {/* Search */}
            <div className="flex items-center w-full md:w-auto relative">
              <input
                type="text"
                placeholder={t("common.recipe.text_search")}
                className="w-full sm:w-70 md:w-100 h-10 rounded-lg bg-white dark:bg-neutral-800 dark:placeholder:text-neutral-400 shadow-md outline-none p-4 text-md pl-10 pr-12"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <span className="absolute left-2.5">
                {renderIcon("Search", {
                  className: "w-5 h-5 text-slate-400",
                })}
              </span>

              {loadingSearch && (
                <span className="absolute right-5 animate-spin border-3 border-t-transparent w-5 h-5 rounded-full border-orange-500" />
              )}
            </div>

            {/* Desktop: Sort + Filter */}
            <div className="hidden md:flex items-center gap-4">
              <div className="w-25">
                <Select
                  value={filterSortLabel[sort] || ""}
                  onValueChange={setSort}
                >
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue
                      placeholder={t("dashboard.admin.users.filter_sort.all")}
                    />
                  </SelectTrigger>

                  <SelectContent className={selectContentClass}>
                    <SelectGroup>
                      <SelectLabel>
                        {t("dashboard.admin.users.filter_sort.title")}
                      </SelectLabel>

                      {Array.isArray(filterSort) &&
                        filterSort.map((item) => (
                          <SelectItem
                            className={selectItemClass}
                            value={item.value}
                            key={item.value}
                          >
                            {item.label}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <button
                className="h-10 w-10 md:w-20 flex items-center justify-center rounded-lg border border-slate-300 dark:border-neutral-500 dark:text-neutral-500 hover:border-orange-500 hover:text-orange-500"
                onClick={() => setIsModalOpen(true)}
              >
                {renderIcon("ListFilter", {
                  className: "w-5 h-5",
                })}
              </button>
            </div>
          </div>
        </div>
        <TableComponent
          search={debouncedSearchTerm}
          sort={sort === "all" ? "" : sort}
          filter={onFilterChangeFinal}
        />
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Filter Users"
        bodyClass="bg-white dark:bg-neutral-900 md:w-1/2 lg:w-1/2 w-full rounded-lg overflow-hidden z-50"
        titleClass="bg-gray-200 dark:text-neutral-400 dark:bg-neutral-900 p-4"
        btnClass="text-gray-500 flex items-center justify-end hover:text-gray-700"
        containerClass="bg-black/50 fixed top-0 left-0 w-full px-10 md:px-0 lg:px-0 h-full flex items-center justify-center z-50"
        customClass="p-4 pb-7 flex flex-col z-100 gap-4 rounded-lg w-full "
        bodyButtonClass="flex items-center justify-end p-4 border-t dark:border-t-neutral-500 gap-4"
        btnTitleCancel={
          !formFilter || Object.values(formFilter).every((v) => !v)
            ? t("common.close")
            : t("common.reset")
        }
        btnTitleConfirm={t("common.confirm")}
        btnConfirmClass="bg-orange-500 dark:bg-orange-500/10 dark:text-orange-500 dark:hover:bg-orange-500/5 text-white px-4 py-2 rounded-lg hover:bg-orange-600 cursor-pointer transition"
        btnCancelClass="bg-gray-300 dark:hover:bg-neutral-800/50 dark:bg-neutral-800 dark:text-neutral-400 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 cursor-pointer transition"
        btnCancel={() => {
          setFormFilter({
            role: "",
            is_active: "",
            is_verified: "",
          });
          setOnFilterChangeFinal({
            role: "",
            is_active: "",
            is_verified: "",
          });
          setSearchTerm("");
          setIsModalOpen(false);
        }}
        btnConfirm={handleConfirmFilter}
      >
        {/* SELECT ROLE */}
        <Select
          value={filterRoleLabel[formFilter?.role] || ""}
          onValueChange={(value) =>
            setFormFilter({ ...formFilter, role: value })
          }
        >
          <SelectTrigger className={selectTriggerClass}>
            <SelectValue
              placeholder={t("dashboard.admin.users.filter_role.all")}
            />
          </SelectTrigger>

          <SelectContent className={selectContentClass}>
            <SelectGroup>
              <SelectLabel className={selectLabelClass}>
                {t("dashboard.admin.users.filter_role.title")}
              </SelectLabel>
              {Array.isArray(filterRole) &&
                filterRole.map((item) => (
                  <SelectItem
                    className={selectItemClass}
                    key={item.value}
                    value={item.value}
                  >
                    {item.label}
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* SELECT STATUS */}
        <Select
          value={filterStatusLabel[formFilter?.is_active] || ""}
          onValueChange={(value) =>
            setFormFilter({ ...formFilter, is_active: value })
          }
        >
          <SelectTrigger className={selectTriggerClass}>
            <SelectValue
              placeholder={t("dashboard.admin.users.filter_status.all")}
            />
          </SelectTrigger>

          <SelectContent className={selectContentClass}>
            <SelectGroup>
              <SelectLabel className={selectLabelClass}>
                {t("dashboard.admin.users.filter_status.title")}
              </SelectLabel>
              {Array.isArray(filterStatus) &&
                filterStatus.map((item) => (
                  <SelectItem
                    className={selectItemClass}
                    key={item.value}
                    value={item.value}
                  >
                    {item.label}
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* SELECT VERIFY */}
        <Select
          value={filterVerifyLabel[formFilter?.is_verified] || ""}
          onValueChange={(value) =>
            setFormFilter({ ...formFilter, is_verified: value })
          }
        >
          <SelectTrigger className={selectTriggerClass}>
            <SelectValue
              placeholder={t("dashboard.admin.users.filter_verified.all")}
            />
          </SelectTrigger>

          <SelectContent className={selectContentClass}>
            <SelectGroup>
              <SelectLabel className={selectLabelClass}>
                {t("dashboard.admin.users.filter_verified.title")}
              </SelectLabel>
              {Array.isArray(filterVerify) &&
                filterVerify.map((item) => (
                  <SelectItem
                    className={selectItemClass}
                    key={item.value}
                    value={item.value}
                  >
                    {item.label}
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Modal>
    </>
  );
}
