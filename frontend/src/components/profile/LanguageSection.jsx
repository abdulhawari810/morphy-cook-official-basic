import { renderIcon } from "@/utils/icons.utils";
import Modal from "@/components/modal.component";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

export default function LanguageSection() {
  const [showModal, setShowModal] = useState(false);
  const [defaultLanguage, setDefaultLanguage] = useState(
    () => localStorage.getItem("language") || "id",
  );
  const { t, i18n } = useTranslation();

  const handleChangeLanguage = () => {
    i18n.changeLanguage(defaultLanguage);
    localStorage.setItem("language", defaultLanguage);
    toast.success(t("language.success"));
    setShowModal(false);
  };

  return (
    <main className="w-full h-full">
      <div className="flex flex-col w-full bg-white dark:bg-neutral-900 dark:text-white p-6 rounded-2xl">
        <div className="grid grid-cols-2">
          <div className="flex w-full flex-col gap-2">
            <h1 className="text-md md:text-lg font-semibold dark:text-orange-500">
              {t("language.change_language")}
            </h1>
            <span className="text-xs md:text-lg text-slate-500">
              {t("language.paragraph")}
            </span>
          </div>
          <button
            type="button"
            className="flex items-center cursor-pointer justify-end"
            onClick={() => setShowModal(true)}
          >
            <span className="text-md font-semibold">
              {i18n.language === "id" ? "Indonesia" : "English"}
            </span>
            {renderIcon("ChevronRight", { className: "w-5 h-5" })}
          </button>
        </div>
      </div>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={t("language.change_language")}
        bodyClass="bg-white dark:bg-neutral-900 w-full md:w-1/2 rounded-lg overflow-hidden z-50"
        titleClass="bg-gray-200 dark:bg-neutral-800 dark:text-white p-4"
        btnClass="text-gray-500 flex items-center justify-end hover:text-gray-700"
        containerClass="bg-black/50 fixed px-5 md:px-0 top-0 left-0 w-full h-full flex items-center justify-center z-50"
        customClass="p-4 flex flex-col z-100 gap-4 items-center justify-center rounded-lg w-full "
        bodyButtonClass="flex items-center justify-end p-4 border-t gap-4"
        btnTitleCancel={t("common.btn_cancel")}
        btnTitleConfirm={t("common.btn_confirm")}
        btnConfirmClass="bg-orange-500 text-white dark:text-black! px-4 py-2 rounded-lg hover:bg-orange-600 cursor-pointer transition"
        btnCancelClass="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 cursor-pointer transition"
        btnCancel={() => {
          i18n.changeLanguage(localStorage.getItem("language"));
          setDefaultLanguage(localStorage.getItem("language") || "id");
          setShowModal(false);
        }}
        btnConfirm={handleChangeLanguage}
      >
        <div className="flex flex-col w-full md:w-1/2 items-center gap-2">
          {/* Below is the language search form; if you have or are adding a new language, there is no need to create a search form—simply use the one below. */}
          {/* <div className="relative w-full flex items-center justify-center">
            <input
              type="text"
              name="search"
              id="search"
              placeholder=" "
              className="w-full peer border-none outline not-placeholder-shown:outline-orange-500 focus:outline-orange-500 dark:text-orange-500 outline-slate-400 dark:outline-orange-400 rounded-lg px-3 pl-10 h-12"
              autoComplete="off"
            />
            {renderIcon("Search", {
              className:
                "w-5 h-5 absolute left-3 peer-focus:text-orange-500 peer-not-placeholder-shown:text-orange-500 dark:text-orange-200",
            })}
            <label
              htmlFor="search"
              className="absolute dark:text-orange-200 left-8 transition-all! text-md transform peer-not-placeholder-shown:-translate-y-6 peer-not-placeholder-shown:text-sm peer-focus:text-sm peer-not-placeholder-shown:bg-white dark:peer-not-placeholder-shown:bg-neutral-900 peer-not-placeholder-shown:left-2 peer-not-placeholder-shown:text-orange-500 peer-focus:-translate-y-6 peer-focus:bg-white dark:peer-focus:bg-neutral-900 peer-focus:left-2 peer-focus:text-orange-500 px-2"
            >
              {t("language.search_language")}
            </label>
          </div> */}
          {/* end form search */}

          <div className="flex flex-col w-full h-80 pt-5 gap-5">
            <button
              className={`w-full cursor-pointer flex items-center rounded-lg justify-start p-3 ftext-lg  ${defaultLanguage === "en" ? "bg-orange-500/10 text-orange-500" : "text-slate-700 hover:bg-slate-200 dark:hover:bg-orange-500/10 dark:hover:text-orange-500 dark:text-orange-200"}`}
              onClick={() => setDefaultLanguage("en")}
            >
              {t("language.english")}
            </button>
            <button
              className={`w-full cursor-pointer flex items-center rounded-lg justify-start p-3 ftext-lg  ${defaultLanguage === "id" ? "bg-orange-500/10 text-orange-500" : "text-slate-700 hover:bg-slate-200 dark:hover:bg-orange-500/10 dark:hover:text-orange-500 dark:text-orange-200"}`}
              onClick={() => setDefaultLanguage("id")}
            >
              {t("language.indonesian")}
            </button>
          </div>
        </div>
      </Modal>
    </main>
  );
}
