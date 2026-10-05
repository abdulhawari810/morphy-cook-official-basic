import { renderIcon } from "@/utils/icons.utils";
import Modal from "@/components/modal.component";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/utils/theme.utils";
import { toast } from "react-hot-toast";

export default function ThemeSection() {
  const [showModal, setShowModal] = useState(false);
  const { theme, setTheme } = useTheme();
  const [changeTheme, setChangeTheme] = useState("default");
  const { t } = useTranslation();
  const textTheme =
    theme === "dark"
      ? t("theme.dark")
      : theme === "system"
        ? t("theme.default")
        : t("theme.light");

  const handleChangeTheme = (text) => {
    setTheme(text);
    toast.success(t("theme.success"));
  };
  return (
    <main className="w-full h-full">
      <div className="flex flex-col w-full bg-white dark:bg-neutral-900 dark:text-white p-6 rounded-2xl">
        <div className="grid grid-cols-2">
          <div className="flex w-full flex-col gap-2">
            <h1 className="text-md md:text-lg font-semibold dark:text-orange-500! light:text-red-500!">
              {t("theme.change_theme")}
            </h1>
            <span className="text-xs md:text-lg text-slate-500">
              {t("theme.paragraph")}
            </span>
          </div>
          <button
            type="button"
            className="flex items-center cursor-pointer justify-end"
            onClick={() => setShowModal(true)}
          >
            <span className="text-md font-semibold uppercase">{textTheme}</span>
            {renderIcon("ChevronRight", { className: "w-5 h-5" })}
          </button>
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={t("theme.change_theme")}
        bodyClass="bg-white dark:bg-neutral-950 dark:text-white w-full md:w-1/2 rounded-lg overflow-hidden z-50"
        titleClass="bg-slate-100 dark:bg-neutral-900 p-4"
        btnClass="text-gray-500 flex items-center justify-end hover:text-gray-700"
        containerClass="bg-black/50 fixed px-5 md:px-0 top-0 left-0 w-full h-full flex items-center justify-center z-50"
        customClass="p-4 flex flex-col z-100 gap-4 items-center justify-center rounded-lg w-full "
        bodyButtonClass="flex items-center justify-end p-4 border-t gap-4"
        btnTitleCancel={t("common.btn_cancel")}
        btnTitleConfirm={t("common.btn_confirm")}
        btnConfirmClass="bg-orange-500 text-white dark:text-black! px-4 py-2 rounded-lg hover:bg-orange-600 cursor-pointer transition"
        btnCancelClass="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 cursor-pointer transition"
        btnCancel={() => {
          setShowModal(false);
        }}
        btnConfirm={() => {
          handleChangeTheme(changeTheme);
          setShowModal(false);
        }}
      >
        <div className="flex flex-col md:w-2/3 w-full items-center pt-5 gap-5">
          <div className="flex flex-col w-full h-80 gap-5">
            <button
              className={`w-full cursor-pointer flex items-center rounded-lg   justify-start p-3 text-lg text-slate-700 gap-2 ${changeTheme === "system" ? "bg-slate-200 dark:bg-orange-500/10 dark:text-orange-500" : "hover:bg-slate-200 dark:hover:bg-orange-500/10 dark:text-orange-500"}`}
              onClick={() => setChangeTheme("system")}
            >
              <span>{t("theme.default")}</span>
            </button>
            <button
              className={`w-full cursor-pointer flex items-center rounded-lg   justify-start p-3 text-lg text-slate-700 gap-2 ${changeTheme === "dark" ? "dark:bg-orange-500/10 dark:text-orange-500 bg-slate-200" : "hover:bg-slate-200 dark:hover:bg-orange-500/10 dark:text-orange-500"}`}
              onClick={() => setChangeTheme("dark")}
            >
              <div className="rounded-full w-5 h-5 bg-black dark:bg-neutral-600"></div>
              <span>{t("theme.dark")}</span>
            </button>
            <button
              className={`w-full cursor-pointer flex items-center rounded-lg   justify-start p-3 text-lg text-slate-700 gap-2 ${changeTheme === "light" ? "dark:bg-orange-500/10 dark:text-orange-500 bg-slate-200" : "dark:hover:bg-orange-500/10 hover:bg-slate-200 dark:text-orange-500"}`}
              onClick={() => setChangeTheme("light")}
            >
              <div className="rounded-full w-5 h-5  dark:bg-white bg-orange-500"></div>
              <span>{t("theme.light")}</span>
            </button>
          </div>
        </div>
      </Modal>
    </main>
  );
}
