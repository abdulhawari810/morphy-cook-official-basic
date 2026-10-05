/**
 * Create categories table.
 *
 * @param {import("knex").Knex} knex
 */

export const up = async (knex) => {
  await knex.schema.createTable("categories", (table) => {
    table.increments("id").primary();

    table.string("slug", 150).nullable().unique();
    table.string("name", 150).notNullable();
    table.string("desc", 255).nullable();

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
  await knex.schema.dropTableIfExists("categories");
};
