import { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import { useLogin } from "@/hooks/auth/useAuthLogin.hooks";
import { useAuth } from "@/hooks/auth/useAuth.hooks";
import { useVerify2FasLogin } from "@/hooks/auth/useAuthVerify2Fas.hooks";
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
} from "@/components/ui/form";
import OtpInput from "@/components/form/otp.input";
import Modal from "@/components/modal.component";
import { loginSchema, otpSchema } from "@/utils/schemas";
import { getErrorMessage } from "@/utils/errorMessage";

export default function LoginView() {
  const { me } = useAuth();
  const { t } = useTranslation();

  if (me) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-neutral-950 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-orange-600 cursor-pointer mb-2 text-center">
          {t("login.title")}
        </h1>

        <p className="text-neutral-400 text-center mb-8">
          {t("login.subtitle")}
        </p>

        <LoginForm />

        <p className="text-center text-gray-600 dark:text-neutral-400 mt-6">
          {t("login.link.title")}{" "}
          <Link
            to="/register"
            className="text-orange-600 cursor-pointer hover:underline"
          >
            {t("login.link.subtitle")}
          </Link>
        </p>
      </div>
    </div>
  );
}

const LoginForm = () => {
  const navigate = useNavigate();
  const { loginUsers, loadingLogin } = useLogin();
  const { verify2Fas, loadingverify2FasLogin } = useVerify2FasLogin();

  const [challengeToken, setChallengeToken] = useState(null);

  return (
    <>
      <RHFForm
        schema={loginSchema}
        defaultValues={{ UsersOrEmail: "", password: "" }}
        onSubmit={async (values) => {
          const response = await loginUsers({ payload: values });

          if (response?.requires2FA) {
            setChallengeToken(response.challengeToken);

            //_ biarkan modal terbuka
            return false;
          }

          navigate("/");

          return true;
        }}
        className="space-y-5"
      >
        {(isSubmitting) => (
          <>
            <LoginFields />
            <LoginButton loading={loadingLogin || isSubmitting} />
          </>
        )}
      </RHFForm>

      <TwoFactorModal
        challengeToken={challengeToken}
        loading={loadingverify2FasLogin}
        onClose={() => {
          setChallengeToken(null);
          navigate("/login");
        }}
        onVerify={async (code) => {
          await verify2Fas({ token: code, challengeToken });

          setChallengeToken(null);
          navigate("/");
        }}
      />
    </>
  );
};

const LoginFields = () => {
  const { t } = useTranslation();
  const { control } = useFormContext();

  return (
    <>
      <FormField
        control={control}
        name="UsersOrEmail"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("login.username.title")}</FormLabel>
            <FormControl>
              <Input
                placeholder={t("login.username.subtitle")}
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
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("login.password.title")}</FormLabel>
            <FormControl>
              <PasswordInput
                placeholder={t("login.password.subtitle")}
                autoComplete="current-password"
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

const LoginButton = ({ loading }) => {
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
      {loading ? t("common.button_loading.loading") : t("login.button.title")}
    </Button>
  );
};

/**
 * Modal OTP 2FA.
 *
 * Sengaja state lokal + validasi zod langsung (`otpSchema`),
 * bukan RHF: nilai OTP hanya dipakai sekali saat konfirmasi,
 * tidak perlu resolver/FormProvider kedua.
 */
const TwoFactorModal = ({ challengeToken, onClose, onVerify, loading }) => {
  const { t } = useTranslation();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);

  const handleConfirm = async () => {
    const parsed = otpSchema.safeParse(otp);

    if (!parsed.success) {
      setError(t("handleMessage.2FA.code.error"));
      return;
    }

    try {
      await onVerify(parsed.data);
      setOtp("");
      setError(null);
    } catch (err) {
      //_ modal tetap terbuka supaya user bisa coba lagi
      setError(
        getErrorMessage(err, t("handleMessage.2FA.verify.error")),
      );
    }
  };

  const handleCancel = () => {
    setOtp("");
    setError(null);
    onClose();
  };

  return (
    <Modal
      isOpen={!!challengeToken}
      onClose={handleCancel}
      btnCancel={handleCancel}
      btnConfirm={handleConfirm}
      titleClass="bg-gray-200 dark:bg-neutral-800 dark:text-white p-4"
      btnTitleCancel={t("security.verify_2_factor.modal.button.cancel")}
      bodyClass="bg-white dark:bg-neutral-900 w-full md:w-1/2 rounded-lg overflow-hidden z-1000"
      containerClass="bg-black/50 fixed px-5 top-0 left-0 w-full h-full flex items-center justify-center z-40"
      btnTitleConfirm={
        loading
          ? t("security.verify_2_factor.modal.button.verifying")
          : t("security.verify_2_factor.modal.button.verification")
      }
      title={t("security.verify_2_factor.modal.title")}
      btnCancelClass="bg-gray-300 dark:bg-white dark:text-gray-900 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 cursor-pointer transition"
      btnConfirmClass="bg-orange-500 text-black! text-white px-4 py-2 rounded-lg hover:bg-orange-600 cursor-pointer transition"
    >
      <div className="flex flex-col items-center justify-center mb-10 gap-2">
        <h1 className="dark:text-white font-bold text-2xl">
          {t("security.verify_2_factor.modal.subtitle")}
        </h1>
        <p className="dark:text-orange-200/70 font-medium text-lg">
          {t("security.verify_2_factor.modal.subtext")}
        </p>
      </div>

      <OtpInput
        name="otp"
        value={otp}
        onChange={setOtp}
        error={error}
        disabled={loading}
      />

      {error && (
        <p className="mt-3 text-center">
          <button
            type="button"
            onClick={() => setError(null)}
            className="text-xs underline opacity-70"
          >
            {t("common.close")}
          </button>
        </p>
      )}
    </Modal>
  );
};