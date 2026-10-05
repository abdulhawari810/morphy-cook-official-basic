import { db } from "./db";
import { getMockupError } from "./mockup.errors";
import { ROLES, USER_STATUS, TWO_FACTOR_STATUS } from "@/config/constants";

// Polyfill for crypto.randomUUID() - not supported in older browsers or non-HTTPS
if (typeof crypto === "undefined" || !crypto.randomUUID) {
  crypto.randomUUID = () => {
    // Fallback: generate UUID v4 manually
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const now = new Date().toISOString();

/* =========================================================
   Helper Query
========================================================= */

const generateToken = () => {
  return `demo-token-${crypto.randomUUID()}`;
};

// Base32 encoding/decoding utilities for TOTP (RFC 4648)
const BASE32_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

const base32Encode = (data) => {
  // Handle both Uint8Array and string input
  const bytes =
    typeof data === "string" ? new TextEncoder().encode(data) : data;

  let bits = 0;
  let value = 0;
  let output = "";

  for (let i = 0; i < bytes.length; i++) {
    value = (value << 8) | bytes[i];
    bits += 8;

    while (bits >= 5) {
      output += BASE32_CHARS[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }

  if (bits > 0) {
    output += BASE32_CHARS[(value << (5 - bits)) & 31];
  }

  return output;
};

const base32Decode = (encoded) => {
  encoded = encoded.toUpperCase().replace(/=+$/, "");

  let bits = 0;
  let value = 0;
  const output = [];

  for (let i = 0; i < encoded.length; i++) {
    const char = encoded[i];
    const charValue = BASE32_CHARS.indexOf(char);

    if (charValue === -1) continue;

    value = (value << 5) | charValue;
    bits += 5;

    if (bits >= 8) {
      output.push((value >>> (bits - 8)) & 255);
      bits -= 8;
    }
  }

  return new Uint8Array(output);
};

// Generate TOTP code from secret (RFC 6238 compatible)
const generateTotpCode = async (secret) => {
  const timeStep = Math.floor(Date.now() / 1000 / 30);

  // Decode base32 secret (same as authenticator apps)
  const keyData = base32Decode(secret);

  const key = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-1" },
    false,
    ["sign"],
  );

  const timeBuffer = new ArrayBuffer(8);
  const timeView = new DataView(timeBuffer);
  timeView.setUint32(4, timeStep);

  const hmac = await crypto.subtle.sign("HMAC", key, timeBuffer);
  const hmacArray = new Uint8Array(hmac);

  const offset = hmacArray[hmacArray.length - 1] & 0xf;
  const code =
    ((hmacArray[offset] & 0x7f) << 24) |
    ((hmacArray[offset + 1] & 0xff) << 16) |
    ((hmacArray[offset + 2] & 0xff) << 8) |
    (hmacArray[offset + 3] & 0xff);

  return (code % 1000000).toString().padStart(6, "0");
};

const getCurrentUsers = async () => {
  const userId = Number(localStorage.getItem("demo_users_id"));

  if (!userId) throw new Error(getMockupError("auth_not_login"));

  const users = await db.users.get(userId);

  if (!users) throw new Error(getMockupError("auth_user_not_found"));

  return users;
};

const getCurrentCategory = async () => {
  const category = await db.categories.toArray();
  const count = await db.categories.count();
  if (count === 0) throw new Error(getMockupError("category_empty"));

  return category;
};

const getAllRecipesQuery = async (
  query,
  { role = "users", userId = null, limit = 12 } = {},
) => {
  const { search, category, difficulty, time, status } = query;
  let { page = 1 } = query;

  page = Number(page);

  let collection = db.recipes.toCollection();

  // =========================
  // ROLE FILTER
  // =========================

  // Users:
  // hanya recipe dengan status accept
  if (role === ROLES.USER) {
    collection = collection.filter((recipe) => recipe.status === "accept");
  }

  // Chef:
  // hanya recipe milik chef tersebut
  // dan semua status diperbolehkan
  if (role === ROLES.CHIEF) {
    collection = collection.filter(
      (recipe) => recipe.userId === Number(userId),
    );
  }

  // Admin:
  // tidak perlu filter status / author
  // karena admin bisa melihat semuanya

  // =========================
  // SEARCH
  // =========================

  if (search) {
    const searchValue = search.toLowerCase();

    collection = collection.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchValue),
    );
  }

  // =========================
  // CATEGORY
  // =========================

  if (category) {
    collection = collection.filter(
      (recipe) => recipe.categoryId === Number(category),
    );
  }

  // =========================
  // DIFFICULTY
  // =========================

  if (difficulty) {
    collection = collection.filter(
      (recipe) => recipe.difficulty === difficulty,
    );
  }

  // =========================
  // TIME
  // =========================

  if (time) {
    collection = collection.filter((recipe) => recipe.time === Number(time));
  }

  // =========================
  // STATUS FILTER
  // =========================

  // Status query hanya berlaku kalau memang dikirim.
  // Untuk users, tetap paksa accept.
  //
  if (status) {
    collection = collection.filter((recipe) => recipe.status === status);
  }

  const count = await collection.count();

  const rows = await collection.toArray();

  rows.sort((a, b) => new Date(b.id) - new Date(a.id));

  const paginatedRows = rows.slice((page - 1) * limit, page * limit);

  // =========================
  // CATEGORY RELATION
  // =========================

  const categoryId = [
    ...new Set(
      paginatedRows.map((recipe) => recipe.categoryId).filter(Boolean),
    ),
  ];

  const categorys = await db.categories.where("id").anyOf(categoryId).toArray();

  const categoryMap = new Map(
    categorys.map((category) => [category.id, category]),
  );

  const data = paginatedRows.map((recipe) => ({
    ...recipe,
    category: categoryMap.get(recipe.categoryId) ?? null,
  }));

  return {
    totalData: count,
    totalPage: Math.ceil(count / limit),
    currentPage: page,
    data,
  };
};

const validateInput = (input) => {
  for (const [field, value] of Object.entries(input)) {
    if (!value) {
      return {
        valid: false,
        message: `${field} tidak boleh kosong!`,
      };
    }
  }

  if (input.password && input.password === "")
    return { valid: false, message: "Kata sandi saat ini tidak boleh kosong!" };

  if (input.newPassword && input.newPassword === "")
    return { valid: false, message: "Kata sandi baru tidak boleh kosong!" };

  if (input.confPassword && input.confPassword === "")
    return {
      valid: false,
      message: "Konfirmasi Kata sandi tidak boleh kosong!",
    };

  if (input.confPassword && input.confPassword !== input.newPassword)
    return {
      valid: false,
      message: "Kata sandi baru dan Konfirmasi Kata sandi tidak sama!",
    };

  return {
    valid: true,
  };
};

/* =========================================================
   Auth
========================================================= */

export const authMock = {
  login: async (data) => {
    await delay(500);

    const validate = validateInput(data);

    if (!validate.valid) throw new Error(validate.message);

    const user = await db.users
      .where("email")
      .equals(data.UsersOrEmail)
      .first();

    if (!user) throw new Error(getMockupError("auth_invalid_credentials"));

    if (user.password !== data.password) throw new Error(getMockupError("auth_password_wrong"));

    if (user.is_active === USER_STATUS.BANNED) throw new Error(getMockupError("auth_banned"));
    if (user.is_active === USER_STATUS.DELETED) throw new Error(getMockupError("auth_deleted"));

    const token = generateToken();

    localStorage.setItem("demo-token", token);
    localStorage.setItem("demo_users_id", String(user.id));

    return {
      data: {
        token: token,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          password: user.password,
          role: user.role,
          is_active: user.is_active,
          is_verified: user.is_verified,
          two_factor_enabled: user.two_factor_enabled,
          two_factor_secret: user.two_factor_secret,
          two_factor_temp_secret: user.two_factor_temp_secret,
          two_factor_updateAt: user.two_factor_updateAt,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      },
    };
  },
  me: async () => {
    await delay(500);

    const users = await getCurrentUsers();

    return {
      data: users,
    };
  },
  register: async (data) => {
    await delay(500);

    const validate = validateInput(data);

    if (!validate.valid) throw new Error(validate.message);

    const email = await db.users.where("email").equals(data.email).first();
    const username = await db.users
      .where("username")
      .equals(data.username)
      .first();

    if (email) {
      throw new Error(getMockupError("auth_email_exists"));
    }
    if (username) throw new Error(getMockupError("auth_username_exists"));

    if (data.password !== data.confPassword)
      throw new Error(getMockupError("auth_password_mismatch"));

    const now = new Date().toISOString();

    const user = {
      ...data,
      createdAt: now,
      updatedAt: now,
    };

    const id = await db.users.add(user);

    return {
      id,
      ...user,
    };
  },
  logout: async () => {
    await delay(500);

    const userId = Number(localStorage.getItem("demo_users_id"));

    const users = await db.users.get(userId);

    if (!users) throw new Error(getMockupError("auth_not_login"));

    localStorage.removeItem("demo_users_id");
    localStorage.removeItem("demo-token");
    localStorage.removeItem("isLogin");
  },
  updatePassword: async (data) => {
    await delay(500);

    const validate = validateInput(data);

    if (!validate.valid) throw new Error(validate.message);

    const users = await getCurrentUsers();

    if (users.password !== data.password) {
      throw new Error(getMockupError("auth_old_password_wrong"));
    }

    if (!users) throw new Error(getMockupError("auth_not_login"));

    const now = new Date().toISOString();

    const userPassword = {
      ...users,
      password: data.newPassword,
      updatedAt: now,
    };

    await db.users.put(userPassword);

    return {
      userPassword,
    };
  },
  verify2FasLogin: async ({ token }) => {
    await delay(500);

    const userId = Number(localStorage.getItem("demo_users_id"));

    if (!userId) throw new Error(getMockupError("auth_not_login"));

    const user = await db.users.where("id").equals(userId).first();

    if (!user) throw new Error(getMockupError("user_not_found"));

    const secret = user.two_factor_secret;

    if (!secret) throw new Error(getMockupError("two_fa_secret_not_found"));

    const validCode = await generateTotpCode(secret);

    if (token !== validCode) {
      throw new Error(getMockupError("two_fa_code_wrong"));
    }

    const newToken = generateToken();

    localStorage.setItem("demo-token", newToken);

    return {
      data: {
        token: newToken,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role,
        },
      },
    };
  },
};

export const categoryMock = {
  getAllCategories: async () => {
    await delay(500);
    const category = await getCurrentCategory();

    return { data: category };
  },
};

export const recipesMock = {
  getAllRecipes: async (query) => {
    await delay(500);

    const recipes = await getAllRecipesQuery(query, {
      role: ROLES.USER,
      limit: 12,
    });

    return {
      data: recipes,
    };
  },
  getRecipesForAdmin: async (query) => {
    await delay(500);

    const recipes = await getAllRecipesQuery(query, {
      role: ROLES.ADMIN,
      limit: 20,
    });

    return {
      data: recipes,
    };
  },
  getRecipesByAuthor: async (query) => {
    await delay(500);

    const userId = Number(localStorage.getItem("demo_users_id"));

    if (!userId) {
      throw new Error(getMockupError("auth_not_login"));
    }

    const recipes = await getAllRecipesQuery(query, {
      role: ROLES.CHIEF,
      userId,
      limit: 20,
    });

    return {
      data: recipes,
    };
  },
  countRecipeByAuthor: async () => {
    const id = Number(localStorage.getItem("demo_users_id"));

    const acceptCount = await db.recipes
      .where("userId")
      .equals(id)
      .and((recipe) => recipe.status === "accept")
      .count();
    const draftCount = await db.recipes
      .where("userId")
      .equals(id)
      .and((recipe) => recipe.status === "draft")
      .count();
    const pendingCount = await db.recipes
      .where("userId")
      .equals(id)
      .and((recipe) => recipe.status === "pending")
      .count();
    const rejectCount = await db.recipes
      .where("userId")
      .equals(id)
      .and((recipe) => recipe.status === "reject")
      .count();

    return {
      data: {
        accept: acceptCount,
        draft: draftCount,
        pending: pendingCount,
        reject: rejectCount,
      },
    };
  },
  countAllRecipesStatus: async () => {
    const acceptCount = await db.recipes
      .where("status")
      .equals("accept")
      .count();
    const draftCount = await db.recipes.where("status").equals("draft").count();
    const pendingCount = await db.recipes
      .where("status")
      .equals("pending")
      .count();
    const rejectCount = await db.recipes
      .where("status")
      .equals("reject")
      .count();

    return {
      data: {
        accept: acceptCount,
        draft: draftCount,
        pending: pendingCount,
        reject: rejectCount,
      },
    };
  },
  getRecipeById: async (id) => {
    await delay(500);

    const existRecipe = await db.recipes.where("id").equals(Number(id)).first();
    const count = await db.recipes.where("id").equals(Number(id)).count();
    const category = await db.categories
      .where("id")
      .equals(existRecipe.categoryId)
      .first();

    if (count < 0) throw new Error(getMockupError("recipe_not_found"));

    return {
      data: { ...existRecipe, category },
    };
  },
  createRecipe: async (data) => {
    await delay(500);

    const validate = validateInput(data);

    if (!validate.valid) throw new Error(validate.message);

    const userId = Number(localStorage.getItem("demo_users_id"));

    const users = await db.users.where("id").equals(userId).first();

    if (users.role !== ROLES.CHIEF)
      throw new Error(getMockupError("recipe_not_chef"));

    const existsRecipe = await db.recipes
      .where("title")
      .equals(data.title)
      .first();

    if (existsRecipe) throw new Error(getMockupError("recipe_exists"));

    await db.recipes.add({
      ...data,
      author: users.username,
      userId: users.id,
      status: "pending",
      categoryId: Number(data.category),
      ingredients: typeof data.ingredients === "string" ? JSON.parse(data.ingredients) : data.ingredients,
      instructions: typeof data.instructions === "string" ? JSON.parse(data.instructions) : data.instructions,
      createdAt: now,
    });

    return {
      data: {
        message: getMockupError("recipe_add_success"),
      },
    };
  },
  updateStatusRecipes: async (id, status) => {
    const recipes = await db.recipes.where("id").equals(id).first();

    if (!recipes) throw new Error(getMockupError("recipe_not_found"));

    const update = {
      ...recipes,
      status: status?.status,
      updatedAt: now,
    };

    await db.recipes.put(update);

    return {
      data: {
        message:
          status === "accept"
            ? getMockupError("recipe_approved")
            : status === "reject"
              ? getMockupError("recipe_rejected")
              : getMockupError("recipe_drafted"),
      },
    };
  },
  updateRecipe: async (id, data) => {
    await delay(500);

    const userId = Number(localStorage.getItem("demo_users_id"));

    const users = await db.users.where("id").equals(userId).first();

    if (users.role !== ROLES.CHIEF)
      throw new Error(getMockupError("recipe_not_chef_update"));

    const recipes = await db.recipes.where("id").equals(id).first();

    if (!recipes) throw new Error(getMockupError("recipe_not_found"));

    const update = {
      ...data,
      status: data.status === "accept" ? "accept" : "pending",
      updatedAt: now,
      userId: users.id,
      author: users.username,
      ingredients: typeof data.ingredients === "string" ? JSON.parse(data.ingredients) : data.ingredients,
      instructions: typeof data.instructions === "string" ? JSON.parse(data.instructions) : data.instructions,
    };

    await db.recipes.put(update);

    return {
      data: {
        message: getMockupError("recipe_update_success"),
      },
    };
  },
  deleteRecipe: async (id) => {
    await delay(500);

    const userId = Number(localStorage.getItem("demo_users_id"));

    const users = await db.users.where("id").equals(userId).first();

    if (users.role !== ROLES.CHIEF)
      throw new Error(getMockupError("recipe_not_chef_delete"));

    const recipe = await db.recipes.where("id").equals(id).first();

    if (!recipe) throw new Error(getMockupError("recipe_not_found"));

    await db.recipes.delete(id);

    return {
      data: {
        message: getMockupError("recipe_delete_success"),
      },
    };
  },
};

export const favouriteMock = {
  getAllFavourite: async () => {
    await delay(500);

    const userId = Number(localStorage.getItem("demo_users_id"));

    if (!userId) throw new Error(getMockupError("favourite_not_login"));

    const favourite = await db.favourite
      .where("userId")
      .equals(userId)
      .toArray();

    const recipeId = [
      ...new Set(favourite.map((item) => item.recipeId).filter(Boolean)),
    ];

    const recipes = await db.recipes.where("id").anyOf(recipeId).toArray();

    const recipeMap = new Map(recipes.map((item) => [item.id, item]));

    const data = favourite.map((item) => ({
      ...item,
      favourite_recipe: recipeMap.get(item.recipeId) ?? null,
    }));

    return {
      data,
    };
  },
  countFavourite: async () => {
    const userId = Number(localStorage.getItem("demo_users_id"));
    const favourite = await db.favourite.where("userId").equals(userId).count();

    console.log(favourite);

    return {
      data: favourite,
    };
  },
  createFavorite: async (id) => {
    await delay(500);

    const usersId = Number(localStorage.getItem("demo_users_id"));
    const userId = await db.users.where("id").equals(usersId).first();

    const recipe = await db.recipes.where("id").equals(id).first();

    const favourite = await db.favourite
      .where("userId")
      .equals(usersId)
      .filter((item) => item.recipeId === id)
      .first();

    if (favourite) throw new Error(getMockupError("favourite_exists"));

    await db.favourite.add({
      userId: userId.id,
      recipeId: recipe.id,
    });

    return {
      message: getMockupError("favourite_add_success"),
    };
  },
  deleteFavourite: async (id) => {
    await delay(500);

    const userId = Number(localStorage.getItem("demo_users_id"));

    if (!userId) throw new Error(getMockupError("favourite_not_login"));

    const favourite = await db.favourite
      .where("userId")
      .equals(userId)
      .filter((item) => item.recipeId === Number(id))
      .first();

    if (!favourite) throw new Error(getMockupError("favourite_not_found"));

    await db.favourite.delete(favourite.id);

    return {
      message: getMockupError("favourite_delete_success"),
    };
  },
};

/* =========================================================
   Profile
   ========================================================= */

export const profileMock = {
  getProfile: async () => {
    await delay(500);

    const userId = Number(localStorage.getItem("demo_users_id"));

    if (!userId) throw new Error(getMockupError("profile_not_login"));

    const profile = await db.profile_information
      .where("userId")
      .equals(userId)
      .first();

    return {
      data: profile || null,
    };
  },
  createProfile: async (data) => {
    await delay(500);

    const userId = Number(localStorage.getItem("demo_users_id"));

    if (!userId) throw new Error(getMockupError("profile_not_login"));

    const existingProfile = await db.profile_information
      .where("userId")
      .equals(userId)
      .first();

    if (existingProfile) throw new Error(getMockupError("profile_exists"));

    const profile = {
      ...data,
      userId,
      createdAt: now,
      updatedAt: now,
    };

    const id = await db.profile_information.add(profile);

    return {
      data: { id, ...profile },
    };
  },
  updateProfile: async (data) => {
    await delay(500);

    const userId = Number(localStorage.getItem("demo_users_id"));

    if (!userId) throw new Error(getMockupError("profile_not_login"));

    const existingProfile = await db.profile_information
      .where("userId")
      .equals(userId)
      .first();

    if (!existingProfile) throw new Error(getMockupError("profile_not_found"));

    const updatedProfile = {
      ...existingProfile,
      ...data,
      updatedAt: now,
    };

    await db.profile_information.put(updatedProfile);

    return {
      data: updatedProfile,
    };
  },
};

/* =========================================================
   QRCode / 2FA
   ========================================================= */

export const qrcodeMock = {
  setup2FAS: async () => {
    await delay(500);

    const userId = Number(localStorage.getItem("demo_users_id"));

    if (!userId) throw new Error(getMockupError("auth_not_login"));

    const user = await db.users.where("id").equals(userId).first();

    if (!user) throw new Error(getMockupError("user_not_found"));

    // Generate random bytes and encode as Base32 (RFC 4648)
    const randomBytes = new Uint8Array(20);
    crypto.getRandomValues(randomBytes);
    const secret = base32Encode(randomBytes);

    const qrCode = `otpauth://totp/MCO:${user.email}?secret=${secret}&issuer=MCO`;

    await db.users.update(userId, {
      two_factor_temp_secret: secret,
      two_factor_updateAt: now,
    });

    return {
      data: {
        secret,
        qrCode,
      },
    };
  },
  verify2FAS: async (data) => {
    await delay(500);

    const userId = Number(localStorage.getItem("demo_users_id"));

    if (!userId) throw new Error(getMockupError("auth_not_login"));

    const user = await db.users.where("id").equals(userId).first();

    if (!user) throw new Error(getMockupError("user_not_found"));

    const secret = user.two_factor_temp_secret || user.two_factor_secret;

    if (!secret) throw new Error(getMockupError("two_fa_secret_not_found"));

    const validCode = await generateTotpCode(secret);

    if (data.token !== validCode) {
      throw new Error(getMockupError("two_fa_code_wrong"));
    }

    await db.users.update(userId, {
      two_factor_enabled: "active",
      two_factor_secret: user.two_factor_temp_secret,
      two_factor_temp_secret: null,
      two_factor_updateAt: now,
    });

    return {
      data: {
        message: getMockupError("two_fa_enabled"),
      },
    };
  },
  disable2FAS: async () => {
    await delay(500);

    const userId = Number(localStorage.getItem("demo_users_id"));

    if (!userId) throw new Error(getMockupError("auth_not_login"));

    const user = await db.users.where("id").equals(userId).first();

    if (!user) throw new Error(getMockupError("user_not_found"));

    await db.users.update(userId, {
      two_factor_enabled: TWO_FACTOR_STATUS.INACTIVE,
      two_factor_secret: null,
      two_factor_temp_secret: null,
      two_factor_updateAt: now,
    });

    return {
      data: {
        message: getMockupError("two_fa_disabled"),
        two_factor_updateAt: now,
      },
    };
  },
};

/* =========================================================
   Upload
   ========================================================= */

export const uploadMock = {
  avatarUpload: async (formData) => {
    await delay(500);

    const userId = Number(localStorage.getItem("demo_users_id"));

    if (!userId) throw new Error(getMockupError("upload_not_login"));

    const user = await db.users.where("id").equals(userId).first();

    if (!user) throw new Error(getMockupError("user_not_found"));

    // Get file from FormData
    const file = formData.get("avatars");

    if (!file) throw new Error("File tidak ditemukan!");

    // Convert file to base64
    const base64 = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    // Save base64 to IndexDB
    await db.users.update(userId, {
      profile: base64,
      updatedAt: now,
    });

    return {
      data: {
        message: getMockupError("upload_success"),
        filename: base64,
      },
    };
  },
};

/* =========================================================
   Users
   ========================================================= */

export const usersMock = {
  getAllUsers: async (params = {}) => {
    await delay(500);

    const { search, sort, filter } = params;

    let users = await db.users.toArray();

    // Ensure all users have required fields
    users = users.map((user) => ({
      ...user,
      is_active: user.is_active || "active",
      is_verified: user.is_verified || "in_verified",
      two_factor_enabled: user.two_factor_enabled ?? "nonactive",
      two_factor_temp_secret: user.two_factor_temp_secret ?? null,
      two_factor_secret: user.two_factor_secret ?? null,
      two_factor_updateAt: user.two_factor_updateAt ?? null,
    }));

    // Filter by search
    if (search) {
      const searchLower = search.toLowerCase();
      users = users.filter(
        (user) =>
          user.username.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower),
      );
    }

    // Parse filter if it's a string
    const filterObj =
      typeof filter === "string" ? JSON.parse(filter || "{}") : filter || {};

    // Filter by role
    if (filterObj.role && filterObj.role !== "all") {
      users = users.filter((user) => user.role === filterObj.role);
    }

    // Filter by status
    if (filterObj.is_active && filterObj.is_active !== "all") {
      users = users.filter((user) => user.is_active === filterObj.is_active);
    }

    // Filter by verified
    if (filterObj.is_verified && filterObj.is_verified !== "all") {
      users = users.filter(
        (user) => user.is_verified === filterObj.is_verified,
      );
    }

    // Sort by username
    if (sort && sort !== "all") {
      users.sort((a, b) => {
        const aVal = a.username || "";
        const bVal = b.username || "";
        if (sort === "desc") {
          return bVal.localeCompare(aVal);
        }
        return aVal.localeCompare(bVal);
      });
    }

    return {
      data: users,
    };
  },
  getUserById: async (id) => {
    await delay(500);

    const user = await db.users.where("id").equals(Number(id)).first();

    if (!user) throw new Error(getMockupError("user_not_found"));

    return {
      data: user,
    };
  },
  updateUserById: async (id, data) => {
    await delay(500);

    const user = await db.users.where("id").equals(Number(id)).first();

    if (!user) throw new Error(getMockupError("user_not_found"));

    // Admin tidak boleh diubah
    if (user.role === ROLES.ADMIN) {
      throw new Error(getMockupError("user_admin_cannot_update"));
    }

    const updatedUser = {
      ...user,
      ...data,
      updatedAt: now,
    };

    await db.users.put(updatedUser);

    return {
      data: updatedUser,
    };
  },
  updateProfileUsers: async (data) => {
    await delay(500);

    const userId = Number(localStorage.getItem("demo_users_id"));

    if (!userId) throw new Error(getMockupError("auth_not_login"));

    const user = await db.users.where("id").equals(userId).first();

    if (!user) throw new Error(getMockupError("user_not_found"));

    const updatedUser = {
      ...user,
      ...data,
      updatedAt: now,
    };

    await db.users.put(updatedUser);

    return {
      data: updatedUser,
    };
  },
  updateStatusUsers: async (id, data) => {
    await delay(500);

    const user = await db.users.where("id").equals(Number(id)).first();

    if (!user) throw new Error(getMockupError("user_not_found"));

    // Admin tidak boleh diubah statusnya
    if (user.role === ROLES.ADMIN) {
      throw new Error(getMockupError("user_admin_cannot_change_status"));
    }

    // Cegah status delete dan banned untuk admin
    if (data.is_active === USER_STATUS.DELETED || data.is_active === USER_STATUS.BANNED) {
      throw new Error(getMockupError("user_admin_cannot_delete_ban"));
    }

    const updatedUser = {
      ...user,
      ...data,
      updatedAt: now,
    };

    await db.users.put(updatedUser);

    return {
      data: {
        message: getMockupError("user_status_updated"),
      },
    };
  },
  deleteUser: async () => {
    await delay(500);

    const userId = Number(localStorage.getItem("demo_users_id"));

    if (!userId) throw new Error(getMockupError("auth_not_login"));

    const user = await db.users.where("id").equals(userId).first();

    if (!user) throw new Error(getMockupError("user_not_found"));

    if (user.role === ROLES.ADMIN)
      throw new Error(getMockupError("user_admin_cannot_delete_ban"));

    await db.users.update(userId, {
      is_active: "deletes",
      updatedAt: now,
    });

    return {
      data: {
        message: getMockupError("user_deleted"),
      },
    };
  },
};

/* =========================================================
   Categories (Extended)
   ========================================================= */

export const categoryMockExtended = {
  createCategories: async (data) => {
    await delay(500);

    const category = {
      ...data,
      slug: data.name.toLowerCase().replace(/\s+/g, "-"),
      createdAt: now,
      updatedAt: now,
    };

    const id = await db.categories.add(category);

    return {
      data: { id, ...category },
    };
  },
  createAllCategories: async (data) => {
    await delay(500);

    const categories = data.map((cat) => ({
      ...cat,
      slug: cat.name.toLowerCase().replace(/\s+/g, "-"),
      createdAt: now,
      updatedAt: now,
    }));

    const ids = await db.categories.bulkAdd(categories);

    return {
      data: categories.map((cat, index) => ({ id: ids[index], ...cat })),
    };
  },
  deleteCategoriesById: async (id) => {
    await delay(500);

    const category = await db.categories.where("id").equals(Number(id)).first();

    if (!category) throw new Error(getMockupError("category_not_found"));

    await db.categories.delete(Number(id));

    return {
      data: {
        message: getMockupError("category_deleted"),
      },
    };
  },
};

/* =========================================================
   Recipes (Extended)
   ========================================================= */

export const recipesMockExtended = {
  getRecipesByCategory: async (category) => {
    await delay(500);

    const categoryData = await db.categories
      .where("slug")
      .equals(category)
      .first();

    if (!categoryData) throw new Error(getMockupError("category_not_found"));

    const recipes = await db.recipes
      .where("categoryId")
      .equals(categoryData.id)
      .toArray();

    return {
      data: recipes,
    };
  },
};

/* =========================================================
   Reviews — mirip backend/controllers/review.controller.js
   Aturan: rating int 1-5 wajib, comment maks 1000,
   1 review per user per resep, hanya resep status accept.
   ========================================================= */

const parseMockRating = (value) => {
  const rating = Number(value);
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) return null;
  return rating;
};

const normalizeMockComment = (comment) => {
  if (comment === undefined || comment === null) return null;
  if (typeof comment !== "string") throw new Error(getMockupError("review_comment_too_long"));
  const trimmed = comment.trim();
  if (trimmed.length > 1000) throw new Error(getMockupError("review_comment_too_long"));
  return trimmed === "" ? null : trimmed;
};

export const reviewMock = {
  getReviewsByRecipe: async (recipeId, query = {}) => {
    await delay(500);

    const id = Number(recipeId);
    if (!Number.isInteger(id)) throw new Error(getMockupError("review_recipe_not_found"));

    let { page = 1, limit = 10 } = query;
    page = Number(page);
    limit = Number(limit);
    if (!Number.isInteger(page) || page < 1) page = 1;
    if (!Number.isInteger(limit) || limit < 1 || limit > 50) limit = 10;

    const recipe = await db.recipes.where("id").equals(id).first();
    if (!recipe || recipe.status !== "accept") {
      throw new Error(getMockupError("review_recipe_not_found"));
    }

    const all = await db.reviews.where("recipeId").equals(id).toArray();
    all.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const count = all.length;
    const rows = all.slice((page - 1) * limit, page * limit);

    const reviewerIds = [...new Set(rows.map((r) => r.userId).filter(Boolean))];
    const reviewers = reviewerIds.length
      ? await db.users.where("id").anyOf(reviewerIds).toArray()
      : [];
    const reviewerMap = new Map(reviewers.map((u) => [u.id, u]));

    const data = rows.map((r) => {
      const u = reviewerMap.get(r.userId);
      return {
        ...r,
        reviewer: u
          ? { id: u.id, username: u.username, profile: u.profile }
          : null,
      };
    });

    return {
      data: {
        totalData: count,
        totalPage: Math.ceil(count / limit),
        currentPage: page,
        data,
      },
    };
  },
  getReviewSummaryByRecipe: async (recipeId) => {
    await delay(500);

    const id = Number(recipeId);
    if (!Number.isInteger(id)) throw new Error(getMockupError("review_recipe_not_found"));

    const recipe = await db.recipes.where("id").equals(id).first();
    if (!recipe || recipe.status !== "accept") {
      throw new Error(getMockupError("review_recipe_not_found"));
    }

    const all = await db.reviews.where("recipeId").equals(id).toArray();
    const count = all.length;
    const sum = all.reduce((acc, r) => acc + Number(r.rating || 0), 0);

    return {
      data: {
        recipeId: id,
        totalReviews: count,
        averageRating: count === 0 ? 0 : Math.round((sum / count) * 10) / 10,
      },
    };
  },
  getMyReviews: async () => {
    await delay(500);

    const userId = Number(localStorage.getItem("demo_users_id"));
    if (!userId) throw new Error(getMockupError("review_not_login"));

    const reviews = await db.reviews.where("userId").equals(userId).toArray();
    reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const recipeIds = [...new Set(reviews.map((r) => r.recipeId).filter(Boolean))];
    const recipes = recipeIds.length
      ? await db.recipes.where("id").anyOf(recipeIds).toArray()
      : [];
    const recipeMap = new Map(recipes.map((r) => [r.id, r]));

    return {
      data: reviews.map((r) => {
        const recipe = recipeMap.get(r.recipeId);
        return {
          ...r,
          review_recipe: recipe
            ? { id: recipe.id, title: recipe.title, slug: recipe.slug, image: recipe.thumbnail }
            : null,
        };
      }),
    };
  },
  createReview: async (recipeId, data) => {
    await delay(500);

    const userId = Number(localStorage.getItem("demo_users_id"));
    if (!userId) throw new Error(getMockupError("review_not_login"));

    const id = Number(recipeId);
    if (!Number.isInteger(id)) throw new Error(getMockupError("review_recipe_not_found"));

    const rating = parseMockRating(data?.rating);
    if (rating === null) throw new Error(getMockupError("review_invalid_rating"));
    const comment = normalizeMockComment(data?.comment);

    const recipe = await db.recipes.where("id").equals(id).first();
    if (!recipe || recipe.status !== "accept") {
      throw new Error(getMockupError("review_recipe_not_found"));
    }

    const existing = await db.reviews
      .where("[userId+recipeId]")
      .equals([userId, id])
      .first();
    if (existing) throw new Error(getMockupError("review_exists"));

    const now = new Date().toISOString();
    const review = { userId, recipeId: id, rating, comment, createdAt: now, updatedAt: now };
    const newId = await db.reviews.add(review);

    return {
      data: { id: newId, ...review },
      message: getMockupError("review_add_success"),
    };
  },
  updateReview: async (id, data) => {
    await delay(500);

    const userId = Number(localStorage.getItem("demo_users_id"));
    if (!userId) throw new Error(getMockupError("review_not_login"));

    const reviewId = Number(id);
    const review = await db.reviews.where("id").equals(reviewId).first();
    if (!review || review.userId !== userId) {
      throw new Error(getMockupError("review_not_found"));
    }

    const updates = {};
    if (data?.rating !== undefined) {
      const rating = parseMockRating(data.rating);
      if (rating === null) throw new Error(getMockupError("review_invalid_rating"));
      updates.rating = rating;
    }
    if (data?.comment !== undefined) {
      updates.comment = normalizeMockComment(data.comment);
    }
    if (Object.keys(updates).length === 0) {
      throw new Error(getMockupError("review_no_fields"));
    }

    const updated = { ...review, ...updates, updatedAt: new Date().toISOString() };
    await db.reviews.put(updated);

    return {
      data: updated,
      message: getMockupError("review_update_success"),
    };
  },
  deleteReview: async (id) => {
    await delay(500);

    const userId = Number(localStorage.getItem("demo_users_id"));
    if (!userId) throw new Error(getMockupError("review_not_login"));

    const reviewId = Number(id);
    const review = await db.reviews.where("id").equals(reviewId).first();
    if (!review) throw new Error(getMockupError("review_not_found"));

    const currentUser = await db.users.where("id").equals(userId).first();
    const isOwner = review.userId === userId;
    const isAdmin = currentUser?.role === ROLES.ADMIN;
    if (!isOwner && !isAdmin) throw new Error(getMockupError("review_forbidden"));

    await db.reviews.delete(reviewId);

    return {
      message: getMockupError("review_delete_success"),
    };
  },
};
