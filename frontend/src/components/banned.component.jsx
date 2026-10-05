import { useTranslation } from "react-i18next";

const BannedAccount = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center my-10">
      <h1 className="text-3xl font-bold text-red-500">
        {t("banned_account.title")}
      </h1>
      <p className="mt-4 text-lg text-gray-700 dark:text-neutral-300">
        {t("banned_account.subtitle")}
      </p>
    </div>
  );
};

export default BannedAccount;