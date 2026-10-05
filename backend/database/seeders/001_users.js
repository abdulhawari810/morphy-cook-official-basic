import argon2 from "argon2";

/**
 * Seed default users.
 *
 * @param {import("knex").Knex} knex
 */

export const seed = async (knex) => {
  await knex("users").del();

  const adminEmail = process.env.SEED_ADMIN_EMAIL || "admin@gmail.com";
  const chiefEmail =
    process.env.SEED_CHIEF_EMAIL ||
    process.env.SEED_CHEF_EMAIL ||
    "chef@gmail.com";
  const userEmail =
    process.env.SEED_USER_EMAIL ||
    process.env.SEED_USERS_EMAIL ||
    "users@gmail.com";

  const [adminPassword, chefPassword, usersPassword] = await Promise.all([
    argon2.hash(process.env.SEED_ADMIN_PASSWORD || "ChangeMe123!"),
    argon2.hash(
      process.env.SEED_CHIEF_PASSWORD ||
        process.env.SEED_CHEF_PASSWORD ||
        "ChangeMe123!",
    ),
    argon2.hash(
      process.env.SEED_USER_PASSWORD ||
        process.env.SEED_USERS_PASSWORD ||
        "ChangeMe123!",
    ),
  ]);

  await knex("users").insert([
    {
      username: "Admin123",
      email: adminEmail,
      password: adminPassword,
      role: "admin",
      is_active: "active",
      is_verified: "in_verified",
      two_factor_enabled: "nonactive",
    },
    {
      username: "Chef123",
      email: chiefEmail,
      password: chefPassword,
      role: "chief",
      is_active: "active",
      is_verified: "in_verified",
      two_factor_enabled: "nonactive",
    },
    {
      username: "Users123",
      email: userEmail,
      password: usersPassword,
      role: "users",
      is_active: "active",
      is_verified: "in_verified",
      two_factor_enabled: "nonactive",
    },
  ]);
};
