/**
 * Create categories table.
 *
 * @param {import("knex").Knex} knex
 */

export const up = async (knex) => {
  await knex.schema.createTable("favourite", (table) => {
    table.increments("id").primary();

    table
      .integer("userId")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table
      .integer("recipeId")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("recipes")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

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
  await knex.schema.dropTableIfExists("favourite");
};
