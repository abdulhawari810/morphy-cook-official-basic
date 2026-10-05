import headerImage from "@/assets/resource/header.jpg";
import { renderIcon } from "@/utils/icons.utils";
import Modal from "@/components/modal.component";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAllCategories } from "@/hooks/categories/useAllCategories.hooks";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

const selectTriggerClass =
  "w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-neutral-800 shadow-sm transition " +
  "focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-white " +
  "dark:border-neutral-800 dark:bg-neutral-900 dark:text-orange-500 dark:focus:ring-orange-500 dark:focus:ring-offset-neutral-950";

const selectContentClass =
  "rounded-lg border border-neutral-200 bg-white text-neutral-800 shadow-lg " +
  "dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100";

const selectLabelClass =
  "px-2 py-2 text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-orange-500";

const selectItemClass =
  "cursor-pointer rounded-md px-3 py-2 text-neutral-700 outline-none transition " +
  "focus:bg-orange-500 focus:text-white " +
  "data-[highlighted]:bg-orange-500 data-[highlighted]:text-white " +
  "data-[state=checked]:bg-orange-500 data-[state=checked]:text-white " +
  "dark:text-neutral-200 dark:focus:bg-orange-500 dark:focus:text-neutral-950 " +
  "dark:data-[highlighted]:bg-orange-500 dark:data-[highlighted]:text-neutral-950 " +
  "dark:data-[state=checked]:bg-orange-500 dark:data-[state=checked]:text-neutral-950";

export default function Filter({
  ShowInput = true,
  onChange,
  value,
  filterValue,
  onFilterChange,
  onFilterChangeFinal,
  loading,
  headerClass,
  onChefFilter = false,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { categories } = useAllCategories();
  const { t } = useTranslation();

  const levelCook = [
    {
      value: "all",
      label: t("common.filter.recipe.difficulty.all"),
    },
    {
      value: "easy",
      label: t("common.filter.recipe.difficulty.easy"),
    },
    {
      value: "medium",
      label: t("common.filter.recipe.difficulty.medium"),
    },
    {
      value: "difficult",
      label: t("common.filter.recipe.difficulty.difficult"),
    },
    {
      value: "very_difficult",
      label: t("common.filter.recipe.difficulty.very_difficult"),
    },
  ];

  const levelCookLabel = {
    all: t("common.filter.recipe.difficulty.all"),
    easy: t("common.filter.recipe.difficulty.easy"),
    medium: t("common.filter.recipe.difficulty.medium"),
    difficult: t("common.filter.recipe.difficulty.difficult"),
    very_difficult: t("common.filter.recipe.difficulty.very_difficult"),
  };

  const timeCook = [
    {
      value: "all",
      label: t("common.filter.recipe.time.all"),
    },
    {
      value: "10",
      label: t("common.filter.recipe.time.10"),
    },
    {
      value: "20",
      label: t("common.filter.recipe.time.20"),
    },
    {
      value: "30",
      label: t("common.filter.recipe.time.30"),
    },
    {
      value: "50",
      label: t("common.filter.recipe.time.50"),
    },
    {
      value: "100",
      label: t("common.filter.recipe.time.100"),
    },
    {
      value: "60",
      label: t("common.filter.recipe.time.60"),
    },
  ];

  const timeCookLabel = {
    all: t("common.filter.recipe.time.all"),
    10: t("common.filter.recipe.time.10"),
    20: t("common.filter.recipe.time.20"),
    30: t("common.filter.recipe.time.30"),
    50: t("common.filter.recipe.time.50"),
    100: t("common.filter.recipe.time.100"),
    60: t("common.filter.recipe.time.60"),
  };

  const recipeStatus = [
    {
      value: "all",
      label: t("common.filter.recipe.status.all"),
    },
    {
      value: "pending",
      label: t("common.filter.recipe.status.pending"),
    },
    {
      value: "draft",
      label: t("common.filter.recipe.status.draft"),
    },
    {
      value: "accept",
      label: t("common.filter.recipe.status.accept"),
    },
    {
      value: "reject",
      label: t("common.filter.recipe.status.reject"),
    },
  ];
  const recipeStatusLabel = {
    all: t("common.filter.recipe.status.all"),
    pending: t("common.filter.recipe.status.pending"),
    draft: t("common.filter.recipe.status.draft"),
    accept: t("common.filter.recipe.status.accept"),
    reject: t("common.filter.recipe.status.reject"),
  };

  const categoryLabel = (text) => {
    const result = categories?.find((item) => item.id === text);

    return result?.name;
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={t("common.filter.title")}
        bodyClass="bg-white dark:bg-neutral-950 w-full md:w-1/2 rounded-lg overflow-hidden z-50"
        titleClass="bg-gray-200 dark:bg-neutral-900 p-4"
        btnClass="text-gray-500 flex items-center justify-end hover:text-gray-700"
        containerClass="bg-black/50 fixed px-10 md:px-0 top-0 left-0 w-full h-full flex items-center justify-center z-50"
        customClass="p-4 flex flex-col z-100 gap-4 rounded-lg w-full "
        bodyButtonClass="flex items-center justify-end p-4 border-t gap-4"
        btnTitleCancel={
          !filterValue || Object.values(filterValue).every((v) => !v)
            ? t("common.close")
            : t("common.reset")
        }
        btnTitleConfirm={t("common.confirm")}
        btnConfirmClass="bg-orange-500 dark:text-black text-white px-4 py-2 rounded-lg hover:bg-orange-600 cursor-pointer transition"
        btnCancelClass="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 cursor-pointer transition"
        btnCancel={() => {
          if (!filterValue || Object.values(filterValue).every((v) => !v)) {
            setIsModalOpen(false);
          }
          onFilterChange?.({
            category: "",
            difficulty: "",
            time: "",
            status: "",
          });
          setIsModalOpen(false);
          onFilterChangeFinal?.({
            category: "",
            difficulty: "",
            time: "",
            status: "",
          });
        }}
        btnConfirm={() => {
          onFilterChangeFinal?.(filterValue);
          setIsModalOpen(false);
        }}
      >
        {/* CATEGORIES */}
        <Select
          value={
            filterValue?.category === "all"
              ? t("common.filter.recipe.categories.all")
              : categoryLabel(filterValue?.category) || ""
          }
          onValueChange={(value) =>
            onFilterChange?.({ ...filterValue, category: value })
          }
        >
          <SelectTrigger className={selectTriggerClass}>
            <SelectValue
              placeholder={t("common.filter.recipe.categories.title")}
            />
          </SelectTrigger>

          <SelectContent className={selectContentClass}>
            <SelectGroup>
              <SelectLabel className={selectLabelClass}>
                {t("common.filter.recipe.categories.subtitle")}
              </SelectLabel>
              <SelectItem className={selectItemClass} value="all">
                {t("common.filter.recipe.categories.all")}
              </SelectItem>
              {Array.isArray(categories) &&
                categories.map((item) => {
                  return (
                    <SelectItem
                      className={selectItemClass}
                      value={item.id}
                      key={item.id}
                    >
                      {item.name}
                    </SelectItem>
                  );
                })}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* DIFFICULTY */}
        <Select
          value={levelCookLabel[filterValue?.difficulty] || ""}
          onValueChange={(value) =>
            onFilterChange?.({ ...filterValue, difficulty: value })
          }
        >
          <SelectTrigger className={selectTriggerClass}>
            <SelectValue
              placeholder={t("common.filter.recipe.difficulty.title")}
            />
          </SelectTrigger>

          <SelectContent className={selectContentClass}>
            <SelectGroup>
              <SelectLabel className={selectLabelClass}>
                {t("common.filter.recipe.difficulty.subtitle")}
              </SelectLabel>

              {levelCook.map((item) => {
                return (
                  <SelectItem
                    className={selectItemClass}
                    value={item.value}
                    key={item.value}
                  >
                    {item.label}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* TIME COOK */}
        <Select
          value={timeCookLabel[filterValue?.time] || ""}
          onValueChange={(value) =>
            onFilterChange?.({ ...filterValue, time: value })
          }
        >
          <SelectTrigger className={selectTriggerClass}>
            <SelectValue placeholder={t("common.filter.recipe.time.title")} />
          </SelectTrigger>
          <SelectContent className={selectContentClass}>
            <SelectGroup>
              <SelectLabel className={selectLabelClass}>
                {t("common.filter.recipe.time.subtitle")}
              </SelectLabel>
              {timeCook.map((item) => {
                return (
                  <SelectItem
                    className={selectItemClass}
                    value={item.value}
                    key={item.value}
                  >
                    {item.label}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* STATUS */}
        {onChefFilter && (
          <Select
            value={recipeStatusLabel[filterValue?.status] || ""}
            onValueChange={(value) =>
              onFilterChange?.({
                ...filterValue,
                status: value,
              })
            }
          >
            <SelectTrigger className={selectTriggerClass}>
              <SelectValue
                placeholder={t("common.filter.recipe.status.title")}
              />
            </SelectTrigger>
            <SelectContent className={selectContentClass}>
              <SelectGroup>
                <SelectLabel className={selectLabelClass}>
                  {t("common.filter.recipe.status.title")}
                </SelectLabel>
                {recipeStatus.map((item) => {
                  return (
                    <SelectItem
                      className={selectItemClass}
                      value={item.value}
                      key={item.value}
                    >
                      {item.label}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      </Modal>

      <header
        className={cn(
          "relative w-full flex items-center justify-center h-72 md:h-80 lg:h-96",
          headerClass,
        )}
      >
        {ShowInput && (
          <div className="w-full h-full relative rounded-2xl overflow-hidden">
            <img
              src={headerImage}
              className="w-full relative h-full object-cover"
              alt="Recipe App"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>
          </div>
        )}
        <div className="absolute w-full flex-col flex items-center px-7 md:px-10 justify-center rounded-2xl">
          {ShowInput && (
            <div className="text-center text-white mb-8">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
                {t("common.title.search")}
              </h1>
              <p className="text-md md:text-lg lg:text-2xl">
                {t("common.title.subsearch")}
              </p>
            </div>
          )}
          <form className="w-fit gap-4 relative flex-wrap flex items-center justify-center">
            {ShowInput && (
              <div className="flex items-center justify-center gap-2 h-12 relative">
                <input
                  type="text"
                  placeholder={`${t("common.title.search")}...`}
                  className="w-55 md:w-120 lg:w-140 h-12 rounded-md bg-white shadow-md dark:bg-neutral-950 outline-none p-4 text-md pl-10 pr-10"
                  value={value}
                  id="search"
                  onChange={onChange}
                />
                <span className="absolute left-2.5">
                  {renderIcon("Search", {
                    className: "w-5 h-5 dark:text-neutral-400",
                  })}
                </span>
                {loading && (
                  <span className="absolute right-5 animate-spin border-3 border-t-transparent w-5 h-5 rounded-full border-orange-500"></span>
                )}
              </div>
            )}
            <div
              className={`flex cursor-pointer shadow-md w-20 h-12 md:p-4 rounded-lg items-center justify-center ${!filterValue || Object.values(filterValue).every((v) => !v) ? "bg-white text-black dark:bg-neutral-800 dark:text-white" : "bg-orange-500 dark:text-black text-white"}`}
              onClick={() => setIsModalOpen(!isModalOpen)}
            >
              {renderIcon("Filter", {
                className: "w-5 h-5",
              })}
            </div>
          </form>
        </div>
      </header>
    </>
  );
}
