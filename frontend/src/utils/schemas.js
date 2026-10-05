import { z } from "zod";

/** Batas yang dipakai di seluruh form. Satu sumber kebenaran. */
export const LIMITS = {
  username: { min: 3, max: 30 },
  password: { min: 8, max: 72 },
  email: { max: 254 },
  phone: { min: 8, max: 15 },
  bio: { max: 500 },
  recipeTitle: { min: 3, max: 150 },
  recipeDescription: { min: 10, max: 2000 },
  cookTime: { min: 1, max: 1440 },
  listItem: { max: 200 },
  listMaxItems: 30,
  otpLength: 6,
  reviewComment: { max: 1000 },
};

/** Daftar dari input "multi-text" (ingredients / instructions). */
const stringList = z
  .array(
    z
      .string()
      .trim()
      .min(1, "required")
      .max(LIMITS.listItem.max, "too_big"),
  )
  .min(1, "required")
  .max(LIMITS.listMaxItems, "too_big");

export const emailSchema = z
  .string()
  .trim()
  .min(1, "required")
  .max(LIMITS.email.max, "too_big")
  .pipe(z.email("invalid_format"));

export const passwordSchema = z
  .string()
  .min(1, "required")
  .min(LIMITS.password.min, "too_small")
  .max(LIMITS.password.max, "too_big")
  .regex(/[a-z]/, "too_small")
  .regex(/[A-Z]/, "too_small")
  .regex(/\d/, "too_small");

export const usernameSchema = z
  .string()
  .trim()
  .min(1, "required")
  .min(LIMITS.username.min, "too_small")
  .max(LIMITS.username.max, "too_big")
  .regex(/^[a-zA-Z0-9._-]+$/, "invalid_format");

export const phoneSchema = z
  .string()
  .trim()
  .regex(/^\+?[0-9\s-]{8,20}$/, "invalid_format");

export const otpSchema = z
  .string()
  .min(LIMITS.otpLength, "required")
  .regex(new RegExp(`^\\d{${LIMITS.otpLength}}$`), "invalid_format");

/** Daftar string non-kosong, wajib ada isinya (bahan, langkah). */
export const requiredStringListSchema = stringList;

/**
 * Daftar opsional: boleh kosong.
 *
 * Berbeda dari `requiredStringListSchema`, item yang ada tetap tidak
 * boleh string kosong — memvalidasi `""` akan menahan user dari
 * menyimpan baris kosong yang tidak disengaja.
 */
export const optionalStringListSchema = z
  .array(
    z
      .string()
      .trim()
      .min(1, "required")
      .max(LIMITS.listItem.max, "too_big"),
  )
  .max(LIMITS.listMaxItems, "too_big")
  .optional()
  .default([]);

// ─────────────────────────────────────────────────────────────
// Auth
// ─────────────────────────────────────────────────────────────

export const loginSchema = z.object({
  UsersOrEmail: z
    .string()
    .trim()
    .min(1, "required")
    .refine((v) => v.includes("@") ? z.email().safeParse(v).success : true, {
      message: "invalid_format",
    }),
  password: z.string().min(1, "required"),
});

export const registerSchema = z
  .object({
    username: usernameSchema,
    email: emailSchema,
    password: passwordSchema,
    confPassword: z.string().min(1, "required"),
  })
  .refine((data) => data.password === data.confPassword, {
    message: "mismatch",
    path: ["confPassword"],
  });

export const changePasswordSchema = z
  .object({
    password: z.string().min(1, "required"),
    newPassword: passwordSchema,
    confPassword: z.string().min(1, "required"),
  })
  .refine((data) => data.newPassword === data.confPassword, {
    message: "mismatch",
    path: ["confPassword"],
  })
  .refine((data) => data.newPassword !== data.password, {
    message: "same_as_old",
    path: ["newPassword"],
  });

// ─────────────────────────────────────────────────────────────
// Profile
// ─────────────────────────────────────────────────────────────

export const SKILLS = ["beginner", "junior", "senior"];
export const GENDERS = ["male", "female"];

export const profileSchema = z
  .object({
    username: usernameSchema,
    email: emailSchema,
    phone: z.union([phoneSchema, z.literal("")]),
    date: z
      .string()
      .min(1, "required")
      //_ tolak tanggal di masa depan
      .refine((v) => new Date(v) <= new Date(), { message: "future_date" }),
    gender: z.enum(GENDERS, { message: "required" }),
    skill: z.enum(SKILLS, { message: "required" }),
    preference_food: optionalStringListSchema,
    alergi_food: optionalStringListSchema,
    profile: z.string().optional().default(""),
  })
  .partial({ skill: true, gender: true });

// ─────────────────────────────────────────────────────────────
// Resep
// ─────────────────────────────────────────────────────────────

export const recipeSchema = z.object({
  title: z
    .string()
    .trim()
    .min(LIMITS.recipeTitle.min, "too_small")
    .max(LIMITS.recipeTitle.max, "too_big"),
  category: z.union([z.coerce.number().int().positive(), z.literal("")]),
  difficulty: z.string().min(1, "required"),
  time: z.coerce
    .number()
    .int()
    .min(LIMITS.cookTime.min, "too_small")
    .max(LIMITS.cookTime.max, "too_big"),
  description: z
    .string()
    .trim()
    .min(LIMITS.recipeDescription.min, "too_small")
    .max(LIMITS.recipeDescription.max, "too_big"),
  ingredients: requiredStringListSchema,
  instructions: requiredStringListSchema,
  thumbnail: z.string().optional().default(""),
});

// ─────────────────────────────────────────────────────────────
// Review (rating 1-5 + komentar, 1 per user per resep)
// ─────────────────────────────────────────────────────────────

export const reviewSchema = z.object({
  rating: z.coerce.number().int("invalid_format").min(1, "too_small").max(5, "too_big"),
  comment: z
    .string()
    .trim()
    .max(LIMITS.reviewComment.max, "too_big")
    .optional()
    .default(""),
});

// ─────────────────────────────────────────────────────────────
// Admin: user
// ─────────────────────────────────────────────────────────────

export const USER_ROLES = ["admin", "chief", "users"];
export const USER_STATUSES = ["active", "in_active", "banned"];
export const VERIFY_STATUSES = ["verified", "in_verified"];

export const adminUserSchema = z.object({
  username: usernameSchema,
  email: emailSchema,
  profile: z.string().min(1, "required"),
  role: z.enum(USER_ROLES, { message: "required" }),
  gender: z.enum(GENDERS, { message: "required" }),
  is_active: z.enum(USER_STATUSES, { message: "required" }),
  is_verified: z.enum(VERIFY_STATUSES, { message: "required" }),
});

export {
  emailSchema as loginEmailSchema,
  z,
};