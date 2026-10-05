/**
 * Create categories table.
 *
 * @param {import("knex").Knex} knex
 */

export const up = async (knex) => {
  await knex.schema.createTable("profile_information", (table) => {
    table.increments("id").primary();

    table
      .integer("userId")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    table.string("phone", 30).nullable();
    table.text("bio").nullable();
    table.date("date").nullable();
    table.enum("gender", ["male", "female"]).notNullable().defaultTo("male");
    table
      .enum("skill", ["beginner", "junior", "senior", "expert"])
      .notNullable()
      .defaultTo("beginner");
    table.json("preference_food").nullable();
    table.json("alergi_food").nullable();

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
  await knex.schema.dropTableIfExists("profile_information");
};
