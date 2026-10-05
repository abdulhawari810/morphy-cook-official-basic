import Dexie from "dexie";

export const db = new Dexie("recipes_demo");

db.version(1).stores({
  users:
    "++id, username, email, password, role, profile, is_active, is_verified, two_factor_enabled, two_factor_temp_secret, two_factor_secret, two_factor_updateAt, createdAt, updatedAt",
  recipes:
    "++id, categoryId, userId, slug, title, description,instructions, ingredients, thumbnail, author, difficulty, time, status, createdAt, updatedAt ",
  categories: "++id, slug, name, desc, createdAt, updatedAt",
  favourite: "++id, userId, recipeId, createdAt, updatedAt",
  profile_information:
    "++id, userId, phone, bio, date, gender, skill, createdAt, updatedAt",
  refresh_token: "++id, user_id, token, createdAt, updatedAt",
});

// Version 2: Reset database to ensure clean schema with all 2FA fields
db.version(2).stores({
  users:
    "++id, username, email, password, role, profile, is_active, is_verified, two_factor_enabled, two_factor_temp_secret, two_factor_secret, two_factor_updateAt, createdAt, updatedAt",
  recipes:
    "++id, categoryId, userId, slug, title, description,instructions, ingredients, thumbnail, author, difficulty, time, status, createdAt, updatedAt ",
  categories: "++id, slug, name, desc, createdAt, updatedAt",
  favourite: "++id, userId, recipeId, createdAt, updatedAt",
  profile_information:
    "++id, userId, phone, bio, date, gender, skill, createdAt, updatedAt",
  refresh_token: "++id, user_id, token, createdAt, updatedAt",
}).upgrade(async (tx) => {
  // Clear all tables to ensure clean state
  await tx.table("users").clear();
  await tx.table("recipes").clear();
  await tx.table("categories").clear();
  await tx.table("favourite").clear();
  await tx.table("profile_information").clear();
  await tx.table("refresh_token").clear();
});

// Version 3: Force update all user records to include 2FA fields with proper values
db.version(3).stores({
  users:
    "++id, username, email, password, role, profile, is_active, is_verified, two_factor_enabled, two_factor_temp_secret, two_factor_secret, two_factor_updateAt, createdAt, updatedAt",
  recipes:
    "++id, categoryId, userId, slug, title, description,instructions, ingredients, thumbnail, author, difficulty, time, status, createdAt, updatedAt ",
  categories: "++id, slug, name, desc, createdAt, updatedAt",
  favourite: "++id, userId, recipeId, createdAt, updatedAt",
  profile_information:
    "++id, userId, phone, bio, date, gender, skill, createdAt, updatedAt",
  refresh_token: "++id, user_id, token, createdAt, updatedAt",
}).upgrade(async (tx) => {
  const users = await tx.table("users").toArray();
  
  for (const user of users) {
    await tx.table("users").put({
      ...user,
      two_factor_enabled: user.two_factor_enabled ?? "nonactive",
      two_factor_temp_secret: user.two_factor_temp_secret ?? null,
      two_factor_secret: user.two_factor_secret ?? null,
      two_factor_updateAt: user.two_factor_updateAt ?? null,
    });
  }
});

// Version 4: Tambah tabel reviews (rating 1-5 + komentar, unik per user per resep)
// Mirip backend/database/migrations/007_create_reviews_table.js
db.version(4).stores({
  users:
    "++id, username, email, password, role, profile, is_active, is_verified, two_factor_enabled, two_factor_temp_secret, two_factor_secret, two_factor_updateAt, createdAt, updatedAt",
  recipes:
    "++id, categoryId, userId, slug, title, description,instructions, ingredients, thumbnail, author, difficulty, time, status, createdAt, updatedAt ",
  categories: "++id, slug, name, desc, createdAt, updatedAt",
  favourite: "++id, userId, recipeId, createdAt, updatedAt",
  profile_information:
    "++id, userId, phone, bio, date, gender, skill, createdAt, updatedAt",
  refresh_token: "++id, user_id, token, createdAt, updatedAt",
  reviews: "++id, userId, recipeId, rating, [userId+recipeId], createdAt, updatedAt",
});

// Helper function to reset database (call this if schema issues occur)
export const resetDatabase = async () => {
  await db.delete();
  await db.open();
};
