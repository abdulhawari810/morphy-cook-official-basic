import { useNavigate, useSearchParams } from "react-router-dom";
import { renderIcon } from "@/utils/icons.utils";
import { useRecipesByAuthor } from "@/hooks/recipes/useRecipeByAuthor.hooks";
import Card from "@/components/card.component";
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useSearchLoading } from "@/hooks/useSearchLoading";
import { useDeleteRecipes } from "@/hooks/recipes/useDeleteRecipes.hooks";
import { useUpdateRecipes } from "@/hooks/recipes/useUpdateRecipes.hooks";
import { useCreateRecipes } from "@/hooks/recipes/useCreateRecipes.hooks";
import FormComponent from "@/components/form.component";
import { useSingleRecipes } from "@/hooks/recipes/useSingleRecipes.hooks";
import { getAssetImage } from "@/utils/image.utils";
import CardLoading from "@/components/loading/card.loading";
import NoDataFound from "@/components/handleError/NotFound";
import Modal from "@/components/modal.component";
import { useAllCategories } from "@/hooks/categories/useAllCategories.hooks";
import { useTranslation } from "react-i18next";
import Filter from "@/components/filter.component";
import { useAuth } from "@/hooks/auth/useAuth.hooks";
import { getErrorMessage } from "@/utils/errorMessage";
import { recipeSchema } from "@/utils/schemas";

import Pagination from "@/components/pagination.components";
import { ROLES } from "@/config/constants";

export default function RecipeChefView() {
  const [selectedId, setSelectedId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [filter, setFilter] = useState({ status: "" });
  const [filterdebounced, setFilterDebounced] = useState(null);
  const [typeForm, setTypeForm] = useState("create");
  const nav = useNavigate();
  const { me } = useAuth();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();
  const [page, setPage] = useState(1);

  const debouncedSearchTerm = useDebounce(searchTerm);
  const loadingSearch = useSearchLoading(searchTerm, false);

  //_ status dibaca dari URL, lalu disinkronkan ke filter lokal
  const getStatus = searchParams.get("status") || "";
  const activeStatus = getStatus || filter?.status || "";

  const { recipesByAuthor, loadingRecipesAuthor } = useRecipesByAuthor({
    search: debouncedSearchTerm,
    category:
      filterdebounced?.category === "all" ? "" : filterdebounced?.category,
    time: filterdebounced?.time === "all" ? "" : filterdebounced?.time,
    difficulty:
      filterdebounced?.difficulty === "all" ? "" : filterdebounced?.difficulty,
    status: activeStatus === "all" ? "" : activeStatus,
    page,
  });
  const { deleteRecipes, loadingDeleteRecipes } = useDeleteRecipes();
  const { updateRecipes, loadingUpdateRecipes } = useUpdateRecipes();
  const { createRecipes, loadingCreateRecipes } = useCreateRecipes();
  const { recipe } = useSingleRecipes(selectedId);
  const { categories } = useAllCategories();

  const recipeList = recipesByAuthor?.data;

  return (
    <>
      <main className="flex flex-col bg-white dark:bg-neutral-900 p-4 rounded-2xl">
        <section className="sticky pt-5 top-0 z-20 w-full bg-white dark:bg-neutral-900">
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-2xl mb-5">
              {t("dashboard.chief.recipe.title")}
            </h1>
            <button
              className="w-fit h-fit p-3 md:font-bold font-semibold rounded-xl bg-orange-500 dark:bg-orange-500/10 dark:text-orange-500 cursor-pointer text-white text-md"
              onClick={() => {
                setTypeForm("create");
                setSelectedId(null);
                setShowForm(true);
              }}
            >
              {t("dashboard.chief.recipe.button.add")}
            </button>
          </div>
          <div className="flex items-center justify-between my-5">
            <div className="flex items-center gap-2">
              <form className="relative flex items-center justify-center">
                <input
                  type="text"
                  name="search"
                  value={searchTerm}
                  autoComplete="off"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-87 md:w-80 h-12 rounded-lg bg-white dark:bg-neutral-800 shadow-md outline-none dark:placeholder:text-slate-400 p-4 text-md pl-12 pr-12"
                  placeholder={t("dashboard.chief.recipe.text_search")}
                />
                <span className="absolute left-2.5">
                  {renderIcon("Search", {
                    className: "w-5 h-5 text-slate-400",
                  })}
                </span>
                {loadingSearch && (
                  <span className="absolute right-5 animate-spin border-3 border-t-transparent w-5 h-5 rounded-full border-orange-500"></span>
                )}
              </form>
              <Filter
                onChange={(e) => setSearchTerm(e.target.value)}
                ShowInput={false}
                value={searchTerm}
                filterValue={filter}
                onFilterChange={(newFilter) => setFilter(newFilter)}
                loading={loadingSearch}
                headerClass={"w-20 h-15!"}
                onFilterChangeFinal={(finalFilter) =>
                  setFilterDebounced(finalFilter)
                }
                onChefFilter={me?.role === ROLES.CHIEF ? true : false}
              />
            </div>
          </div>
        </section>

        <div
          className={`${loadingRecipesAuthor || recipeList?.length > 0 ? "columns-2" : "flex flex-col"} justify-between md:columns-3 items-start w-full space-y-4 md:space-y-5`}
        >
          {loadingRecipesAuthor && !recipeList ? (
            Array.from({ length: 12 }).map((_, i) => {
              return <CardLoading key={i} />;
            })
          ) : recipeList?.length > 0 ? (
            recipeList?.map((item) => {
              return (
                <Card
                  key={item.id}
                  title={item.title}
                  description={item.description}
                  image={
                    item.thumbnail === "placeholder.png"
                      ? getAssetImage("food/placeholder.png")
                      : item.thumbnail
                  }
                  profile={item.recipes_authors?.profile}
                  author={item.recipes_authors?.username}
                  difficulty={item.difficulty}
                  time={item.time}
                  category={item?.category?.name}
                  itemId={item.id}
                  createdAt={item.createdAt}
                  onCardClick={() => nav(`/recipes/detail/${item.id}`)}
                  badgehidden={true}
                  onDeleteClick={(e) => {
                    e.stopPropagation();
                    setSelectedId(item.id);
                    setIsModalOpen(true);
                    setModalType("confirm-delete");
                  }}
                  onLoadingDelete={
                    selectedId === item.id && loadingDeleteRecipes
                  }
                  onEditClick={(e) => {
                    e.stopPropagation();
                    setTypeForm("update");
                    setModalType("update-form");
                    setShowForm(false);
                    setSelectedId(item.id);
                  }}
                  badge={
                    item.status === "pending"
                      ? t("dashboard.admin.recipe.filter_menu.pending")
                      : item.status === "accept"
                        ? t("dashboard.admin.recipe.filter_menu.accept")
                        : item.status === "reject"
                          ? t("dashboard.admin.recipe.filter_menu.reject")
                          : t("dashboard.admin.recipe.filter_menu.draft")
                  }
                />
              );
            })
          ) : debouncedSearchTerm ? (
            <NoDataFound
              type={"search"}
              title={t("common.no_data_found.recipe.search.title")}
              subtitle={`${t("common.no_data_found.recipe.search.subtitle.recipe")} ${debouncedSearchTerm} ${t("common.no_data_found.recipe.search.subtitle.not_found")}`}
            />
          ) : (
            <NoDataFound
              title={t("common.no_data_found.recipe.empty.title")}
              subtitle={t("common.no_data_found.recipe.empty.subtitle")}
            />
          )}
        </div>

        {/* Pagination */}
        {recipesByAuthor?.data?.length > 0 &&
          recipesByAuthor?.totalPage > 1 && (
            <Pagination
              currentPage={recipesByAuthor.currentPage}
              totalPage={recipesByAuthor.totalPage}
              onPageChange={setPage}
            />
          )}

        <FormComponent
          schema={recipeSchema}
          initialData={typeForm === "update" ? recipe : null}
          loadingState={
            typeForm === "update" ? loadingUpdateRecipes : loadingCreateRecipes
          }
          fields={[
            {
              name: "title",
              label: t("common.form_label.title"),
              type: "text",
            },
            {
              name: "category",
              label: t("common.filter.recipe.categories.title"),
              type: categories?.length === 0 ? "text" : "select",
              options:
                categories?.map((cat) => ({
                  value: cat.id,
                  label: cat.name,
                })) || [],
            },
            {
              name: "difficulty",
              label: t("common.filter.recipe.difficulty.title"),
              type: "select",
              options: [
                {
                  value: t("common.filter.recipe.difficulty.easy"),
                  label: t("common.filter.recipe.difficulty.easy"),
                },
                {
                  value: t("common.filter.recipe.difficulty.medium"),
                  label: t("common.filter.recipe.difficulty.medium"),
                },
                {
                  value: t("common.filter.recipe.difficulty.difficult"),
                  label: t("common.filter.recipe.difficulty.difficult"),
                },
                {
                  value: t("common.filter.recipe.difficulty.very_difficult"),
                  label: t("common.filter.recipe.difficulty.very_difficult"),
                },
              ],
            },
            {
              name: "time",
              label: t("common.form_label.time"),
              type: "number",
            },
            {
              name: "ingredients",
              label: t("common.form_label.ingredients.title"),
              type: "multi-text",
            },
            {
              name: "instructions",
              label: t("common.form_label.instructions.title"),
              type: "multi-text",
            },
            {
              name: "description",
              label: t("common.form_label.description"),
              type: "textarea",
            },
            {
              name: "thumbnail",
              label: t("common.form_label.thumbnail"),
              type: "file",
            },
          ]}
          defaultForm={{
            title: "",
            thumbnail: "",
            description: "",
            category: "",
            difficulty: "",
            time: "",
            ingredients: [""],
            instructions: [""],
          }}
          showForm={
            typeForm === "update" ? selectedId === recipe?.id : showForm
          }
          onClose={() => {
            if (typeForm === "update") {
              setIsModalOpen(false);
              setModalType("");
              setSelectedId(null);
              setShowForm(false);
              setTypeForm("create");
              return;
            }

            setIsModalOpen(false);
            setModalType("");
            setShowForm(false);
          }}
          title={
            typeForm === "update"
              ? t("dashboard.chief.recipe.button.edit")
              : t("dashboard.chief.recipe.button.add")
          }
          onSubmit={async (data) => {
            if (typeForm === "create") {
              try {
                await createRecipes({ payload: data });
                setShowForm(false);
                return true;
              } catch (error) {
                console.error(
                  getErrorMessage(
                    error,
                    t("handleMessage.recipe.create.error"),
                  ),
                );
                return false;
              }
            }

            try {
              await updateRecipes({ id: selectedId, payload: data });
              setSelectedId(null);
              return true;
            } catch (error) {
              console.error(
                getErrorMessage(error, t("handleMessage.recipe.update.error")),
              );
              return false;
            }
          }}
        />

        <Modal
          isOpen={isModalOpen && modalType === "confirm-delete" ? true : false}
          onClose={() => {
            setIsModalOpen(false);
            setModalType("");
          }}
          btnCancel={() => {
            setSelectedId(null);
            setIsModalOpen(false);
            setModalType("");
          }}
          btnConfirm={() => {
            deleteRecipes(selectedId);
            setIsModalOpen(false);
            setModalType("");
          }}
          btnTitleCancel={t("dashboard.chief.dialog.button.cancel")}
          bodyClass="bg-white dark:bg-neutral-900 w-full md:w-1/2 rounded-lg overflow-hidden z-1000"
          containerClass="bg-black/50 px-5 md:px-0 fixed top-0 left-0 w-full h-full flex items-center justify-center z-40"
          btnTitleConfirm={t("dashboard.chief.dialog.button.confirm")}
          title={t("dashboard.chief.dialog.title")}
          btnCancelClass={
            "dark:text-white dark:ring dark:ring-neutral-500 p-2 rounded-lg"
          }
        >
          <p className="text-md text-slate-700 dark:text-neutral-300">
            {t("dashboard.chief.dialog.subtitle")}
          </p>
        </Modal>
      </main>
    </>
  );
}
