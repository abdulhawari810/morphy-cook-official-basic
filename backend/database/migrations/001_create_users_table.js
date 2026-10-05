/**
 * create users table.
 *
 * @param {import("knex").Knex} knex
 */

export const up = async (knex) => {
  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary();

    table.string("username", 255).notNullable();
    table.string("email", 255).notNullable().unique();
    table.string("password", 255).notNullable();
    table.string("profile", 255).nullable();

    table
      .enum("role", ["admin", "chief", "users"])
      .notNullable()
      .defaultTo("users");
    table
      .enum("is_active", ["active", "in_active", "banned", "deletes"])
      .notNullable()
      .defaultTo("active");
    table
      .enum("is_verified", ["verified", "in_verified"])
      .notNullable()
      .defaultTo("in_verified");
    table
      .enum("two_factor_enabled", ["active", "nonactive"])
      .notNullable()
      .defaultTo("nonactive");
    table.string("two_factor_temp_secret", 255).nullable();
    table.string("two_factor_secret", 255).nullable();
    table.date("two_factor_updateAt").nullable();
    table.date("createdAt").nullable();
    table.date("updatedAt").nullable();
  });
};

/**
 * Drop users table.
 *
 * @param {import("knex").Knex} knex
 */

export const down = async (knex) => {
  await knex.schema.dropTableIfExists("users");
};
