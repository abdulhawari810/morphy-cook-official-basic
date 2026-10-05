import { useNavigate, Navigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import { useRegister } from "@/hooks/auth/useAuthRegister.hooks";
import { useAuth } from "@/hooks/auth/useAuth.hooks";
import RHFForm from "@/components/form/rhf.form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { registerSchema, LIMITS } from "@/utils/schemas";

export default function RegisterView() {
  const { me } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { registerUsers, loadingRegister } = useRegister();

  if (me) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen dark:bg-neutral-950 bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-orange-600 mb-2">
          {t("register.title")}
        </h1>

        <p className="text-gray-600 dark:text-neutral-400 mb-6">
          {t("register.subtitle")}
        </p>

        <RHFForm
          schema={registerSchema}
          defaultValues={{
            username: "",
            email: "",
            password: "",
            confPassword: "",
          }}
          onSubmit={async (values) => {
            await registerUsers({ payload: values });

            navigate("/login");

            return true;
          }}
          className="space-y-4"
        >
          {(isSubmitting) => (
            <>
              <RegisterFields />
              <RegisterButton loading={isSubmitting || loadingRegister} />
            </>
          )}
        </RHFForm>

        <div className="mt-4">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full px-4 py-2 text-sm font-medium text-gray-600 dark:text-neutral-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
          >
            {t("register.backToHome")}
          </button>
        </div>

        <p className="text-center text-gray-600 mt-4">
          {t("register.link.title")}{" "}
          <Link
            to="/login"
            className="text-orange-600 cursor-pointer hover:underline"
          >
            {t("register.link.subtitle")}
          </Link>
        </p>
      </div>
    </div>
  );
};

const RegisterFields = () => {
  const { t } = useTranslation();
  const { control } = useFormContext();

  return (
    <>
      <FormField
        control={control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("register.username.title")}</FormLabel>
            <FormControl>
              <Input
                placeholder={t("register.username.subtitle")}
                autoComplete="username"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("register.email.title")}</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder={t("register.email.subtitle")}
                autoComplete="email"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("register.password.title")}</FormLabel>
            <FormControl>
              <PasswordInput
                placeholder={t("register.password.subtitle")}
                autoComplete="new-password"
                {...field}
              />
            </FormControl>
            <FormDescription>
              {t("validation.password_hint", { min: LIMITS.password.min })}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="confPassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("register.conf_password.title")}</FormLabel>
            <FormControl>
              <PasswordInput
                placeholder={t("register.conf_password.subtitle")}
                autoComplete="new-password"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

const RegisterButton = ({ loading }) => {
  const { t } = useTranslation();

  return (
    <Button
      type="submit"
      disabled={loading}
      className="h-12 w-full bg-orange-500 font-medium text-white hover:bg-orange-600"
    >
      {loading && (
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
      )}
      {loading
        ? t("common.button_loading.loading")
        : t("register.button.title")}
    </Button>
  );
};