import AnimateSpin from "@/components/animate.spin.component";
import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils";

export default function ButtonLoading({
  title,
  loading,
  onClick,
  type,
  classList,
  hideTitle = false,
}) {
  const { t } = useTranslation();
  return (
    <button
      type={type || "button"}
      disabled={loading}
      onClick={onClick}
      className={cn(
        `w-full ${title.toLowerCase() === "logout" ? "bg-red-600 hover:bg-red-700" : "bg-orange-600 hover:bg-orange-700"} text-white font-semibold py-2 rounded-lg transition duration-200 flex items-center gap-3 justify-center cursor-pointer`,
        classList,
      )}
    >
      {loading ? (
        <>
          <span className="rounded-full w-5 h-5 border-2 border-t-transparent border-white animate-spin"></span>
          {!hideTitle && (
            <span>
              {title.toLowerCase() === "logout"
                ? t("common.button_loading.logout")
                : title.toLowerCase() === "login"
                  ? t("common.button_loading.login")
                  : t("common.button_loading.loading")}
            </span>
          )}
        </>
      ) : (
        <span>{title}</span>
      )}
    </button>
  );
}
