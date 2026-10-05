import { useTranslation } from "react-i18next";

const SECTIONS = [1, 2, 3, 4, 5, 6, 7];

export default function PrivacyView() {
  const { t } = useTranslation();

  return (
    <div className="px-5">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white px-6 py-10 dark:bg-neutral-900">
        <h1 className="text-2xl font-bold text-gray-800 md:text-3xl dark:text-white">
          {t("legal.privacy.title")}
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-neutral-400">
          {t("legal.privacy.updated")}
        </p>

        <div className="mt-8 space-y-6">
          {SECTIONS.map((n) => (
            <section key={n}>
              <h2 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white">
                {t(`legal.privacy.section${n}_title`)}
              </h2>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-orange-200/70">
                {t(`legal.privacy.section${n}_body`)}
              </p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
