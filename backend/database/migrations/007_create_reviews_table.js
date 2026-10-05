/**
 * Create reviews table.
 * Satu review per user per resep (unique composite userId + recipeId).
 *
 * @param {import("knex").Knex} knex
 */

export const up = async (knex) => {
  await knex.schema.createTable("reviews", (table) => {
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

    table.integer("rating").notNullable();
    table.text("comment").nullable();

    table.unique(["userId", "recipeId"]);

    table.datetime("createdAt").nullable();
    table.datetime("updatedAt").nullable();
  });
};

/**
 * Drop reviews table.
 *
 * @param {import("knex").Knex} knex
 */

export const down = async (knex) => {
  await knex.schema.dropTableIfExists("reviews");
};
