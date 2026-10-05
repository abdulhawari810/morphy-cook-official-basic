import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import NotFound404 from "@/assets/resource/404_not_found.png";
import ErrorPage from "@/assets/resource/error_page.png";
import { useTranslation } from "react-i18next";

const ErrorBoundary = () => {
  const error = useRouteError();
  const { t } = useTranslation();

  const isDevelopment = import.meta.env.VITE_ENVIRONMENT === "development";

  const status = error?.status ?? 500;
  const isNotFound = status === 404;
  const isServerError = status >= 500;

  let title = t("handleError.errorBoundary.default.title");
  let message = t("handleError.errorBoundary.default.message");

  if (isNotFound) {
    title = t("handleError.errorBoundary.404.title");
    message = t("handleError.errorBoundary.404.message");
  } else if (isServerError && isRouteErrorResponse(error)) {
    title = t("handleError.errorBoundary.500.title");
    message = t("handleError.errorBoundary.500.message");
  }

  return (
    <div className="w-full flex flex-col items-center justify-center p-10 md:px-20 md:py-10">
      <div className="bg-slate-100 py-10 dark:bg-neutral-900 shadow-md w-full rounded-2xl flex flex-col items-center justify-center">
        <div className="my-10">
          {isNotFound ? (
            <img
              src={NotFound404}
              alt="Error Page"
              className="w-full h-50 object-center object-cover"
            />
          ) : (
            <img
              src={ErrorPage}
              alt="Error Page"
              className="w-full h-50 object-center object-cover"
            />
          )}
        </div>
        <h1 className="text-lg md:text-2xl font-semibold text-orange-500">
          {title}
        </h1>
        <p className="mb-5 text-sm md:text-lg text-slate-600">{message}</p>

        {isDevelopment && (
          <div className="w-full max-w-3xl overflow-scroll mb-5 p-5 rounded-lg bg-slate-200 dark:bg-neutral-800 text-left">
            <p className="text-red-400 font-semibold mb-2">Development Error</p>

            <pre className="text-xs md:text-sm dark:text-slate-200 whitespace-pre-wrap break-words overflow-auto max-h-80">
              {error instanceof Error
                ? error.stack
                : JSON.stringify(error, null, 2)}
            </pre>
          </div>
        )}

        <div className="flex flex-col gap-5">
          <button
            onClick={() => window.location.reload()}
            className="bg-orange-500 flex items-center justify-center text-white p-3 rounded-full"
          >
            {t("handleError.button.retry")}
          </button>
          <button
            onClick={() => (window.location.href = "/")}
            className="bg-orange-500/5 ring-orange-500 ringflex items-center justify-center text-orange-500 p-3 rounded-full"
          >
            {t("handleError.button.back")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorBoundary;
