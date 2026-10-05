/**
 * Create categories table.
 *
 * @param {import("knex").Knex} knex
 */

export const up = async (knex) => {
  await knex.schema.createTable("refresh_tokens", (table) => {
    table.increments("id").primary();

    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    table.string("token", 255).notNullable();

    table.date("createdAt").nullable();
    table.date("updatedAt").nullable();
  });
};

/**
 * Create categories table.
 *
 * @param {import("knex").Knex} knex
 */

export const down = async (knex) => {
  await knex.schema.dropTableIfExists("refresh_tokens");
};
