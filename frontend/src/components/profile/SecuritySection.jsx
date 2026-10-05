import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import RHFForm from "@/components/form/rhf.form";
import { PasswordField } from "@/components/form/field";
import { useFieldError } from "@/components/form/useFieldError";
import FormButton from "@/components/form/button";
import OtpInput from "@/components/form/otp.input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useAuthUpdatePassword } from "@/hooks/auth/useUpdatePassword.hooks";
import { useSetup2FAS } from "@/hooks/qrcode/useQrCode.hooks";
import { useVerify2FAS } from "@/hooks/qrcode/useVerify2FAS.hooks";
import { useDisable2FAS } from "@/hooks/qrcode/useDisable2FAS.hooks";
import { useAuth } from "@/hooks/auth/useAuth.hooks";
import { useDeleteUsers } from "@/hooks/users/useDeleteUsers.hooks";
import { logoutUser } from "@/services/auth.services";
import { getErrorMessage } from "@/utils/errorMessage";
import { changePasswordSchema, otpSchema } from "@/utils/schemas";
import { TWO_FACTOR_STATUS } from "@/config/constants";

const TAB_QR = "qr";
const TAB_OTP = "otp";

export default function SecuritySection() {
  const { t } = useTranslation();

  return (
    <main className="w-full h-full">
      <div className="flex flex-col min-w-full w-full bg-white dark:text-white dark:bg-neutral-900 p-4 md:p-6 rounded-2xl">
        <div className="flex items-center mb-5">
          <h1 className="font-bold text-xl">{t("security.title")}</h1>
        </div>

        <PasswordSection />
        <TwoFactorSection />
        <DeleteAccountSection />
      </div>
    </main>
  );
};

// ─────────────────────────────────────────────────────────────
// Ganti kata sandi
// ─────────────────────────────────────────────────────────────

const PasswordSection = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="grid grid-cols-2 border-b py-10 border-slate-300 dark:border-neutral-700">
        <div className="flex flex-col w-full gap-2">
          <h1 className="text-md md:text-lg font-semibold dark:text-orange-500">
            {t("security.password.title")}
          </h1>
          <span className="text-xs md:text-lg text-slate-500">
            {t("security.password.text")}
          </span>
        </div>

        <div className="flex items-center justify-end w-full">
          <button
            type="button"
            className="p-2.5 rounded-full outline outline-slate-500 dark:outline-orange-500 dark:text-orange-500 flex items-center justify-center text-xs md:text-lg md:p-2 md:px-4 cursor-pointer text-slate-600"
            onClick={() => setIsOpen(true)}
          >
            {t("common.edit")} {t("common.password")}
          </button>
        </div>
      </div>

      <ChangePasswordDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

const ChangePasswordDialog = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { updateAuthPassword } = useAuthUpdatePassword();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("common.change_password")}</DialogTitle>
        </DialogHeader>

        {/*_ submit dipicu dari footer dialog, jadi form di luar <form> */}
        <RHFForm
          id="password-form"
          schema={changePasswordSchema}
          defaultValues={{
            password: "",
            newPassword: "",
            confPassword: "",
          }}
          onSubmit={async (values, { reset }) => {
            await updateAuthPassword(values);

            reset();
            onClose();

            return true;
          }}
          className="flex flex-col gap-4"
        >
          {() => <ChangePasswordFields />}
        </RHFForm>

        <DialogFooter>
          <FormButton variant="outline" onClick={onClose}>
            {t("common.btn_cancel")}
          </FormButton>

          <DialogSubmitButton formId="password-form" />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const ChangePasswordFields = () => {
  const { t } = useTranslation();
  const { register } = useFormContext();

  return (
    <>
      <PasswordField
        label={`${t("common.password")} ${t("common.old")}`}
        autoComplete="current-password"
        error={useFieldError("password")}
        {...register("password")}
      />

      <PasswordField
        label={`${t("common.password")} ${t("common.new")}`}
        autoComplete="new-password"
        error={useFieldError("newPassword")}
        {...register("newPassword")}
      />

      <PasswordField
        label={`${t("common.confirm")} ${t("common.password")} ${t("common.new")}`}
        autoComplete="new-password"
        error={useFieldError("confPassword")}
        {...register("confPassword")}
      />
    </>
  );
};

const DialogSubmitButton = ({ formId, label, variant = "primary" }) => {
  const { t } = useTranslation();

  return (
    <FormButton
      type="submit"
      variant={variant}
      form={formId}
      onClick={(e) => e.currentTarget.form?.requestSubmit()}
    >
      {label ?? t("common.btn_confirm")}
    </FormButton>
  );
};

// ─────────────────────────────────────────────────────────────
// Verifikasi 2 langkah
// ─────────────────────────────────────────────────────────────

const TwoFactorSection = () => {
  const { t } = useTranslation();
  const { me } = useAuth();
  const { setup2fas, loadingSetup2fas } = useSetup2FAS();

  const [isSetupOpen, setIsSetupOpen] = useState(false);
  const [isDisableOpen, setIsDisableOpen] = useState(false);
  const [setupData, setSetupData] = useState(null);
  const [setupError, setSetupError] = useState(null);

  //_ `two_factor_enabled` masih "nonactive" sampai kode OTP terverifikasi
  const isActive = me?.two_factor_enabled === TWO_FACTOR_STATUS.ACTIVE;

  const handleToggle = async () => {
    if (isActive) {
      setIsDisableOpen(true);
      return;
    }

    setSetupError(null);
    setSetupData(null);
    setIsSetupOpen(true);

    //_ QR diambil saat dialog dibuka, bukan dari localStorage saat mount
    try {
      const data = await setup2fas({ payload: { active: true } });

      setSetupData(data);
    } catch (err) {
      setSetupError(
        getErrorMessage(err, t("handleMessage.2FA.qrcode.error")),
      );
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 border-b py-10 border-slate-300 dark:border-neutral-700">
        <div className="flex flex-col gap-1 w-full">
          <h1 className="text-md md:text-lg font-semibold dark:text-orange-500">
            {t("security.two_step_verification.title")}
          </h1>
          <span className="text-xs md:text-lg text-slate-500">
            {t("security.two_step_verification.text")}
          </span>
        </div>

        <div className="flex flex-col gap-4 items-end justify-end w-full">
          <button
            type="button"
            role="switch"
            aria-checked={isActive}
            aria-label={t("security.two_step_verification.title")}
            disabled={loadingSetup2fas}
            className="p-2 w-15 rounded-full outline flex items-center justify-center text-md cursor-pointer text-slate-600 outline-orange-500 outline-slate-500 dark:text-orange-500 disabled:opacity-60"
            onClick={handleToggle}
          >
            <div
              className={`w-5 h-5 rounded-full transition-transform duration-300 ${
                isActive
                  ? "bg-orange-500 translate-x-3"
                  : "-translate-x-3 bg-slate-500"
              }`}
            />
          </button>

          {me?.two_factor_updateAt && (
            <div className="flex items-center gap-2">
              <span className="text-md font-medium">
                {t("security.two_step_verification.last_active")}:
              </span>
              <span className="text-sm text-gray-600">
                {me.two_factor_updateAt}
              </span>
            </div>
          )}
        </div>
      </div>

      <Setup2FADialog
        isOpen={isSetupOpen}
        data={setupData}
        error={setupError}
        loading={loadingSetup2fas}
        onClose={() => setIsSetupOpen(false)}
      />

      <Disable2FADialog
        isOpen={isDisableOpen}
        onClose={() => setIsDisableOpen(false)}
      />
    </>
  );
};

/** Layar 1: pindai QR code, tampilkan secret manual. */
const SetupStepQr = ({ data, error, loading }) => {
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <span className="animate-spin border-4 border-orange-500 border-t-transparent rounded-full h-10 w-10" />
      </div>
    );
  }

  if (error) {
    return (
      <p role="alert" className="rounded-lg bg-red-50 p-4 text-sm text-red-600 dark:bg-red-500/10 dark:text-red-400">
        {error}
      </p>
    );
  }

  if (!data?.secret) {
    return (
      <p className="rounded-lg bg-amber-50 p-4 text-sm text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
        {t("security.2_factor.qr_unavailable")}
      </p>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {/*_ produksi mengirim gambar dari server; demo hanya punya URI, jadi
          QR digambar sendiri dengan qrcode.rext */}
      {data.qrImage ? (
        <img
          src={data.qrImage}
          alt={t("security.2_factor.qrcode_alt")}
          className="h-56 w-56 rounded-2xl bg-white p-3"
        />
      ) : (
        <div className="rounded-2xl bg-white p-3">
          <QRCodeSVG
            value={data.otpauthUrl ?? data.secret}
            size={200}
            level="M"
          />
        </div>
      )}

      <details className="w-full text-center">
        <summary className="cursor-pointer text-xs text-neutral-500 hover:text-orange-500">
          {t("security.2_factor.manual_secret")}
        </summary>

        <code className="mt-2 block break-all rounded-lg bg-neutral-100 p-3 font-mono text-xs dark:bg-neutral-800">
          {data.secret}
        </code>
      </details>
    </div>
  );
};

/** Layar 2: masukkan kode OTP dari aplikasi autentikator. */
const SetupStepOtp = ({ onSuccess }) => {
  const { t } = useTranslation();
  const { Verify2FASData, loadingVerify2FAS } = useVerify2FAS();

  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);

  const handleVerify = async () => {
    const parsed = otpSchema.safeParse(otp);

    if (!parsed.success) {
      setError(t("handleMessage.2FA.code.error"));
      return;
    }

    try {
      await Verify2FASData({ token: parsed.data });

      setOtp("");
      setError(null);
      onSuccess();
    } catch (err) {
      //_ modal tetap terbuka supaya user bisa mencoba lagi
      setOtp("");
      setError(getErrorMessage(err, t("handleMessage.2FA.verify.error")));
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm text-center text-neutral-500 dark:text-neutral-400">
        {t("security.verify_2_factor.modal.subtitle")}
      </p>

      <OtpInput
        name="otp"
        value={otp}
        onChange={setOtp}
        error={error}
        disabled={loadingVerify2FAS}
        onComplete={handleVerify}
      />

      <FormButton
        onClick={handleVerify}
        loading={loadingVerify2FAS}
        disabled={otp.length !== 6}
      >
        {t("security.verify_2_factor.modal.button.verification")}
      </FormButton>
    </div>
  );
};

/**
 * Dialog setup 2FA dengan dua tab:
 *   1. Pindai QR / secret manual
 *   2. Masukkan kode OTP
 *
 * Dipakai Tabs (bukan step state) supaya user bisa bolak-balik tanpa
 * kehilangan isi tab OTP.
 */
const Setup2FADialog = ({ isOpen, data, error, loading, onClose }) => {
  const { t } = useTranslation();
  const [tab, setTab] = useState(TAB_QR);

  //_ selalu kembali ke tab QR saat dialog dibuka ulang
  const handleOpenChange = (open) => {
    if (open) {
      setTab(TAB_QR);
      return;
    }

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("security.2_factor.title")}</DialogTitle>
        </DialogHeader>

        <Tabs value={tab} onValueChange={setTab} className="gap-4">
          <TabsList>
            <TabsTrigger value={TAB_QR}>
              {t("security.2_factor.tab_scan")}
            </TabsTrigger>

            <TabsTrigger value={TAB_OTP}>
              {t("security.2_factor.tab_enter_code")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value={TAB_QR}>
            <SetupStepQr data={data} error={error} loading={loading} />
          </TabsContent>

          <TabsContent value={TAB_OTP}>
            <SetupStepOtp onSuccess={onClose} />
          </TabsContent>
        </Tabs>

        <DialogFooter>
          {tab === TAB_QR && (
            <FormButton variant="outline" onClick={onClose}>
              {t("common.close")}
            </FormButton>
          )}

          {/*_ tombol pengalih tab, Equivalent dari "step" versi lama */}
          <FormButton onClick={() => setTab(TAB_OTP)}>
            {t("security.2_factor.enter_code_button")}
          </FormButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const Disable2FADialog = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { disable2FASData, loadingDisable2FAS } = useDisable2FAS();

  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);

  const handleDisable = async () => {
    const parsed = otpSchema.safeParse(otp);

    if (!parsed.success) {
      setError(t("handleMessage.2FA.code.error"));
      return;
    }

    try {
      await disable2FASData({ token: parsed.data });

      setOtp("");
      setError(null);
      onClose();
    } catch (err) {
      setOtp("");
      setError(getErrorMessage(err, t("handleMessage.2FA.disable.error")));
    }
  };

  const handleOpenChange = (open) => {
    if (open) return;

    setOtp("");
    setError(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {t("security.two_step_verification.modal.title")}
          </DialogTitle>

          <DialogDescription>
            {t("security.two_step_verification.modal.subtitle")}
          </DialogDescription>
        </DialogHeader>

        <OtpInput
          name="otp"
          value={otp}
          onChange={setOtp}
          error={error}
          disabled={loadingDisable2FAS}
        />

        <DialogFooter>
          <FormButton variant="outline" onClick={onClose}>
            {t("common.btn_cancel")}
          </FormButton>

          <FormButton
            variant="danger"
            onClick={handleDisable}
            loading={loadingDisable2FAS}
            disabled={otp.length !== 6}
          >
            {t("security.two_step_verification.button.disable")}
          </FormButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// ─────────────────────────────────────────────────────────────
// Hapus akun
// ─────────────────────────────────────────────────────────────

const DeleteAccountSection = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="grid grid-cols-2 py-10">
        <div className="flex flex-col gap-1 w-full">
          <h1 className="text-md md:text-lg font-semibold dark:text-orange-500">
            {t("security.delete_account.title")}
          </h1>
          <span className="text-xs md:text-lg text-slate-500">
            {t("security.delete_account.text")}
          </span>
        </div>

        <div className="flex items-center justify-end w-full">
          <button
            type="button"
            className="p-2 flex items-center justify-center transition-all duration-300 text-md cursor-pointer text-red-500"
            onClick={() => setIsOpen(true)}
          >
            <span>{t("common.delete")}</span>
          </button>
        </div>
      </div>

      <DeleteAccountDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

const DeleteAccountDialog = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { deleteUsers } = useDeleteUsers();
  const queryClient = useQueryClient();
  const nav = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteUsers();
      await logoutUser();

      queryClient.clear();
      onClose();
      nav("/");
    } catch (error) {
      //_ pesan sudah ditampilkan oleh hook
      console.error(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("security.delete_account.modal.title")}</DialogTitle>

          <DialogDescription>
            {t("security.delete_account.modal.subtitle")}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <FormButton variant="outline" onClick={onClose}>
            {t("common.btn_cancel")}
          </FormButton>

          <FormButton variant="danger" onClick={handleDelete}>
            {t("security.delete_account.button.yes_delete")}
          </FormButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};