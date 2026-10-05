import ErrorPage from "@/assets/resource/error_page.png";
import { useTranslation } from "react-i18next";

const NetworkError = ({ onRetry }) => {
  const { t } = useTranslation();
  return (
    <div className="w-full flex flex-col items-center justify-center p-10 md:px-20 md:py-10">
      <div className="bg-slate-100 py-10 dark:bg-neutral-900 shadow-md w-full rounded-2xl flex flex-col items-center justify-center">
        <div className="my-10">
          <img
            src={ErrorPage}
            alt="Error Page"
            className="w-full h-50 object-center object-cover"
          />
        </div>
        <h1 className="text-lg md:text-2xl font-semibold text-orange-500">
          {t("handleError.network_error.title")}
        </h1>
        <p className="mb-5 text-sm md:text-lg text-slate-600">
          {t("handleError.network_error.message")}
        </p>

        <button
          onClick={onRetry}
          className="bg-orange-500 flex items-center justify-center text-white p-3 rounded-full"
        >
          {t("handleError.button.retry")}
        </button>
      </div>
    </div>
  );
};

export default NetworkError;
