/**
 * Seed default recipe categories.
 *
 * @param {import("knex").Knex} knex
 */

export const seed = async (knex) => {
  await knex("categories").del();

  await knex("categories").insert([
    {
      slug: "breakfast",
      name: "Breakfast",
      desc: "Recipes suitable for breakfast.",
    },
    {
      slug: "lunch",
      name: "Lunch",
      desc: "Recipes suitable for lunch.",
    },
    {
      slug: "dinner",
      name: "Dinner",
      desc: "Recipes suitable for dinner.",
    },
    {
      slug: "dessert",
      name: "Dessert",
      desc: "Sweet recipes and desserts.",
    },
    {
      slug: "indonesian",
      name: "Indonesian",
      desc: "Traditional Indonesian dishes from across the archipelago.",
    },
    {
      slug: "asian",
      name: "Asian",
      desc: "Popular dishes from various Asian cuisines.",
    },
    {
      slug: "western",
      name: "Western",
      desc: "Western-style dishes and comfort food.",
    },
    {
      slug: "seafood",
      name: "Seafood",
      desc: "Dishes made with fish, shrimp, squid, and other seafood.",
    },
    {
      slug: "chicken",
      name: "Chicken",
      desc: "Chicken-based dishes, fried, grilled, or simmered.",
    },
    {
      slug: "beef",
      name: "Beef",
      desc: "Beef-based dishes, from soups to slow-cooked classics.",
    },
    {
      slug: "vegetarian",
      name: "Vegetarian",
      desc: "Meat-free dishes full of flavor.",
    },
    {
      slug: "vegan",
      name: "Vegan",
      desc: "Plant-based dishes without any animal products.",
    },
    {
      slug: "soup",
      name: "Soup",
      desc: "Warm and comforting soups and broths.",
    },
    {
      slug: "noodles",
      name: "Noodles",
      desc: "Noodle dishes, stir-fried or served in broth.",
    },
    {
      slug: "rice",
      name: "Rice",
      desc: "Rice-based dishes, from fried rice to steamed specialties.",
    },
    {
      slug: "fried",
      name: "Fried",
      desc: "Crispy fried snacks and side dishes.",
    },
    {
      slug: "grilled",
      name: "Grilled",
      desc: "Grilled and barbecued dishes with smoky flavor.",
    },
    {
      slug: "steamed",
      name: "Steamed",
      desc: "Light and healthy steamed dishes.",
    },
    {
      slug: "snack",
      name: "Snack",
      desc: "Light snacks and street food favorites.",
    },
    {
      slug: "beverage",
      name: "Beverage",
      desc: "Traditional drinks and refreshing beverages.",
    },
  ]);
};
