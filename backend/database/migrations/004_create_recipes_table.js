/**
 * Create categories table.
 *
 * @param {import("knex").Knex} knex
 */

export const up = async (knex) => {
  await knex.schema.createTable("recipes", (table) => {
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
      .integer("categoryId")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("categories")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    table.string("slug", 255).nullable().unique();
    table.string("title", 255).notNullable().unique();
    table.text("description").nullable();
    table.json("ingredients").notNullable();
    table.json("instructions").notNullable();
    table.string("image", 255).defaultTo("placeholder.png");
    table.string("author", 155).notNullable();
    table.string("difficulty", 155).nullable();
    table.integer("time", 255).nullable();
    table
      .enum("status", ["draft", "pending", "reject", "accept"])
      .notNullable()
      .defaultTo("pending");

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
  await knex.schema.dropTableIfExists("recipes");
};
