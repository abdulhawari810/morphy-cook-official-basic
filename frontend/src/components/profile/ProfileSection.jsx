import { useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";
import AnimateSpin from "@/components/animate.spin.component";
import { renderIcon } from "@/utils/icons.utils";
import RHFForm from "@/components/form/rhf.form";
import { useFieldError } from "@/components/form/useFieldError";
import { TextField } from "@/components/form/field";
import DatePickerField from "@/components/form/date.picker.field";
import DynamicList from "@/components/form/dynamic.list";
import { toDateInputValue, today } from "@/utils/date";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateProfile } from "@/hooks/profile/useUpdateProfile.hooks";
import { useCreateProfile } from "@/hooks/profile/useCreateProfile.hooks";
import { useProfile } from "@/hooks/profile/useProfile.hooks";
import { useUploadAvatar } from "@/hooks/upload/useUploadAvatar.hooks";
import { useAuth } from "@/hooks/auth/useAuth.hooks";
import { profileSchema, SKILLS, GENDERS } from "@/utils/schemas";
import { profileKeys } from "@/utils/queryKeys";
import { ROLES } from "@/config/constants";

const MAX_AVATAR_SIZE = 2 * 1024 * 1024;

const selectTriggerClass =
  "w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-neutral-800 shadow-sm transition focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-orange-500 dark:focus:ring-orange-500 dark:focus:ring-offset-neutral-950";

const selectContentClass =
  "rounded-lg border border-neutral-200 bg-white text-neutral-800 shadow-lg dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100";

const selectLabelClass =
  "px-2 py-2 text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-orange-500";

const selectItemClass =
  "cursor-pointer rounded-md px-3 py-2 text-neutral-700 outline-none transition focus:bg-orange-500 focus:text-white data-[highlighted]:bg-orange-500 data-[highlighted]:text-white data-[state=checked]:bg-orange-500 data-[state=checked]:text-white dark:text-neutral-200 dark:focus:bg-orange-500 dark:focus:text-neutral-950";

export default function ProfileSection() {
  const handleSubmitProfile = useProfileSubmit();
  const { me, loadingMe } = useAuth();
  const { profile, loadingProfile } = useProfile();

  const isChief = me?.role === ROLES.CHIEF;

  return (
    <RHFForm
      schema={profileSchema}
      defaultValues={{
        username: me?.username ?? "",
        email: me?.email ?? "",
        phone: profile?.phone ?? "",
        date: toDateInputValue(profile?.date),
        gender: profile?.gender ?? "",
        skill: profile?.skill ?? "beginner",
        preference_food: toArray(profile?.preference_food),
        alergi_food: toArray(profile?.alergi_food),
        profile: me?.profile ?? "",
      }}
      mode="onChange"
      onSubmit={handleSubmitProfile}
      className="w-full pb-14 flex flex-col gap-8"
    >
      {(isSubmitting) => (
        <>
          <ProfileHeader loading={loadingMe || loadingProfile} />

          <div className="flex flex-col bg-white dark:bg-neutral-900 rounded-2xl shadow-md p-6 gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProfileIdentityFields />
              {isChief && <SkillField />}
              <GenderField />
            </div>
          </div>

          <div className="flex flex-col bg-white dark:bg-neutral-900 rounded-2xl shadow-md p-6 gap-5">
            <PreferenceFoodField />
            <AllergyField />
          </div>

          <ProfileFooter isSubmitting={isSubmitting} />
        </>
      )}
    </RHFForm>
  );
};

// ─────────────────────────────────────────────────────────────
// Submit: create/update profile.
//
// Avatar TIDAK ikut payload ini — file-nya dikirim terpisah lewat
// endpoint upload (lihat ProfileHeader).
// ─────────────────────────────────────────────────────────────

const useProfileSubmit = () => {
  const { updateProfileUsers } = useUpdateProfile();
  const { createProfiles } = useCreateProfile();
  const queryClient = useQueryClient();
  const { profile } = useProfile();

  const isProfileExist = !!profile;

  return async (values, { reset }) => {
    const { profile: _avatar, ...payload } = values;

    if (isProfileExist) {
      await updateProfileUsers(payload);
    } else {
      await createProfiles(payload);
    }

    await queryClient.invalidateQueries({ queryKey: profileKeys.all() });

    reset();

    return true;
  };
};

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

const toArray = (value) => {
  if (Array.isArray(value)) return value;

  try {
    const parsed = JSON.parse(value || "[]");

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const ProfileHeader = ({ loading }) => {
  const { t } = useTranslation();
  const { watch } = useFormContext();
  const { createUploadAvatar } = useUploadAvatar();
  const inputRef = useRef(null);
  const [avatarError, setAvatarError] = useState(null);

  const storedAvatar = watch("profile");
  const [preview, setPreview] = useState(null);

  //_ object FormData disimpan di state, bukan ref: nilainya ikut
  //_ menentukan apakah tombol "simpan avatar" ditampilkan
  const [pendingAvatar, setPendingAvatar] = useState(null);

  const handleFile = async (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setAvatarError(t("handleMessage.upload.invalid_type"));
      return;
    }

    if (file.size > MAX_AVATAR_SIZE) {
      setAvatarError(t("handleMessage.upload.too_large"));
      return;
    }

    setAvatarError(null);

    const data = new FormData();
    data.append("avatars", file);

    setPendingAvatar(data);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmitAvatar = async () => {
    if (!pendingAvatar) return;

    await createUploadAvatar(pendingAvatar);

    setPendingAvatar(null);
    setPreview(null);

    if (inputRef.current) inputRef.current.value = "";
  };

  const displayed = preview ?? storedAvatar ?? "";

  return (
    <div className="flex flex-col bg-white dark:bg-neutral-900 rounded-2xl shadow-md p-6 gap-5">
      <div className="flex flex-col items-center gap-4">
        <div className="relative flex items-center justify-center w-40 h-40 border-4 border-orange-300 bg-orange-300 rounded-full overflow-hidden">
          {loading ? (
            <AnimateSpin />
          ) : displayed ? (
            <img
              src={displayed}
              alt={t("profile.avatar")}
              className="w-full h-full object-cover"
            />
          ) : (
            renderIcon("User", { className: "w-16 h-16 text-slate-500" })
          )}

          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            aria-label={t("common.edit")}
            className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-white dark:text-white dark:bg-orange-500 shadow-md flex items-center justify-center text-orange-500 hover:bg-orange-100 transition"
          >
            {renderIcon("SquarePen", { className: "w-5 h-5" })}
          </button>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/webp"
          hidden
          onChange={(e) => handleFile(e.target.files?.[0])}
        />

        {avatarError && (
          <p role="alert" className="text-xs text-red-500">
            {avatarError}
          </p>
        )}

        {pendingAvatar && (
          <button
            type="button"
            onClick={handleSubmitAvatar}
            className="px-4 py-2 rounded-xl bg-orange-500/10 text-orange-500 text-sm font-semibold"
          >
            {t("common.save")} {t("profile.avatar")}
          </button>
        )}

        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
            {t("common.edit")} {t("common.profile")}
          </h1>
          <p className="text-slate-500 dark:text-orange-200 my-5 text-sm">
            {t("common.complete")} {t("common.information")}{" "}
            {t("common.profile")} {t("common.you")}
          </p>
        </div>
      </div>
    </div>
  );
};

const ProfileIdentityFields = () => {
  const { t } = useTranslation();
  const { register, control } = useFormContext();

  return (
    <>
      <TextField
        label={t("common.username")}
        error={useFieldError("username")}
        {...register("username")}
      />

      <TextField
        type="email"
        label={t("common.email_address")}
        error={useFieldError("email")}
        {...register("email")}
      />

      <TextField
        type="tel"
        label={t("common.phone_number")}
        error={useFieldError("phone")}
        {...register("phone")}
      />

      <Controller
        name="date"
        control={control}
        render={({ field }) => (
          <BirthDateField
            label={t("profile.birth_date")}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
    </>
  );
};

/**
 * Field tanggal lahir.
 *
 * Dipisah supaya `useFieldError` (hook) tidak dipanggil di dalam
 * render-prop `Controller`.
 */
const BirthDateField = ({ label, value, onChange }) => {
  const error = useFieldError("date");

  return (
    <DatePickerField
      label={label}
      value={value}
      onChange={onChange}
      error={error}
      //_ zod sudah menolak tanggal masa depan; `maxDate` mencegah user
      //_ memilih tanggal yang memang tidak akan lolos validasi
      maxDate={today()}
    />
  );
};

const SkillField = () => {
  const { t } = useTranslation();
  const { watch, setValue } = useFormContext();
  const error = useFieldError("skill");

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-slate-700 dark:text-orange-500">
        {t("profile.cooking_level")}
      </label>

      <Select value={watch("skill") || ""} onValueChange={(v) => setValue("skill", v)}>
        <SelectTrigger className={selectTriggerClass}>
          <SelectValue placeholder={t("profile.cooking_paragraph")} />
        </SelectTrigger>

        <SelectContent className={selectContentClass}>
          <SelectGroup>
            <SelectLabel className={selectLabelClass}>
              {t("profile.cooking_level")}
            </SelectLabel>

            {SKILLS.map((skill) => (
              <SelectItem
                key={skill}
                value={skill}
                className={selectItemClass}
              >
                {skill}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {error && (
        <p role="alert" className="text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

const GenderField = () => {
  const { t } = useTranslation();
  const { watch, setValue } = useFormContext();
  const error = useFieldError("gender");

  const labels = {
    male: t("common.male"),
    female: t("common.female"),
  };

  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="font-semibold text-slate-700 dark:text-orange-200">
        {t("common.gender")}
      </legend>

      <div className="flex flex-wrap gap-4">
        {GENDERS.map((gender) => (
          <label
            key={gender}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl border cursor-pointer transition ${
              watch("gender") === gender
                ? "border-orange-400 dark:text-orange-500"
                : "border-slate-400 dark:border-orange-500/50"
            }`}
          >
            <input
              type="radio"
              value={gender}
              checked={watch("gender") === gender}
              onChange={() => setValue("gender", gender, { shouldValidate: true })}
              className="accent-orange-500"
            />
            <span className="capitalize">{labels[gender]}</span>
          </label>
        ))}
      </div>

      {error && (
        <p role="alert" className="text-xs text-red-500">
          {error}
        </p>
      )}
    </fieldset>
  );
};

const PreferenceFoodField = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-semibold text-slate-700 dark:text-orange-200">
        {t("profile.preference_food")}
      </h2>

      <DynamicList
        name="preference_food"
        label={t("profile.preference_food")}
        placeholder={`${t("common.example")}: ${t("common.prawn")}, ${t("common.spicy")}, ${t("common.seafood")}`}
      />
    </div>
  );
};

const AllergyField = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-slate-700 dark:text-orange-200">
          {t("profile.alergi_food")}
        </h2>
      </div>

      <DynamicList
        name="alergi_food"
        label={t("profile.alergi_food")}
        placeholder={`${t("common.example")}: ${t("common.prawn")}, ${t("common.spicy")}, ${t("common.seafood")}`}
      />
    </div>
  );
};

const ProfileFooter = ({ isSubmitting }) => {
  const { t } = useTranslation();
  const { reset, formState } = useFormContext();

  const isDirty = formState.isDirty;

  return (
    <div
      className={`${isDirty ? "flex" : "hidden"} justify-center items-center md:justify-end gap-4 pt-4 sticky bottom-9 w-full left-0 md:pr-5`}
    >
      <button
        type="button"
        disabled={!isDirty || isSubmitting}
        onClick={() => reset()}
        className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 bg-white hover:bg-slate-100 transition disabled:opacity-50"
      >
        {t("common.btn_cancel")}
      </button>

      <button
        type="submit"
        disabled={!isDirty || isSubmitting}
        className="px-6 py-3 rounded-xl bg-orange-500 text-white hover:bg-orange-600 transition flex items-center gap-2 justify-center disabled:opacity-50"
      >
        {isSubmitting && <AnimateSpin />}

        {isSubmitting ? (
          <span>{t("profile.loading_save")}</span>
        ) : (
          <span>
            {t("common.save")} {t("common.profile")}
          </span>
        )}
      </button>
    </div>
  );
};