/**
 * Seed default recipes.
 *
 * All recipes are assigned to the chief user
 * and distributed round-robin across all categories.
 *
 * @param {import("knex").Knex} knex
 */
export const seed = async (knex) => {
  await knex("recipes").del();

  const chief = await knex("users").where("role", "chief").first();

  const categories = await knex("categories").select("id").orderBy("id");

  if (!chief) {
    throw new Error('Chief user with role "chief" was not found.');
  }

  if (!categories || categories.length === 0) {
    throw new Error("No categories found. Seed categories first.");
  }

  const base = [
{
      slug: "beef-rendang",
      title: "Beef Rendang",
      description:
        "A rich and flavorful Indonesian beef dish cooked slowly in coconut milk and aromatic spices. Use low heat to prevent burning and allow the flavors to develop. The longer it cooks, the more flavorful the rendang becomes.",

      ingredients: JSON.stringify([
        "1 kg beef, cut into pieces",
        "1 liter thick coconut milk",
        "2 stalks lemongrass, bruised",
        "5 kaffir lime leaves",
        "1 turmeric leaf, optional",
        "Salt to taste",
        "5 cloves garlic",
        "8 shallots",
        "Red chilies to taste",
        "2 cm ginger",
        "3 cm turmeric",
        "3 candlenuts",
        "2 cm galangal",
      ]),

      instructions: JSON.stringify([
        "Blend the garlic, shallots, chilies, ginger, turmeric, candlenuts, and galangal into a smooth spice paste.",
        "Sauté the spice paste until fragrant.",
        "Add lemongrass, kaffir lime leaves, and turmeric leaf.",
        "Add the beef and stir until the meat changes color.",
        "Pour in the coconut milk and cook over low heat while stirring occasionally.",
        "Cook slowly for approximately 2–3 hours until the coconut milk reduces and the spices are absorbed.",
        "Continue stirring until the rendang becomes dark brown, rich, and oily.",
        "Serve with warm rice.",
      ]),

      image: "placeholder.png",

      difficulty: "medium",
      time: 25,
      status: "accept",
    },

{
      slug: "clear-spinach-soup",
      title: "Clear Spinach Soup",
      description:
        "A simple and refreshing Indonesian spinach soup made with sweet corn and aromatic herbs. Best served warm with steamed rice and fried fish.",

      ingredients: JSON.stringify([
        "1 bunch spinach, cleaned",
        "1 sweet corn, cut into pieces",
        "2 shallots, sliced",
        "1 clove garlic, sliced",
        "700 ml water",
        "Salt to taste",
        "A small amount of sugar",
        "Fingerroot, optional",
      ]),

      instructions: JSON.stringify([
        "Bring the water to a boil.",
        "Add the shallots, garlic, and fingerroot.",
        "Add the sweet corn and cook until tender.",
        "Add the spinach.",
        "Season with salt and a small amount of sugar.",
        "Cook briefly until the spinach wilts, then turn off the heat.",
        "Serve warm.",
      ]),

      image: "placeholder.png",

      difficulty: "medium",
      time: 15,
      status: "accept",
    },

{
      slug: "crispy-crushed-chicken",
      title: "Crispy Crushed Chicken",
      description:
        "Crispy fried chicken served with a spicy homemade chili sambal. Perfect with warm steamed rice for a simple and satisfying meal.",

      ingredients: JSON.stringify([
        "500 g chicken",
        "1 package crispy frying flour",
        "5 cloves garlic",
        "10 bird's eye chilies",
        "Salt and seasoning to taste",
        "Cooking oil",
      ]),

      instructions: JSON.stringify([
        "Clean the chicken and marinate it with salt and crushed garlic.",
        "Coat the chicken evenly with crispy frying flour.",
        "Deep-fry the chicken until golden brown and crispy.",
        "Pound the chilies, garlic, salt, and seasoning into a coarse sambal.",
        "Crush the fried chicken over the sambal.",
        "Serve with warm steamed rice.",
      ]),

      image: "placeholder.png",

      difficulty: "easy",
      time: 10,
      status: "accept",
    },

{
      slug: "simple-meatball-soup",
      title: "Simple Meatball Soup",
      description:
        "A simple and comforting meatball soup with vegetables and fresh herbs. Perfect for cold weather or whenever you want a warm bowl of soup.",

      ingredients: JSON.stringify([
        "15 meatballs",
        "1 carrot",
        "1 spring onion",
        "1 stalk celery",
        "2 cloves garlic",
        "1 liter water",
        "Salt to taste",
        "Pepper to taste",
        "Stock powder to taste",
      ]),

      instructions: JSON.stringify([
        "Slice the carrot, spring onion, and celery.",
        "Crush the garlic and sauté it until fragrant.",
        "Bring the water to a boil.",
        "Add the sautéed garlic and meatballs.",
        "Add the carrot and cook until tender.",
        "Season with salt, pepper, and stock powder.",
        "Add the spring onion and celery.",
        "Adjust the seasoning and serve warm.",
      ]),

      image: "placeholder.png",

      difficulty: "easy",
      time: 10,
      status: "accept",
    },

{
      slug: "seafood-fried-rice",
      title: "Seafood Fried Rice",
      description:
        "A flavorful Indonesian-style fried rice prepared with shrimp, squid, eggs, sweet soy sauce, and fresh vegetables.",

      ingredients: JSON.stringify([
        "1 plate cooked white rice",
        "Shrimp as needed",
        "Squid as needed",
        "2 cloves garlic",
        "3 shallots",
        "1 egg",
        "2 tablespoons sweet soy sauce",
        "Oyster sauce to taste",
        "Salt and stock powder to taste",
        "Sliced spring onion",
        "Chili to taste",
      ]),

      instructions: JSON.stringify([
        "Sauté the shallots and garlic until fragrant.",
        "Add the egg and scramble until cooked.",
        "Add the shrimp and squid and cook until done.",
        "Add the cooked rice and stir well.",
        "Add sweet soy sauce, oyster sauce, salt, and stock powder.",
        "Add the spring onion and chili.",
        "Stir-fry until everything is evenly cooked and fragrant.",
      ]),

      image: "placeholder.png",

      difficulty: "medium",
      time: 20,
      status: "accept",
    },

{
      slug: "yellow-chicken-soto",
      title: "Yellow Chicken Soto",
      description:
        "A fragrant Indonesian chicken soup with turmeric, lemongrass, kaffir lime leaves, and aromatic spices. Perfect for a warm and comforting meal.",

      ingredients: JSON.stringify([
        "500 g chicken, cut into pieces",
        "2 liters water",
        "2 stalks lemongrass, bruised",
        "3 kaffir lime leaves",
        "2 bay leaves",
        "2 cm galangal, bruised",
        "Salt and sugar to taste",
        "Cooking oil",
        "5 cloves garlic",
        "6 shallots",
        "3 roasted candlenuts",
        "2 cm turmeric",
        "1 cm ginger",
        "1 teaspoon coriander",
      ]),

      instructions: JSON.stringify([
        "Blend the garlic, shallots, candlenuts, turmeric, ginger, and coriander into a smooth spice paste.",
        "Sauté the spice paste until fragrant.",
        "Add lemongrass, kaffir lime leaves, bay leaves, and galangal.",
        "Add the chicken and stir until evenly coated with the spices.",
        "Pour in the water and bring to a boil.",
        "Cook until the chicken is tender and the broth becomes fragrant.",
        "Season with salt and sugar to taste.",
        "Serve the chicken soto warm.",
      ]),

      image: "placeholder.png",

      difficulty: "medium",
      time: 30,
      status: "accept",
    },

{
      slug: "simple-vegetable-fritters",
      title: "Simple Vegetable Fritters",
      description:
        "Crispy Indonesian vegetable fritters made with carrots, cabbage, spring onions, and a simple seasoned batter. Use hot oil to achieve a crisp texture. Small shrimp can be added for extra flavor.",

      ingredients: JSON.stringify([
        "1 carrot, grated",
        "Cabbage as needed, thinly sliced",
        "2 spring onions, sliced",
        "5 tablespoons all-purpose flour",
        "1 tablespoon rice flour",
        "1 clove garlic, crushed",
        "Salt to taste",
        "Pepper to taste",
        "Water as needed",
      ]),

      instructions: JSON.stringify([
        "Combine all the vegetables in a bowl.",
        "Add the all-purpose flour and rice flour.",
        "Add garlic, salt, and pepper.",
        "Gradually add water until a slightly thick batter forms.",
        "Heat the cooking oil.",
        "Scoop the batter into the hot oil using a spoon.",
        "Fry until golden brown and fully cooked.",
        "Drain and serve.",
      ]),

      image: "placeholder.png",

      difficulty: "medium",
      time: 30,
      status: "accept",
    },

{
      slug: "creamy-vegetable-lodeh",
      title: "Creamy Vegetable Lodeh",
      description:
        "A traditional Indonesian vegetable stew cooked in a rich and savory coconut milk broth. The combination of vegetables and aromatic spices creates a comforting homemade dish.",

      ingredients: JSON.stringify([
        "1 chayote, diced",
        "5 long beans, cut into pieces",
        "1 purple eggplant, cut into pieces",
        "1 sweet corn, cut into pieces",
        "500 ml coconut milk",
        "2 bay leaves",
        "1 piece galangal, bruised",
        "4 shallots",
        "2 cloves garlic",
        "2 candlenuts",
        "1 teaspoon coriander",
        "Salt and sugar to taste",
      ]),

      instructions: JSON.stringify([
        "Blend the shallots, garlic, candlenuts, and coriander into a smooth spice paste.",
        "Sauté the spice paste until fragrant.",
        "Add the bay leaves and galangal.",
        "Add water and then add the vegetables.",
        "Cook until the vegetables are partially tender.",
        "Pour in the coconut milk.",
        "Cook while stirring gently to prevent the coconut milk from separating.",
        "Adjust the seasoning and serve.",
      ]),

      image: "placeholder.png",

      difficulty: "medium",
      time: 30,
      status: "accept",
    },

{
      slug: "spicy-fried-fish-with-sambal",
      title: "Spicy Fried Fish with Sambal",
      description:
        "Crispy fried fish served with a spicy homemade chili sambal. Best enjoyed with warm rice and fresh vegetables.",

      ingredients: JSON.stringify([
        "2 fish, such as tilapia or catfish",
        "3 cloves garlic",
        "1 teaspoon salt",
        "1/2 teaspoon turmeric powder, optional",
        "Cooking oil",
        "10 red chilies",
        "5 bird's eye chilies",
        "2 cloves garlic",
        "3 shallots",
        "1 tomato",
        "1/2 teaspoon salt",
        "1 teaspoon sugar",
      ]),

      instructions: JSON.stringify([
        "Marinate the fish with garlic, salt, and turmeric for 15 minutes.",
        "Fry the fish until golden brown and crispy.",
        "Briefly fry the chili, garlic, shallots, and tomato.",
        "Pound the sambal ingredients roughly with salt and sugar.",
        "Pour the sambal over the fried fish.",
        "Serve immediately with warm rice and fresh vegetables.",
      ]),

      image: "placeholder.png",

      difficulty: "medium",
      time: 30,
      status: "accept",
    },

{
      slug: "simple-chinese-style-vegetable-soup",
      title: "Simple Vegetable Soup",
      description:
        "A warm and savory vegetable soup made with chicken, meatballs, leafy greens, and a light oyster sauce broth.",

      ingredients: JSON.stringify([
        "1 carrot, thinly sliced",
        "5 leaves mustard greens",
        "1/4 cabbage, cut into pieces",
        "5 meatballs, sliced",
        "1 chicken breast, cut into small pieces",
        "2 cloves garlic, minced",
        "1/2 onion, sliced",
        "1 tablespoon oyster sauce",
        "1 teaspoon soy sauce",
        "Salt and pepper to taste",
        "400 ml water",
        "1 teaspoon cornstarch, dissolved in water",
      ]),

      instructions: JSON.stringify([
        "Sauté the garlic and onion until fragrant.",
        "Add the chicken and meatballs and cook until the chicken changes color.",
        "Add the carrot and cook briefly.",
        "Pour in the water, then add the cabbage and mustard greens.",
        "Add oyster sauce, soy sauce, salt, and pepper.",
        "Add the dissolved cornstarch and stir until the broth thickens slightly.",
        "Adjust the seasoning and serve.",
      ]),

      image: "placeholder.png",

      difficulty: "hard",
      time: 40,
      status: "accept",
    },

{
      slug: "crispy-fried-tempeh",
      title: "Crispy Fried Tempeh",
      description:
        "Crispy fried tempeh coated in a lightly seasoned flour batter. Rice flour helps create a crunchy texture, while hot oil prevents the tempeh from absorbing too much oil.",

      ingredients: JSON.stringify([
        "1 block tempeh, thinly sliced",
        "5 tablespoons all-purpose flour",
        "2 tablespoons rice flour",
        "1 spring onion, sliced, optional",
        "2 cloves garlic, crushed",
        "1/2 teaspoon ground coriander",
        "Salt to taste",
        "Water as needed",
        "Cooking oil",
      ]),

      instructions: JSON.stringify([
        "Combine all-purpose flour, rice flour, garlic, coriander, salt, and spring onion.",
        "Gradually add water until a slightly thick batter forms.",
        "Dip each tempeh slice into the batter until evenly coated.",
        "Fry in hot oil until golden brown and crispy.",
        "Remove and drain excess oil.",
        "Serve while warm.",
      ]),

      image: "placeholder.png",

      difficulty: "easy",
      time: 8,
      status: "accept",
    },

{
      slug: "fresh-clear-chicken-soup",
      title: "Fresh Clear Chicken Soup",
      description:
        "A light and comforting clear chicken soup with vegetables and fresh herbs. Suitable as an everyday meal or a gentle dish when you want something light.",

      ingredients: JSON.stringify([
        "250 g chicken, cut into small pieces",
        "1 liter water",
        "3 cloves garlic, crushed",
        "1/2 onion, sliced",
        "1 carrot, sliced",
        "1 potato, cut into pieces",
        "1 spring onion, sliced",
        "1 stalk celery",
        "Salt to taste",
        "Stock powder, optional",
        "Pepper to taste",
      ]),

      instructions: JSON.stringify([
        "Boil the chicken until impurities rise to the surface, then discard the water and rinse the chicken.",
        "Boil the chicken again in fresh water until tender.",
        "Add garlic and onion and cook until fragrant.",
        "Add the carrot and potato and cook until tender.",
        "Season with salt, pepper, and stock powder.",
        "Add the spring onion and celery and cook briefly.",
        "Serve warm.",
      ]),

      image: "placeholder.png",

      difficulty: "easy",
      time: 8,
      status: "accept",
    },

{
      slug: "javanese-fried-noodles",
      title: "Javanese Fried Noodles",
      description:
        "A flavorful Indonesian-style fried noodle dish with a rich sweet soy sauce flavor. The spices are traditionally ground to create a deeper and more aromatic taste.",

      ingredients: JSON.stringify([
        "1 serving yellow noodles or egg noodles",
        "1 egg",
        "2 cabbage leaves, sliced",
        "1 spring onion",
        "Shredded chicken or meatballs, optional",
        "2 tablespoons sweet soy sauce",
        "1 teaspoon oyster sauce",
        "Salt and pepper to taste",
        "Cooking oil",
        "2 cloves garlic",
        "3 shallots",
        "2 candlenuts",
        "1/2 teaspoon pepper",
      ]),

      instructions: JSON.stringify([
        "Briefly boil the noodles and drain.",
        "Blend the garlic, shallots, candlenuts, and pepper into a spice paste.",
        "Sauté the spice paste until fragrant and fully cooked.",
        "Add the egg and scramble.",
        "Add the chicken or meatballs and cabbage and stir well.",
        "Add the noodles, sweet soy sauce, oyster sauce, salt, and pepper.",
        "Stir-fry until the seasonings are absorbed and the noodles become slightly dry.",
      ]),

      image: "placeholder.png",

      difficulty: "easy",
      time: 15,
      status: "accept",
    },

{
      slug: "water-spinach-with-shrimp-paste",
      title: "Stir-Fried Water Spinach with Shrimp Paste",
      description:
        "A quick and flavorful stir-fried water spinach dish with garlic, shallots, chilies, and roasted shrimp paste. Cook the vegetables briefly to keep them fresh and crisp.",

      ingredients: JSON.stringify([
        "1 bunch water spinach, cleaned",
        "3 cloves garlic, minced",
        "2 shallots, sliced",
        "2 red chilies, optional",
        "1/2 teaspoon roasted shrimp paste",
        "1 tablespoon oyster sauce",
        "1 teaspoon sugar",
        "Salt to taste",
        "50 ml water",
        "Cooking oil",
      ]),

      instructions: JSON.stringify([
        "Heat the oil and sauté the garlic and shallots until fragrant.",
        "Add the chilies and shrimp paste and stir well.",
        "Add the water spinach and stir quickly.",
        "Pour in the water and add oyster sauce, sugar, and salt.",
        "Cook briefly until the vegetables wilt while keeping their fresh texture.",
        "Adjust the seasoning and serve.",
      ]),

      image: "placeholder.png",

      difficulty: "easy",
      time: 15,
      status: "accept",
    },

{
      slug: "yellow-fried-chicken",
      title: "Indonesian Yellow Fried Chicken",
      description:
        "Tender chicken simmered with aromatic spices before being fried until golden brown. It is delicious with sambal, fresh vegetables, and warm rice.",

      ingredients: JSON.stringify([
        "1 whole chicken, cut into pieces",
        "500 ml coconut water, optional",
        "2 bay leaves",
        "2 stalks lemongrass, bruised",
        "1 piece galangal, bruised",
        "Salt and sugar to taste",
        "Cooking oil",
        "6 cloves garlic",
        "8 shallots",
        "3 roasted candlenuts",
        "1 piece turmeric",
        "1 piece ginger",
        "1 teaspoon coriander",
        "Pepper, optional",
      ]),

      instructions: JSON.stringify([
        "Blend the garlic, shallots, candlenuts, turmeric, ginger, and coriander into a smooth spice paste.",
        "Simmer the chicken with the spice paste, herbs, and coconut water.",
        "Cook until the chicken is tender and the liquid has reduced.",
        "Remove the chicken and drain.",
        "Fry the chicken until golden brown.",
        "Serve with sambal and fresh vegetables.",
      ]),

      image: "placeholder.png",

      difficulty: "medium",
      time: 40,
      status: "accept",
    },

{
      slug: "fresh-tamarind-vegetable-soup",
      title: "Fresh Tamarind Vegetable Soup",
      description:
        "A refreshing Indonesian vegetable soup with sweet corn, long beans, chayote, and tamarind. Its light sour and savory flavor makes it perfect for a fresh everyday meal.",

      ingredients: JSON.stringify([
        "1 sweet corn, cut into pieces",
        "1 handful long beans, cut into pieces",
        "1 chayote, diced",
        "1 handful melinjo leaves",
        "50 g melinjo, optional",
        "2 tablespoons tamarind mixed with water",
        "1 liter water",
        "3 shallots",
        "2 cloves garlic",
        "2 red chilies",
        "1 teaspoon shrimp paste",
        "Salt and sugar to taste",
      ]),

      instructions: JSON.stringify([
        "Bring the water to a boil.",
        "Add the sweet corn and melinjo and cook until partially tender.",
        "Add the blended shallots, garlic, chilies, and shrimp paste.",
        "Add the chayote and long beans.",
        "Pour in the tamarind water and season with salt and sugar.",
        "Add the melinjo leaves and cook briefly.",
        "Adjust the seasoning and serve.",
      ]),

      image: "placeholder.png",

      difficulty: "medium",
      time: 20,
      status: "accept",
    },

{
      slug: "village-style-fried-rice",
      title: "Village-Style Fried Rice",
      description:
        "A classic Indonesian fried rice made with cold rice, aromatic spices, chili, and shrimp paste. Using cold rice helps keep the texture firm and prevents the fried rice from becoming soggy.",

      ingredients: JSON.stringify([
        "2 plates cooked white rice, preferably cold",
        "2 cloves garlic",
        "3 shallots",
        "2–3 red chilies",
        "1 egg",
        "1 tablespoon sweet soy sauce",
        "1/2 teaspoon shrimp paste, optional",
        "Salt to taste",
        "Cooking oil",
        "Shredded chicken, anchovies, or sausage",
        "Fried egg, crackers, and pickles for serving",
      ]),

      instructions: JSON.stringify([
        "Blend the garlic, shallots, chilies, and shrimp paste.",
        "Sauté the spice paste until fragrant.",
        "Add the egg and scramble.",
        "Add the rice and stir well.",
        "Add sweet soy sauce and salt.",
        "Cook until the rice becomes slightly dry and fragrant.",
        "Adjust the seasoning and serve with your preferred toppings.",
      ]),

      image: "placeholder.png",

      difficulty: "medium",
      time: 20,
      status: "accept",
    },

{
      slug: "spaghetti-with-meat-sauce",
      title: "Spaghetti with Meat Sauce",
      description:
        "A simple spaghetti dish served with a savory tomato-based meat sauce. It is easy to prepare and works well as a comforting everyday meal.",

      ingredients: JSON.stringify([
        "1 package spaghetti",
        "200 g ground beef",
        "3 cloves garlic, minced",
        "1/2 onion, sliced",
        "1 sachet tomato sauce",
        "2 tablespoons chili sauce, optional",
        "Salt and sugar to taste",
        "Pepper to taste",
        "Cooking oil",
      ]),

      instructions: JSON.stringify([
        "Boil the spaghetti until cooked, then drain.",
        "Sauté the garlic and onion until fragrant.",
        "Add the ground beef and cook until it changes color.",
        "Add the tomato sauce and chili sauce.",
        "Season with salt, sugar, and pepper.",
        "Cook until the sauce becomes slightly thick.",
        "Serve the spaghetti with the meat sauce on top.",
      ]),

      image: "placeholder.png",

      difficulty: "medium",
      time: 30,
      status: "accept",
    },

{
      slug: "simple-fried-macaroni",
      title: "Simple Fried Macaroni",
      description:
        "A quick and savory fried macaroni dish with eggs, garlic, shallots, oyster sauce, and sweet soy sauce. Perfect for a simple breakfast or snack.",

      ingredients: JSON.stringify([
        "200 g macaroni, boiled and drained",
        "2 eggs",
        "3 cloves garlic, minced",
        "2 shallots, sliced",
        "2 tablespoons oyster sauce",
        "1 tablespoon sweet soy sauce",
        "Salt and pepper to taste",
        "Spring onion, sliced",
        "Cooking oil",
      ]),

      instructions: JSON.stringify([
        "Heat the oil and sauté the garlic and shallots until fragrant.",
        "Add the eggs and scramble until cooked.",
        "Add the macaroni and stir well.",
        "Add oyster sauce, sweet soy sauce, salt, and pepper.",
        "Stir until the seasonings are evenly distributed and the macaroni becomes slightly dry.",
        "Add the spring onion and stir briefly.",
        "Serve warm.",
      ]),

      image: "placeholder.png",

      difficulty: "easy",
      time: 15,
      status: "accept",
    },

{
      slug: "crispy-fried-spring-rolls",
      title: "Crispy Fried Spring Rolls",
      description:
        "Crispy Indonesian-style spring rolls filled with carrots, cabbage, egg, and savory seasonings. Best served with chili sauce or fresh chilies.",

      ingredients: JSON.stringify([
        "10 spring roll wrappers",
        "2 carrots, grated",
        "100 g cabbage, thinly sliced",
        "2 cloves garlic, minced",
        "1 egg",
        "1 tablespoon oyster sauce",
        "Salt and pepper to taste",
        "Cooking oil",
      ]),

      instructions: JSON.stringify([
        "Sauté the garlic until fragrant.",
        "Add the carrots and cabbage and stir until slightly wilted.",
        "Add the egg and scramble.",
        "Season with oyster sauce, salt, and pepper.",
        "Place a suitable amount of filling onto each spring roll wrapper and roll tightly.",
        "Seal the edges with a little water.",
        "Fry until golden brown and crispy.",
        "Drain and serve with chili sauce or fresh chilies.",
      ]),

      image: "placeholder.png",

      difficulty: "easy",
      time: 15,
      status: "accept",
    },

    {
      slug: "chicken-rendang-padang",
      title: "Padang Chicken Rendang",
      description:
        "Chicken slow-cooked in spiced coconut milk until the sauce thickens and coats the meat. A lighter alternative to beef rendang with the same rich flavor.",
      ingredients: JSON.stringify([
        "1 kg chicken, cut into pieces",
        "800 ml thick coconut milk",
        "2 stalks lemongrass, bruised",
        "3 kaffir lime leaves",
        "Salt to taste",
        "8 shallots, 4 cloves garlic, chilies, ginger and turmeric blended into paste",
      ]),
      instructions: JSON.stringify([
        "Blend shallots, garlic, chilies, ginger and turmeric into a smooth paste.",
        "Saute the paste with lemongrass and lime leaves until fragrant.",
        "Add chicken and stir until coated with spices.",
        "Pour in coconut milk and simmer on low heat.",
        "Cook until the sauce thickens and the chicken is tender, then serve.",
      ]),
      image: "placeholder.png",
      difficulty: "easy",
      time: 10,
      status: "accept",
    },

    {
      slug: "egg-rendang-padang",
      title: "Padang Egg Rendang",
      description:
        "Boiled eggs simmered in thick rendang spices until the sauce clings to the eggs. A popular and affordable Padang side dish.",
      ingredients: JSON.stringify([
        "6 boiled eggs, lightly fried",
        "500 ml thick coconut milk",
        "1 stalk lemongrass, bruised",
        "2 kaffir lime leaves",
        "Salt to taste",
        "5 shallots, 3 cloves garlic, red chilies and ginger blended into paste",
      ]),
      instructions: JSON.stringify([
        "Lightly fry the boiled eggs until the skin blisters.",
        "Saute the spice paste with lemongrass and lime leaves.",
        "Pour in the coconut milk and bring to a gentle simmer.",
        "Add the eggs and cook on low heat while stirring.",
        "Cook until the sauce thickens and coats the eggs, then serve.",
      ]),
      image: "placeholder.png",
      difficulty: "medium",
      time: 17,
      status: "accept",
    },

    {
      slug: "beef-dendeng-balado",
      title: "Beef Dendeng Balado",
      description:
        "Thin slices of fried beef topped with spicy red chili balado sambal. Crispy, savory and fiery at the same time.",
      ingredients: JSON.stringify([
        "500 g beef, thinly sliced",
        "10 red chilies",
        "5 shallots",
        "Salt to taste",
        "1 teaspoon sugar",
        "Cooking oil as needed",
      ]),
      instructions: JSON.stringify([
        "Boil the beef slices until tender, then drain.",
        "Pound the slices lightly and fry until dry and crispy.",
        "Coarsely grind chilies and shallots.",
        "Saute the chili mixture with salt and sugar.",
        "Top the fried beef with the balado sambal and serve.",
      ]),
      image: "placeholder.png",
      difficulty: "hard",
      time: 24,
      status: "accept",
    },

    {
      slug: "chicken-gulai-padang",
      title: "Padang Chicken Gulai",
      description:
        "Chicken simmered in a yellow coconut curry with turmeric, galangal and lemongrass. A staple curry of Padang cuisine.",
      ingredients: JSON.stringify([
        "1 kg chicken, cut into pieces",
        "700 ml coconut milk",
        "2 stalks lemongrass, bruised",
        "1 piece galangal, bruised",
        "Salt to taste",
        "Shallots, garlic, turmeric, ginger and coriander blended into paste",
      ]),
      instructions: JSON.stringify([
        "Blend the spice ingredients into a smooth paste.",
        "Saute the paste with lemongrass and galangal until fragrant.",
        "Add the chicken and stir until coated.",
        "Pour in the coconut milk and simmer.",
        "Cook until the chicken is tender and the curry thickens, then serve.",
      ]),
      image: "placeholder.png",
      difficulty: "easy",
      time: 31,
      status: "accept",
    },

    {
      slug: "beef-gulai-medan",
      title: "Medan Beef Gulai",
      description:
        "Tender beef chunks in a thick spiced coconut curry with cardamom and cloves. Rich, aromatic and deeply savory.",
      ingredients: JSON.stringify([
        "750 g beef, cubed",
        "700 ml coconut milk",
        "2 cardamom pods",
        "3 cloves",
        "Salt to taste",
        "Shallots, garlic, chilies, turmeric and coriander blended into paste",
      ]),
      instructions: JSON.stringify([
        "Saute the spice paste with cardamom and cloves until fragrant.",
        "Add the beef cubes and stir until they change color.",
        "Pour in the coconut milk.",
        "Simmer on low heat until the beef is tender.",
        "Adjust seasoning and serve with warm rice.",
      ]),
      image: "placeholder.png",
      difficulty: "medium",
      time: 38,
      status: "accept",
    },

    {
      slug: "fish-gulai-aceh",
      title: "Aceh Fish Gulai",
      description:
        "Fresh fish cooked in a tangy Acehnese curry with tamarind and aromatic leaves. Sour, spicy and refreshing.",
      ingredients: JSON.stringify([
        "600 g mackerel, cleaned and cut",
        "500 ml coconut milk",
        "1 tablespoon tamarind water",
        "3 kaffir lime leaves",
        "Salt to taste",
        "Shallots, garlic, chilies and turmeric blended into paste",
      ]),
      instructions: JSON.stringify([
        "Saute the spice paste with lime leaves until fragrant.",
        "Pour in the coconut milk and bring to a simmer.",
        "Add the fish pieces carefully.",
        "Pour in the tamarind water and season.",
        "Cook until the fish is done and serve.",
      ]),
      image: "placeholder.png",
      difficulty: "hard",
      time: 45,
      status: "accept",
    },

    {
      slug: "chicken-opor-lebaran",
      title: "Chicken Opor for Festive Days",
      description:
        "Chicken braised in a mild white coconut gravy with coriander and cumin. A classic festive dish served with ketupat.",
      ingredients: JSON.stringify([
        "1 kg chicken, cut into pieces",
        "700 ml coconut milk",
        "2 bay leaves",
        "1 stalk lemongrass, bruised",
        "Salt and sugar to taste",
        "Shallots, garlic, candlenuts, coriander and cumin blended into paste",
      ]),
      instructions: JSON.stringify([
        "Saute the spice paste with bay leaves and lemongrass.",
        "Add the chicken and stir until coated.",
        "Pour in the coconut milk.",
        "Simmer until the chicken is tender.",
        "Adjust seasoning and serve with ketupat.",
      ]),
      image: "placeholder.png",
      difficulty: "easy",
      time: 52,
      status: "accept",
    },

    {
      slug: "egg-opor-simple",
      title: "Simple Egg Opor",
      description:
        "Boiled eggs simmered in a gentle coconut gravy with mild spices. An easy everyday version of opor.",
      ingredients: JSON.stringify([
        "6 boiled eggs",
        "500 ml coconut milk",
        "2 bay leaves",
        "Salt and sugar to taste",
        "1 stalk lemongrass, bruised",
        "Shallots, garlic, candlenuts and coriander blended into paste",
      ]),
      instructions: JSON.stringify([
        "Saute the spice paste with bay leaves and lemongrass.",
        "Pour in the coconut milk and simmer gently.",
        "Add the boiled eggs.",
        "Season with salt and sugar.",
        "Cook briefly until flavors blend, then serve.",
      ]),
      image: "placeholder.png",
      difficulty: "medium",
      time: 59,
      status: "accept",
    },

    {
      slug: "chicken-rica-rica-manado",
      title: "Manado Chicken Rica-Rica",
      description:
        "Chicken tossed in a fiery Manado chili sauce with lemongrass and lime leaves. Bold, hot and aromatic.",
      ingredients: JSON.stringify([
        "1 kg chicken, cut into pieces",
        "15 bird eye chilies, crushed",
        "3 stalks lemongrass, bruised",
        "4 kaffir lime leaves",
        "Salt to taste",
        "6 shallots and 4 cloves garlic, sliced",
      ]),
      instructions: JSON.stringify([
        "Saute shallots and garlic until fragrant.",
        "Add chilies, lemongrass and lime leaves.",
        "Add the chicken and stir well.",
        "Cook until the chicken is tender and the sauce reduces.",
        "Adjust seasoning and serve hot.",
      ]),
      image: "placeholder.png",
      difficulty: "hard",
      time: 66,
      status: "accept",
    },

    {
      slug: "tuna-woku-manado",
      title: "Manado Tuna Woku",
      description:
        "Tuna cooked in a fragrant Manado basil and turmeric sauce with chilies. Fresh, spicy and full of herbs.",
      ingredients: JSON.stringify([
        "600 g tuna, cut into chunks",
        "1 bunch basil leaves",
        "10 bird eye chilies",
        "2 stalks lemongrass, bruised",
        "Salt to taste",
        "Shallots, garlic, turmeric and ginger blended into paste",
      ]),
      instructions: JSON.stringify([
        "Saute the spice paste with lemongrass until fragrant.",
        "Add the tuna chunks and stir gently.",
        "Add chilies and a little water.",
        "Cook until the tuna is done.",
        "Stir in basil leaves and serve.",
      ]),
      image: "placeholder.png",
      difficulty: "easy",
      time: 73,
      status: "accept",
    },

    {
      slug: "beef-rawon-surabaya",
      title: "Surabaya Beef Rawon",
      description:
        "Dark beef soup flavored with keluak nuts, giving it a deep color and earthy taste. A Surabaya icon.",
      ingredients: JSON.stringify([
        "500 g beef, cubed",
        "3 keluak nuts, flesh mashed",
        "1 liter water",
        "2 stalks lemongrass, bruised",
        "Salt to taste",
        "Shallots, garlic, chilies and turmeric blended into paste",
      ]),
      instructions: JSON.stringify([
        "Saute the spice paste with mashed keluak until fragrant.",
        "Add the beef and stir until coated.",
        "Pour in the water.",
        "Simmer until the beef is very tender.",
        "Season and serve with bean sprouts and egg.",
      ]),
      image: "placeholder.png",
      difficulty: "medium",
      time: 80,
      status: "accept",
    },

    {
      slug: "beef-sop-konro",
      title: "Makassar Konro Rib Soup",
      description:
        "Beef ribs simmered with keluak and coriander into a dark, hearty soup. A beloved Makassar specialty.",
      ingredients: JSON.stringify([
        "750 g beef ribs",
        "2 keluak nuts, flesh mashed",
        "1.5 liters water",
        "1 teaspoon coriander",
        "Salt to taste",
        "Shallots, garlic and ginger blended into paste",
      ]),
      instructions: JSON.stringify([
        "Boil the ribs briefly, discard water and rinse.",
        "Saute the spice paste with keluak and coriander.",
        "Add ribs and fresh water.",
        "Simmer until the ribs are tender.",
        "Season and serve with lime and sambal.",
      ]),
      image: "placeholder.png",
      difficulty: "hard",
      time: 87,
      status: "accept",
    },

    {
      slug: "coto-makassar",
      title: "Makassar Coto",
      description:
        "A thick peanut-flavored beef soup with rice cakes, a Makassar legend. Served with lime and green sambal.",
      ingredients: JSON.stringify([
        "500 g beef, cubed",
        "100 g ground peanuts, fried",
        "1.5 liters water",
        "2 stalks lemongrass, bruised",
        "Salt to taste",
        "Shallots, garlic, cumin and coriander blended into paste",
      ]),
      instructions: JSON.stringify([
        "Boil the beef until tender and keep the broth.",
        "Saute the spice paste with lemongrass.",
        "Add the paste and ground peanuts into the broth.",
        "Simmer until the soup thickens slightly.",
        "Serve with rice cakes, lime and sambal.",
      ]),
      image: "placeholder.png",
      difficulty: "easy",
      time: 94,
      status: "accept",
    },

    {
      slug: "pallubasa-makassar",
      title: "Makassar Pallubasa",
      description:
        "Beef soup similar to coto but enriched with grated coconut and an egg yolk. Creamy and savory.",
      ingredients: JSON.stringify([
        "500 g beef, cubed",
        "50 g grated coconut, toasted",
        "1 egg yolk per serving",
        "1.2 liters water",
        "Salt to taste",
        "Shallots, garlic, cumin and coriander blended into paste",
      ]),
      instructions: JSON.stringify([
        "Boil the beef until tender.",
        "Saute the spice paste until fragrant.",
        "Add the paste and toasted coconut into the broth.",
        "Simmer until flavors blend.",
        "Serve topped with a raw egg yolk.",
      ]),
      image: "placeholder.png",
      difficulty: "medium",
      time: 101,
      status: "accept",
    },

    {
      slug: "soto-betawi-coconut",
      title: "Betawi Coconut Soto",
      description:
        "Beef soup in a creamy coconut and milk broth with potatoes and tomatoes. Rich Betawi comfort food.",
      ingredients: JSON.stringify([
        "500 g beef, cubed",
        "400 ml coconut milk",
        "200 ml milk",
        "2 potatoes, fried",
        "Salt and pepper to taste",
        "Shallots, garlic and candlenuts blended into paste",
      ]),
      instructions: JSON.stringify([
        "Boil the beef until tender and keep the broth.",
        "Saute the spice paste until fragrant.",
        "Pour the paste into the broth.",
        "Add coconut milk and milk, simmer gently.",
        "Serve with potatoes, tomato and fried shallots.",
      ]),
      image: "placeholder.png",
      difficulty: "hard",
      time: 108,
      status: "accept",
    },

    {
      slug: "soto-banjar-chicken",
      title: "Banjar Chicken Soto",
      description:
        "Clear Banjar chicken soup with cinnamon, nutmeg and potato cakes. Light yet deeply aromatic.",
      ingredients: JSON.stringify([
        "500 g chicken",
        "1.5 liters water",
        "1 cinnamon stick",
        "1/2 teaspoon nutmeg",
        "Salt to taste",
        "Shallots, garlic and pepper blended into paste",
      ]),
      instructions: JSON.stringify([
        "Boil the chicken until tender, shred the meat.",
        "Saute the spice paste with cinnamon.",
        "Add the paste into the broth.",
        "Season with salt and nutmeg.",
        "Serve with shredded chicken and potato cakes.",
      ]),
      image: "placeholder.png",
      difficulty: "easy",
      time: 115,
      status: "accept",
    },

    {
      slug: "beef-soto-madura",
      title: "Madura Beef Soto",
      description:
        "Clear Madura beef soup with a bright yellow broth and fried peanuts. Savory and satisfying.",
      ingredients: JSON.stringify([
        "500 g beef, cubed",
        "1.5 liters water",
        "1 teaspoon turmeric powder",
        "Fried peanuts for garnish",
        "Salt to taste",
        "Shallots, garlic, ginger and candlenuts blended into paste",
      ]),
      instructions: JSON.stringify([
        "Boil the beef until tender and keep the broth.",
        "Saute the spice paste with turmeric.",
        "Add the paste into the broth.",
        "Simmer until fragrant.",
        "Serve with rice, peanuts and lime.",
      ]),
      image: "placeholder.png",
      difficulty: "medium",
      time: 11,
      status: "accept",
    },

    {
      slug: "soto-lamongan-chicken",
      title: "Lamongan Chicken Soto",
      description:
        "Lamongan-style chicken soto with koya powder made from crackers and fried garlic. Savory with a distinctive topping.",
      ingredients: JSON.stringify([
        "500 g chicken",
        "1.5 liters water",
        "Koya powder from crackers and fried garlic",
        "2 stalks lemongrass, bruised",
        "Salt to taste",
        "Shallots, garlic, turmeric and candlenuts blended into paste",
      ]),
      instructions: JSON.stringify([
        "Boil the chicken until tender, shred the meat.",
        "Saute the spice paste with lemongrass.",
        "Add the paste into the broth and simmer.",
        "Season with salt.",
        "Serve with shredded chicken and koya powder.",
      ]),
      image: "placeholder.png",
      difficulty: "hard",
      time: 18,
      status: "accept",
    },

    {
      slug: "soto-bandeng-milkfish",
      title: "Milkfish Soto",
      description:
        "Clear soto with milkfish, turmeric and lemongrass instead of chicken. A fresh twist from milkfish-producing regions.",
      ingredients: JSON.stringify([
        "2 milkfish, cleaned and cut",
        "1.2 liters water",
        "1 teaspoon turmeric powder",
        "2 stalks lemongrass, bruised",
        "Salt to taste",
        "Shallots, garlic, ginger and candlenuts blended into paste",
      ]),
      instructions: JSON.stringify([
        "Saute the spice paste with lemongrass and turmeric.",
        "Pour in the water and bring to a boil.",
        "Add the milkfish pieces.",
        "Cook until the fish is done.",
        "Season and serve with rice and sambal.",
      ]),
      image: "placeholder.png",
      difficulty: "easy",
      time: 25,
      status: "accept",
    },

    {
      slug: "chicken-sate-madura",
      title: "Madura Chicken Satay",
      description:
        "Grilled chicken skewers with sweet peanut sauce, a Madura street-food legend. Served with rice cakes.",
      ingredients: JSON.stringify([
        "500 g chicken fillet, cubed",
        "Bamboo skewers",
        "150 g peanuts, fried and ground",
        "3 tablespoons sweet soy sauce",
        "Salt to taste",
        "Shallots, garlic and candlenuts blended into paste",
      ]),
      instructions: JSON.stringify([
        "Marinate chicken with a little spice paste and soy sauce.",
        "Thread onto bamboo skewers.",
        "Grill while basting with oil and soy sauce.",
        "Simmer ground peanuts with paste into a sauce.",
        "Serve the satay with peanut sauce and rice cakes.",
      ]),
      image: "placeholder.png",
      difficulty: "medium",
      time: 32,
      status: "accept",
    },

    {
      slug: "goat-sate-klathak",
      title: "Klathak Goat Satay",
      description:
        "Goat satay grilled on iron skewers with only salt and pepper. Minimalist and smoky from Jepara.",
      ingredients: JSON.stringify([
        "500 g young goat meat, cubed",
        "Iron or bamboo skewers",
        "Salt to taste",
        "Pepper to taste",
        "Sweet soy sauce for serving",
        "Lime for serving",
      ]),
      instructions: JSON.stringify([
        "Season the goat meat with salt and pepper.",
        "Thread onto skewers.",
        "Grill over charcoal until cooked.",
        "Rest the meat briefly.",
        "Serve with soy sauce and lime.",
      ]),
      image: "placeholder.png",
      difficulty: "hard",
      time: 39,
      status: "accept",
    },

    {
      slug: "chicken-sate-padang",
      title: "Padang Chicken Satay",
      description:
        "Chicken satay served with a thick yellow curry-like sauce instead of peanuts. Spicy and distinctive.",
      ingredients: JSON.stringify([
        "500 g chicken, cubed",
        "Bamboo skewers",
        "50 g rice flour",
        "1 teaspoon turmeric powder",
        "Salt to taste",
        "Shallots, garlic, chilies and cumin blended into paste",
      ]),
      instructions: JSON.stringify([
        "Grill the skewered chicken until cooked.",
        "Saute the spice paste with turmeric.",
        "Add water and thicken with rice flour.",
        "Season the sauce.",
        "Pour the sauce over the satay and serve.",
      ]),
      image: "placeholder.png",
      difficulty: "easy",
      time: 46,
      status: "accept",
    },

    {
      slug: "beef-sate-marangi",
      title: "Marangi Beef Satay",
      description:
        "Purwakarta beef satay marinated in sweet soy and spices, served without sauce. Sweet, tender and smoky.",
      ingredients: JSON.stringify([
        "500 g beef, thinly sliced",
        "5 tablespoons sweet soy sauce",
        "Bamboo skewers",
        "Salt to taste",
        "1 tablespoon tamarind water",
        "Shallots, garlic, coriander and palm sugar blended into paste",
      ]),
      instructions: JSON.stringify([
        "Marinate the beef with the paste and soy sauce for one hour.",
        "Thread onto skewers.",
        "Grill while basting with marinade.",
        "Cook until caramelized.",
        "Serve with tomato sambal and warm rice.",
      ]),
      image: "placeholder.png",
      difficulty: "medium",
      time: 53,
      status: "accept",
    },

    {
      slug: "sate-lilit-bali-chicken",
      title: "Balinese Chicken Sate Lilit",
      description:
        "Minced chicken mixed with coconut wrapped around lemongrass sticks and grilled. Fragrant Balinese specialty.",
      ingredients: JSON.stringify([
        "500 g minced chicken",
        "100 g grated coconut",
        "Lemongrass stalks for skewers",
        "Salt to taste",
        "1 teaspoon palm sugar",
        "Shallots, garlic, chilies, turmeric and galangal blended into paste",
      ]),
      instructions: JSON.stringify([
        "Mix minced chicken, coconut, sugar and paste.",
        "Wrap the mixture around lemongrass stalks.",
        "Grill while turning until cooked.",
        "Cook until the surface is golden.",
        "Serve with sambal matah.",
      ]),
      image: "placeholder.png",
      difficulty: "hard",
      time: 60,
      status: "accept",
    },

    {
      slug: "grilled-chicken-taliwang",
      title: "Taliwang Grilled Chicken",
      description:
        "Lombok grilled chicken slathered in fiery red chili paste. Hot, sweet and smoky.",
      ingredients: JSON.stringify([
        "1 young chicken, butterflied",
        "12 red chilies",
        "5 shallots",
        "3 cloves garlic",
        "Salt and palm sugar to taste",
        "Cooking oil as needed",
      ]),
      instructions: JSON.stringify([
        "Grill the chicken halfway and set aside.",
        "Blend chilies, shallots and garlic into a paste.",
        "Saute the paste with oil, salt and sugar.",
        "Coat the chicken with the paste.",
        "Grill again until cooked and caramelized.",
      ]),
      image: "placeholder.png",
      difficulty: "easy",
      time: 67,
      status: "accept",
    },

    {
      slug: "padang-green-chili-chicken",
      title: "Padang Green Chili Chicken",
      description:
        "Fried chicken topped with green chili sambal and anchovies. A fiery Padang favorite.",
      ingredients: JSON.stringify([
        "500 g chicken, cut into pieces",
        "10 green chilies",
        "5 shallots",
        "Anchovies as needed",
        "Salt to taste",
        "Cooking oil as needed",
      ]),
      instructions: JSON.stringify([
        "Fry the chicken until golden and set aside.",
        "Coarsely grind green chilies and shallots.",
        "Fry anchovies until crispy.",
        "Saute the green chili mixture with salt.",
        "Top the chicken with the sambal and anchovies.",
      ]),
      image: "placeholder.png",
      difficulty: "medium",
      time: 74,
      status: "accept",
    },

    {
      slug: "chicken-balado-padang",
      title: "Padang Chicken Balado",
      description:
        "Fried chicken coated in red chili balado with a hint of lime. Classic Padang everyday dish.",
      ingredients: JSON.stringify([
        "500 g chicken, cut into pieces",
        "12 red chilies",
        "6 shallots",
        "1 tomato",
        "Salt and sugar to taste",
        "Cooking oil as needed",
      ]),
      instructions: JSON.stringify([
        "Fry the chicken until cooked and golden.",
        "Blend chilies, shallots and tomato coarsely.",
        "Saute the chili mixture until fragrant.",
        "Season with salt and sugar.",
        "Toss the chicken in the balado and serve.",
      ]),
      image: "placeholder.png",
      difficulty: "hard",
      time: 81,
      status: "accept",
    },

    {
      slug: "shrimp-balado-padang",
      title: "Padang Shrimp Balado",
      description:
        "Shrimp stir-fried with red chili balado and stink beans. Spicy with a distinctive aroma.",
      ingredients: JSON.stringify([
        "400 g shrimp, peeled",
        "10 red chilies",
        "5 shallots",
        "Stink beans as needed",
        "Salt and sugar to taste",
        "Cooking oil as needed",
      ]),
      instructions: JSON.stringify([
        "Fry the shrimp briefly and set aside.",
        "Coarsely grind chilies and shallots.",
        "Saute the chili mixture until cooked.",
        "Add stink beans and seasoning.",
        "Toss in the shrimp and serve.",
      ]),
      image: "placeholder.png",
      difficulty: "easy",
      time: 88,
      status: "accept",
    },

    {
      slug: "squid-ink-stir-fry",
      title: "Squid in Ink Sauce",
      description:
        "Squid cooked in its own black ink with chilies and garlic. Exotic-looking and deeply savory.",
      ingredients: JSON.stringify([
        "500 g squid with ink sacs",
        "6 red chilies, sliced",
        "4 cloves garlic, sliced",
        "3 shallots, sliced",
        "Salt and sugar to taste",
        "Cooking oil as needed",
      ]),
      instructions: JSON.stringify([
        "Clean the squid, keeping the ink sacs.",
        "Saute garlic, shallots and chilies.",
        "Add the squid and ink sacs.",
        "Season with salt and sugar.",
        "Cook briefly until the squid is just done.",
      ]),
      image: "placeholder.png",
      difficulty: "medium",
      time: 95,
      status: "accept",
    },

    {
      slug: "sweet-sour-shrimp",
      title: "Sweet and Sour Shrimp",
      description:
        "Crispy shrimp in a glossy sweet-sour sauce with pineapple and bell peppers. A crowd pleaser.",
      ingredients: JSON.stringify([
        "400 g shrimp, peeled",
        "1/2 pineapple, cubed",
        "1 bell pepper, cubed",
        "3 tablespoons tomato sauce",
        "Salt and sugar to taste",
        "Cornstarch for coating",
      ]),
      instructions: JSON.stringify([
        "Coat shrimp with cornstarch and fry until crispy.",
        "Saute tomato sauce with a little water.",
        "Season sweet and sour.",
        "Add pineapple and bell pepper.",
        "Toss in the shrimp and serve.",
      ]),
      image: "placeholder.png",
      difficulty: "hard",
      time: 102,
      status: "accept",
    },

    {
      slug: "grilled-gourami",
      title: "Grilled Gourami",
      description:
        "Whole gourami marinated in turmeric and grilled until smoky. Best with chili soy sauce.",
      ingredients: JSON.stringify([
        "1 gourami, cleaned and scored",
        "1 teaspoon turmeric powder",
        "3 cloves garlic, crushed",
        "Salt to taste",
        "Lime for serving",
        "Cooking oil for basting",
      ]),
      instructions: JSON.stringify([
        "Marinate the fish with garlic, turmeric and salt.",
        "Rest for 20 minutes.",
        "Grill while basting with oil.",
        "Cook until both sides are charred.",
        "Serve with lime and chili soy sauce.",
      ]),
      image: "placeholder.png",
      difficulty: "easy",
      time: 109,
      status: "accept",
    },

    {
      slug: "sweet-sour-gourami",
      title: "Sweet and Sour Gourami",
      description:
        "Crispy whole gourami topped with sweet-sour vegetable sauce. Festive and delicious.",
      ingredients: JSON.stringify([
        "1 gourami, cleaned",
        "1 carrot, julienned",
        "1/2 pineapple, cubed",
        "3 tablespoons tomato sauce",
        "Salt and sugar to taste",
        "Cornstarch for coating",
      ]),
      instructions: JSON.stringify([
        "Coat the fish with cornstarch and deep fry.",
        "Saute tomato sauce with water.",
        "Season sweet and sour to taste.",
        "Add carrot and pineapple.",
        "Pour the sauce over the fish and serve.",
      ]),
      image: "placeholder.png",
      difficulty: "medium",
      time: 116,
      status: "accept",
    },

    {
      slug: "catfish-penyet-lele",
      title: "Smashed Catfish with Sambal",
      description:
        "Fried catfish smashed over spicy sambal with fresh vegetables. Humble yet addictive.",
      ingredients: JSON.stringify([
        "2 catfish, cleaned",
        "10 bird eye chilies",
        "1 tomato",
        "Fresh vegetables for serving",
        "Salt to taste",
        "Cooking oil as needed",
      ]),
      instructions: JSON.stringify([
        "Marinate the catfish with salt.",
        "Deep fry until crispy.",
        "Grind chilies, tomato and salt into sambal.",
        "Smash the fish lightly over the sambal.",
        "Serve with rice and fresh vegetables.",
      ]),
      image: "placeholder.png",
      difficulty: "hard",
      time: 12,
      status: "accept",
    },

    {
      slug: "grilled-milkfish-bandeng",
      title: "Grilled Milkfish",
      description:
        "Milkfish split open, seasoned simply and grilled over charcoal. Smoky and tender.",
      ingredients: JSON.stringify([
        "1 milkfish, butterflied",
        "3 cloves garlic, crushed",
        "Salt to taste",
        "Pepper to taste",
        "Lime for serving",
        "Cooking oil for basting",
      ]),
      instructions: JSON.stringify([
        "Season the fish with garlic, salt and pepper.",
        "Rest for 15 minutes.",
        "Grill skin-side down first.",
        "Baste with oil and flip once.",
        "Serve with lime and sambal.",
      ]),
      image: "placeholder.png",
      difficulty: "easy",
      time: 19,
      status: "accept",
    },

    {
      slug: "steamed-mackerel-pepes",
      title: "Mackerel Pepes in Banana Leaf",
      description:
        "Mackerel steamed in banana leaves with basil, chilies and turmeric. Fragrant and moist.",
      ingredients: JSON.stringify([
        "2 mackerel, cleaned",
        "Banana leaves for wrapping",
        "1 bunch basil",
        "6 red chilies, sliced",
        "Salt to taste",
        "Shallots, garlic and turmeric blended into paste",
      ]),
      instructions: JSON.stringify([
        "Rub the fish with the spice paste and salt.",
        "Top with basil and chilies.",
        "Wrap tightly in banana leaves.",
        "Steam for 30 minutes.",
        "Grill the packets briefly and serve.",
      ]),
      image: "placeholder.png",
      difficulty: "medium",
      time: 26,
      status: "accept",
    },

    {
      slug: "tofu-mushroom-pepes",
      title: "Tofu Mushroom Pepes",
      description:
        "Mashed tofu with mushrooms steamed in banana leaves. A light vegetarian pepes.",
      ingredients: JSON.stringify([
        "2 blocks tofu, mashed",
        "100 g oyster mushrooms, chopped",
        "Banana leaves for wrapping",
        "Salt to taste",
        "1 bunch basil",
        "Shallots, garlic, chilies and turmeric blended into paste",
      ]),
      instructions: JSON.stringify([
        "Mix tofu, mushrooms, paste and salt.",
        "Add basil leaves.",
        "Wrap portions in banana leaves.",
        "Steam for 25 minutes.",
        "Serve warm with rice.",
      ]),
      image: "placeholder.png",
      difficulty: "hard",
      time: 33,
      status: "accept",
    },

    {
      slug: "chicken-mushroom-pepes",
      title: "Chicken Mushroom Pepes",
      description:
        "Diced chicken with mushrooms steamed in banana leaves with herbs. Juicy and aromatic.",
      ingredients: JSON.stringify([
        "400 g chicken, diced",
        "100 g mushrooms, sliced",
        "Banana leaves for wrapping",
        "Salt to taste",
        "1 stalk lemongrass, sliced",
        "Shallots, garlic, chilies and galangal blended into paste",
      ]),
      instructions: JSON.stringify([
        "Mix chicken, mushrooms, paste and salt.",
        "Divide onto banana leaves.",
        "Wrap tightly and secure.",
        "Steam for 30 minutes.",
        "Grill briefly for aroma and serve.",
      ]),
      image: "placeholder.png",
      difficulty: "easy",
      time: 40,
      status: "accept",
    },

    {
      slug: "garang-asem-chicken-solo",
      title: "Solo Sour-Spicy Chicken",
      description:
        "Chicken cooked in coconut milk with tamarind and blimbing wuluh wrapped in leaves. Fresh and tangy.",
      ingredients: JSON.stringify([
        "500 g chicken, cut into pieces",
        "5 blimbing wuluh, sliced",
        "300 ml coconut milk",
        "Banana leaves for wrapping",
        "Salt to taste",
        "Shallots, garlic and chilies sliced",
      ]),
      instructions: JSON.stringify([
        "Mix chicken with all spices and coconut milk.",
        "Add blimbing wuluh slices.",
        "Wrap portions in banana leaves.",
        "Steam for 40 minutes.",
        "Serve directly in the leaf packets.",
      ]),
      image: "placeholder.png",
      difficulty: "medium",
      time: 47,
      status: "accept",
    },

    {
      slug: "pindang-patins-palembang",
      title: "Palembang Patin Pindang",
      description:
        "Patin fish in a sour-spicy tamarind broth with pineapple. Refreshing South Sumatran classic.",
      ingredients: JSON.stringify([
        "600 g patin fish, cut",
        "1/2 pineapple, cubed",
        "2 tablespoons tamarind water",
        "10 bird eye chilies",
        "Salt and sugar to taste",
        "Shallots, garlic and turmeric blended into paste",
      ]),
      instructions: JSON.stringify([
        "Bring water to a boil with the spice paste.",
        "Add tamarind water and chilies.",
        "Add the patin pieces.",
        "Add pineapple and seasoning.",
        "Cook until the fish is done and serve.",
      ]),
      image: "placeholder.png",
      difficulty: "hard",
      time: 54,
      status: "accept",
    },

    {
      slug: "pempek-palembang-platter",
      title: "Palembang Pempek Platter",
      description:
        "Chewy fish cakes served with dark sweet-sour cuko sauce. South Sumatra pride.",
      ingredients: JSON.stringify([
        "300 g mackerel flesh, ground",
        "200 g sago flour",
        "1 egg",
        "Salt to taste",
        "Water for boiling",
        "Cuko sauce made from palm sugar, tamarind and chilies",
      ]),
      instructions: JSON.stringify([
        "Mix fish, egg, salt and sago into a dough.",
        "Shape into lenjer and round forms.",
        "Boil until the pempek floats.",
        "Drain and optionally fry.",
        "Serve with warm cuko sauce and cucumber.",
      ]),
      image: "placeholder.png",
      difficulty: "easy",
      time: 61,
      status: "accept",
    },

    {
      slug: "tekwan-palembang-soup",
      title: "Palembang Tekwan Soup",
      description:
        "Small fish balls in a clear shrimp broth with mushrooms and jicama. Light and comforting.",
      ingredients: JSON.stringify([
        "200 g fish paste formed into small balls",
        "1 liter shrimp broth",
        "50 g wood ear mushrooms",
        "1 jicama, julienned",
        "Salt and pepper to taste",
        "Fried shallots for garnish",
      ]),
      instructions: JSON.stringify([
        "Boil the fish balls until they float.",
        "Bring the shrimp broth to a boil.",
        "Add mushrooms and jicama.",
        "Season with salt and pepper.",
        "Serve with fish balls and fried shallots.",
      ]),
      image: "placeholder.png",
      difficulty: "medium",
      time: 68,
      status: "accept",
    },

    {
      slug: "oxtail-soup-buntut",
      title: "Oxtail Soup",
      description:
        "Slow-simmered oxtail in a clear aromatic broth with carrots and potatoes. Hearty and nourishing.",
      ingredients: JSON.stringify([
        "750 g oxtail, cut",
        "1.5 liters water",
        "2 carrots, chunked",
        "2 potatoes, chunked",
        "Salt and pepper to taste",
        "Garlic, nutmeg and cloves for aroma",
      ]),
      instructions: JSON.stringify([
        "Boil oxtail, discard first water and rinse.",
        "Simmer in fresh water until tender.",
        "Add garlic, nutmeg and cloves.",
        "Add carrots and potatoes.",
        "Season and serve with rice and sambal.",
      ]),
      image: "placeholder.png",
      difficulty: "hard",
      time: 75,
      status: "accept",
    },

    {
      slug: "beef-rib-soup-iga",
      title: "Beef Rib Soup",
      description:
        "Tender beef ribs in a clear peppery broth with carrots. Simple, warm and satisfying.",
      ingredients: JSON.stringify([
        "750 g beef ribs",
        "1.5 liters water",
        "2 carrots, sliced",
        "1 teaspoon peppercorns, crushed",
        "Salt to taste",
        "Garlic and nutmeg for aroma",
      ]),
      instructions: JSON.stringify([
        "Boil ribs briefly, discard water and rinse.",
        "Simmer ribs in fresh water.",
        "Add garlic, pepper and nutmeg.",
        "Add carrots and cook until tender.",
        "Season and serve hot.",
      ]),
      image: "placeholder.png",
      difficulty: "easy",
      time: 82,
      status: "accept",
    },

    {
      slug: "mutton-soup-kambing",
      title: "Mutton Soup",
      description:
        "Mutton simmered with cardamom and cloves into a warming clear soup. Perfect for rainy days.",
      ingredients: JSON.stringify([
        "600 g mutton, cubed",
        "1.5 liters water",
        "3 cardamom pods",
        "4 cloves",
        "Salt and pepper to taste",
        "Shallots and garlic sliced and fried",
      ]),
      instructions: JSON.stringify([
        "Boil mutton briefly, discard water and rinse.",
        "Simmer in fresh water with spices.",
        "Cook until the mutton is tender.",
        "Add fried shallots and garlic.",
        "Season and serve with lime.",
      ]),
      image: "placeholder.png",
      difficulty: "medium",
      time: 89,
      status: "accept",
    },

    {
      slug: "beef-meatball-soup-bakso",
      title: "Beef Meatball Bakso",
      description:
        "Springy beef meatballs in a clear garlic broth with noodles. Indonesia most loved street soup.",
      ingredients: JSON.stringify([
        "300 g ground beef",
        "50 g tapioca flour",
        "1.5 liters beef broth",
        "Noodles and bean sprouts",
        "Salt and pepper to taste",
        "Fried shallots and celery for garnish",
      ]),
      instructions: JSON.stringify([
        "Mix beef, tapioca, salt and pepper.",
        "Form into balls.",
        "Boil until the balls float.",
        "Bring the broth to a boil.",
        "Serve balls with noodles, sprouts and garnish.",
      ]),
      image: "placeholder.png",
      difficulty: "hard",
      time: 96,
      status: "accept",
    },

    {
      slug: "chicken-meatball-noodle-soup",
      title: "Chicken Meatball Noodle Soup",
      description:
        "Chicken meatballs with yellow noodles in a light savory broth. A lighter take on bakso.",
      ingredients: JSON.stringify([
        "300 g ground chicken",
        "40 g tapioca flour",
        "Yellow noodles, blanched",
        "1.2 liters chicken broth",
        "Salt and pepper to taste",
        "Bok choy and fried shallots",
      ]),
      instructions: JSON.stringify([
        "Mix chicken, tapioca and seasoning.",
        "Form into small balls.",
        "Boil until they float.",
        "Heat the chicken broth.",
        "Serve balls with noodles, bok choy and shallots.",
      ]),
      image: "placeholder.png",
      difficulty: "easy",
      time: 103,
      status: "accept",
    },

    {
      slug: "solo-chicken-noodles",
      title: "Solo Chicken Noodles",
      description:
        "Yellow noodles topped with sweet seasoned chicken and mustard greens. Simple Solo-style comfort.",
      ingredients: JSON.stringify([
        "2 portions yellow noodles",
        "300 g chicken, diced",
        "3 tablespoons sweet soy sauce",
        "Mustard greens, blanched",
        "Salt to taste",
        "Garlic and shallots blended into paste",
      ]),
      instructions: JSON.stringify([
        "Saute the paste and cook the chicken.",
        "Add sweet soy sauce and simmer.",
        "Blanch noodles and greens.",
        "Arrange noodles in bowls.",
        "Top with chicken and broth on the side.",
      ]),
      image: "placeholder.png",
      difficulty: "medium",
      time: 110,
      status: "accept",
    },

    {
      slug: "yamin-chicken-noodles",
      title: "Yamin Chicken Noodles",
      description:
        "Sweet-savory dry noodles with chicken and dumplings. A Bandung favorite.",
      ingredients: JSON.stringify([
        "2 portions wheat noodles",
        "300 g chicken, diced",
        "2 tablespoons sweet soy sauce",
        "Dumplings as topping",
        "Salt and pepper to taste",
        "Garlic oil for tossing",
      ]),
      instructions: JSON.stringify([
        "Cook the chicken with soy sauce.",
        "Boil noodles until springy.",
        "Toss noodles with garlic oil and soy.",
        "Top with chicken.",
        "Serve with dumplings and broth.",
      ]),
      image: "placeholder.png",
      difficulty: "hard",
      time: 117,
      status: "accept",
    },

    {
      slug: "javanese-boiled-noodles",
      title: "Javanese Boiled Noodles",
      description:
        "Noodles boiled in a rich spiced broth with egg and chicken. Warming Yogyakarta classic.",
      ingredients: JSON.stringify([
        "1 portion yellow noodles",
        "1 egg",
        "Shredded chicken as topping",
        "Cabbage and tomato slices",
        "Salt to taste",
        "Shallots, garlic and candlenuts blended into paste",
      ]),
      instructions: JSON.stringify([
        "Saute the paste until fragrant.",
        "Add water and bring to a boil.",
        "Add noodles and cabbage.",
        "Crack in the egg and add tomato.",
        "Serve with shredded chicken.",
      ]),
      image: "placeholder.png",
      difficulty: "easy",
      time: 13,
      status: "accept",
    },

    {
      slug: "tek-tek-fried-noodles",
      title: "Tek-Tek Fried Noodles",
      description:
        "Street-cart fried noodles with egg, vegetables and generous sweet soy. Smoky wok flavor.",
      ingredients: JSON.stringify([
        "1 portion egg noodles",
        "1 egg",
        "Cabbage and bean sprouts",
        "2 tablespoons sweet soy sauce",
        "Salt and pepper to taste",
        "Shallots and garlic blended into paste",
      ]),
      instructions: JSON.stringify([
        "Saute the paste until fragrant.",
        "Scramble in the egg.",
        "Add noodles and vegetables.",
        "Add soy sauce and seasoning.",
        "Stir-fry until smoky and serve.",
      ]),
      image: "placeholder.png",
      difficulty: "medium",
      time: 20,
      status: "accept",
    },

    {
      slug: "aceh-fried-noodles",
      title: "Aceh Fried Noodles",
      description:
        "Thick Aceh noodles with curry-like spices, shrimp and crab. Bold and intensely spiced.",
      ingredients: JSON.stringify([
        "1 portion thick yellow noodles",
        "100 g shrimp",
        "Crab meat as needed",
        "Bean sprouts",
        "Salt to taste",
        "Shallots, garlic, chilies, turmeric and curry powder blended into paste",
      ]),
      instructions: JSON.stringify([
        "Saute the heavy spice paste until cooked.",
        "Add shrimp and crab.",
        "Add noodles and a little water.",
        "Add bean sprouts and seasoning.",
        "Stir-fry until absorbed and serve.",
      ]),
      image: "placeholder.png",
      difficulty: "hard",
      time: 27,
      status: "accept",
    },

    {
      slug: "kwetiau-fried-seafood",
      title: "Fried Flat Noodles with Seafood",
      description:
        "Chewy flat rice noodles wok-tossed with shrimp, squid and greens. Smoky and savory.",
      ingredients: JSON.stringify([
        "200 g flat rice noodles",
        "100 g shrimp",
        "100 g squid rings",
        "Mustard greens",
        "Salt and pepper to taste",
        "Garlic and oyster sauce for seasoning",
      ]),
      instructions: JSON.stringify([
        "Soak noodles until pliable.",
        "Sear shrimp and squid quickly.",
        "Add garlic and noodles.",
        "Add greens and oyster sauce.",
        "Toss until smoky and serve.",
      ]),
      image: "placeholder.png",
      difficulty: "easy",
      time: 34,
      status: "accept",
    },

    {
      slug: "bihun-fried-vegetable",
      title: "Fried Rice Vermicelli",
      description:
        "Thin rice vermicelli stir-fried with carrots, cabbage and egg. Light and simple.",
      ingredients: JSON.stringify([
        "150 g rice vermicelli, soaked",
        "1 carrot, julienned",
        "Cabbage, shredded",
        "1 egg",
        "Salt and pepper to taste",
        "Garlic, shallots and sweet soy for seasoning",
      ]),
      instructions: JSON.stringify([
        "Scramble the egg and set aside.",
        "Saute garlic and shallots.",
        "Add carrot and cabbage.",
        "Add vermicelli and soy sauce.",
        "Toss with egg and serve.",
      ]),
      image: "placeholder.png",
      difficulty: "medium",
      time: 41,
      status: "accept",
    },

    {
      slug: "salted-fish-fried-rice",
      title: "Salted Fish Fried Rice",
      description:
        "Fried rice with crispy salted fish bits and green chilies. Salty, savory and fragrant.",
      ingredients: JSON.stringify([
        "2 plates cold rice",
        "50 g salted fish, diced and fried",
        "5 green chilies, sliced",
        "2 cloves garlic",
        "Salt to taste",
        "Cooking oil as needed",
      ]),
      instructions: JSON.stringify([
        "Fry the salted fish until crispy.",
        "Saute garlic and chilies.",
        "Add the rice and toss.",
        "Add the salted fish.",
        "Season lightly and serve.",
      ]),
      image: "placeholder.png",
      difficulty: "hard",
      time: 48,
      status: "accept",
    },

    {
      slug: "stink-bean-fried-rice",
      title: "Stink Bean Fried Rice",
      description:
        "Fried rice tossed with pungent stink beans and spicy sambal. A bold flavor adventure.",
      ingredients: JSON.stringify([
        "2 plates cold rice",
        "1 board stink beans, halved",
        "2 tablespoons sambal",
        "1 egg",
        "Salt to taste",
        "Shallots and garlic blended into paste",
      ]),
      instructions: JSON.stringify([
        "Saute the paste and sambal.",
        "Scramble in the egg.",
        "Add stink beans briefly.",
        "Add the rice and toss.",
        "Season and serve hot.",
      ]),
      image: "placeholder.png",
      difficulty: "easy",
      time: 55,
      status: "accept",
    },

    {
      slug: "anchovy-fried-rice",
      title: "Anchovy Fried Rice",
      description:
        "Fried rice with crispy fried anchovies and sliced chilies. Crunchy and savory.",
      ingredients: JSON.stringify([
        "2 plates cold rice",
        "50 g anchovies, fried crispy",
        "4 red chilies, sliced",
        "2 cloves garlic",
        "Salt to taste",
        "Sweet soy sauce to taste",
      ]),
      instructions: JSON.stringify([
        "Fry anchovies until crispy and set aside.",
        "Saute garlic and chilies.",
        "Add rice and soy sauce.",
        "Toss until evenly heated.",
        "Top with anchovies and serve.",
      ]),
      image: "placeholder.png",
      difficulty: "medium",
      time: 62,
      status: "accept",
    },

    {
      slug: "javanese-special-fried-rice",
      title: "Javanese Special Fried Rice",
      description:
        "Reddish Javanese fried rice with ground spices and shredded chicken. Sweet-spicy and aromatic.",
      ingredients: JSON.stringify([
        "2 plates cold rice",
        "Shredded chicken as topping",
        "2 tablespoons sweet soy sauce",
        "Crackers for serving",
        "Salt to taste",
        "Shallots, garlic, chilies and shrimp paste blended into paste",
      ]),
      instructions: JSON.stringify([
        "Saute the spice paste until fragrant.",
        "Add rice and soy sauce.",
        "Toss until reddish and dry.",
        "Season to taste.",
        "Serve with chicken and crackers.",
      ]),
      image: "placeholder.png",
      difficulty: "hard",
      time: 69,
      status: "accept",
    },

    {
      slug: "liwet-solo-rice",
      title: "Solo Liwet Rice",
      description:
        "Coconut rice cooked with bay leaves and lemongrass, served with chicken and chayote. Solo heritage dish.",
      ingredients: JSON.stringify([
        "500 g rice",
        "400 ml coconut milk",
        "2 bay leaves",
        "1 stalk lemongrass",
        "Salt to taste",
        "Shredded chicken and chayote curry for serving",
      ]),
      instructions: JSON.stringify([
        "Cook rice with coconut milk and herbs.",
        "Steam until fluffy.",
        "Prepare the chayote curry.",
        "Shred the chicken.",
        "Serve rice with toppings.",
      ]),
      image: "placeholder.png",
      difficulty: "easy",
      time: 76,
      status: "accept",
    },

    {
      slug: "uduk-betawi-rice",
      title: "Betawi Uduk Rice",
      description:
        "Fragrant coconut rice with fried shallots, served with omelet and sambal. Jakarta breakfast icon.",
      ingredients: JSON.stringify([
        "500 g rice",
        "400 ml coconut milk",
        "2 bay leaves",
        "Fried shallots",
        "Salt to taste",
        "Omelet strips and cucumber for serving",
      ]),
      instructions: JSON.stringify([
        "Simmer rice with coconut milk and bay.",
        "Steam until cooked.",
        "Slice the omelet thinly.",
        "Fluff the rice.",
        "Serve with toppings and sambal.",
      ]),
      image: "placeholder.png",
      difficulty: "medium",
      time: 83,
      status: "accept",
    },

    {
      slug: "yellow-rice-tumpeng",
      title: "Yellow Cone Rice",
      description:
        "Turmeric coconut rice molded into a cone for celebrations. Festive and beautiful.",
      ingredients: JSON.stringify([
        "500 g rice",
        "400 ml coconut milk",
        "1 teaspoon turmeric powder",
        "2 bay leaves",
        "Salt to taste",
        "Fried chicken, eggs and vegetables for serving",
      ]),
      instructions: JSON.stringify([
        "Cook rice with coconut milk and turmeric.",
        "Steam until fluffy.",
        "Mold into a cone shape.",
        "Arrange side dishes around it.",
        "Serve at celebrations.",
      ]),
      image: "placeholder.png",
      difficulty: "hard",
      time: 90,
      status: "accept",
    },

    {
      slug: "pecel-madiun-rice",
      title: "Madiun Pecel Rice",
      description:
        "Steamed rice with boiled vegetables and spicy peanut sauce. Healthy East Javanese classic.",
      ingredients: JSON.stringify([
        "2 plates steamed rice",
        "Bean sprouts, spinach and long beans",
        "100 g peanuts, ground",
        "Red chilies for the sauce",
        "Salt and palm sugar to taste",
        "Kaffir lime leaves for aroma",
      ]),
      instructions: JSON.stringify([
        "Blanch all vegetables.",
        "Grind peanuts with chilies and sugar.",
        "Thin the sauce with warm water.",
        "Arrange rice and vegetables.",
        "Pour peanut sauce on top.",
      ]),
      image: "placeholder.png",
      difficulty: "easy",
      time: 97,
      status: "accept",
    },

    {
      slug: "grilled-chicken-nasi-bakar",
      title: "Grilled Banana-Leaf Rice",
      description:
        "Seasoned rice with chicken wrapped in banana leaves and grilled. Smoky and fragrant.",
      ingredients: JSON.stringify([
        "2 portions cooked rice",
        "200 g seasoned chicken, shredded",
        "Banana leaves for wrapping",
        "Basil leaves",
        "Salt to taste",
        "Shallots, garlic and chilies blended into paste",
      ]),
      instructions: JSON.stringify([
        "Stir rice with the sauteed paste.",
        "Add shredded chicken and basil.",
        "Wrap portions in banana leaves.",
        "Grill until the leaves char.",
        "Serve in the leaf packets.",
      ]),
      image: "placeholder.png",
      difficulty: "medium",
      time: 104,
      status: "accept",
    },

    {
      slug: "chicken-porridge-bandung",
      title: "Bandung Chicken Porridge",
      description:
        "Silky rice porridge with shredded chicken, cakwe and soy sauce. Ultimate comfort breakfast.",
      ingredients: JSON.stringify([
        "200 g rice",
        "1 liter chicken broth",
        "Shredded chicken",
        "Cakwe, sliced",
        "Salt to taste",
        "Fried shallots, celery and soy sauce for topping",
      ]),
      instructions: JSON.stringify([
        "Simmer rice in broth until thick.",
        "Stir often until silky.",
        "Season with salt.",
        "Prepare the toppings.",
        "Serve porridge with toppings.",
      ]),
      image: "placeholder.png",
      difficulty: "hard",
      time: 111,
      status: "accept",
    },

    {
      slug: "green-bean-porridge",
      title: "Mung Bean Porridge",
      description:
        "Sweet mung bean porridge with coconut milk and palm sugar. Warming traditional dessert.",
      ingredients: JSON.stringify([
        "250 g mung beans",
        "1 liter water",
        "150 g palm sugar",
        "200 ml coconut milk",
        "A pinch of salt",
        "1 pandan leaf",
      ]),
      instructions: JSON.stringify([
        "Boil mung beans until soft.",
        "Add palm sugar and pandan.",
        "Simmer until sweetened.",
        "Pour in coconut milk.",
        "Serve warm or cold.",
      ]),
      image: "placeholder.png",
      difficulty: "easy",
      time: 118,
      status: "accept",
    },

    {
      slug: "black-sticky-rice-porridge",
      title: "Black Sticky Rice Porridge",
      description:
        "Sweet black glutinous rice porridge with coconut milk. Rich and gently chewy.",
      ingredients: JSON.stringify([
        "250 g black glutinous rice, soaked",
        "1 liter water",
        "150 g palm sugar",
        "200 ml coconut milk",
        "A pinch of salt",
        "1 pandan leaf",
      ]),
      instructions: JSON.stringify([
        "Boil the soaked rice until soft.",
        "Add palm sugar and pandan.",
        "Simmer until thick.",
        "Stir in half the coconut milk.",
        "Serve with extra coconut milk.",
      ]),
      image: "placeholder.png",
      difficulty: "medium",
      time: 14,
      status: "accept",
    },

    {
      slug: "corn-fritters-jagung",
      title: "Corn Fritters",
      description:
        "Crispy corn fritters with celery and ground spices. Sweet, crunchy and addictive.",
      ingredients: JSON.stringify([
        "2 sweet corn, kernels removed",
        "3 tablespoons flour",
        "1 egg",
        "Celery, sliced",
        "Salt and pepper to taste",
        "Garlic and coriander blended into paste",
      ]),
      instructions: JSON.stringify([
        "Mix corn, flour, egg and paste.",
        "Season with salt and pepper.",
        "Heat plenty of oil.",
        "Spoon batter into hot oil.",
        "Fry until golden and serve.",
      ]),
      image: "placeholder.png",
      difficulty: "hard",
      time: 21,
      status: "pending",
    },

    {
      slug: "stuffed-fried-tofu",
      title: "Stuffed Fried Tofu",
      description:
        "Fried tofu stuffed with seasoned vegetables and bean sprouts. Crispy outside, fresh inside.",
      ingredients: JSON.stringify([
        "6 fried tofu puffs, halved",
        "Bean sprouts and cabbage",
        "1 carrot, grated",
        "Salt and pepper to taste",
        "Batter flour for coating",
        "Garlic for seasoning",
      ]),
      instructions: JSON.stringify([
        "Stir-fry the vegetable filling.",
        "Stuff into tofu puffs.",
        "Dip in thin batter.",
        "Fry until crispy.",
        "Serve with chili sauce.",
      ]),
      image: "placeholder.png",
      difficulty: "easy",
      time: 28,
      status: "pending",
    },

    {
      slug: "tahu-gejrot-cirebon",
      title: "Cirebon Tahu Gejrot",
      description:
        "Fried tofu cubes doused in sweet-spicy soy-tamarind sauce with shallots. Fresh Cirebon street snack.",
      ingredients: JSON.stringify([
        "10 small fried tofu",
        "5 shallots, sliced",
        "Green chilies, sliced",
        "Sweet soy sauce",
        "Tamarind water",
        "Palm sugar to taste",
      ]),
      instructions: JSON.stringify([
        "Cut the tofu into pieces.",
        "Mix soy sauce, tamarind and sugar.",
        "Add shallots and chilies.",
        "Pour sauce over the tofu.",
        "Serve immediately.",
      ]),
      image: "placeholder.png",
      difficulty: "medium",
      time: 35,
      status: "pending",
    },

    {
      slug: "combro-oncom-snack",
      title: "Combro Cassava Snack",
      description:
        "Grated cassava balls filled with spicy oncom, deep fried. Crispy and savory Sundanese snack.",
      ingredients: JSON.stringify([
        "500 g grated cassava, drained",
        "200 g oncom, mashed",
        "Red chilies for the filling",
        "Salt to taste",
        "Grated coconut optional",
        "Cooking oil for frying",
      ]),
      instructions: JSON.stringify([
        "Season the cassava dough.",
        "Spice the oncom filling.",
        "Fill dough with oncom.",
        "Shape into ovals.",
        "Deep fry until golden.",
      ]),
      image: "placeholder.png",
      difficulty: "hard",
      time: 42,
      status: "pending",
    },

    {
      slug: "misro-sweet-snack",
      title: "Misro Sweet Snack",
      description:
        "Grated cassava balls with a palm sugar filling, fried until crisp. Sweet Sundanese treat.",
      ingredients: JSON.stringify([
        "500 g grated cassava, drained",
        "100 g palm sugar, chopped",
        "A pinch of salt",
        "Grated coconut optional",
        "Cooking oil for frying",
        "Water as needed",
      ]),
      instructions: JSON.stringify([
        "Season the cassava dough.",
        "Fill portions with palm sugar.",
        "Seal and shape into ovals.",
        "Fry until golden brown.",
        "Drain and serve.",
      ]),
      image: "placeholder.png",
      difficulty: "easy",
      time: 49,
      status: "pending",
    },

    {
      slug: "vegetable-pastel-pastry",
      title: "Vegetable Pastel",
      description:
        "Golden pastry pockets filled with carrots, potatoes and glass noodles. Perfect afternoon snack.",
      ingredients: JSON.stringify([
        "Pastry skins or dough",
        "2 carrots, diced",
        "2 potatoes, diced",
        "Glass noodles, soaked",
        "Salt and pepper to taste",
        "Garlic for seasoning",
      ]),
      instructions: JSON.stringify([
        "Cook the vegetable filling.",
        "Season and cool it.",
        "Fill the pastry skins.",
        "Seal the edges.",
        "Fry until golden brown.",
      ]),
      image: "placeholder.png",
      difficulty: "medium",
      time: 56,
      status: "pending",
    },

    {
      slug: "fried-banana-cheese",
      title: "Fried Banana with Cheese",
      description:
        "Crispy fried bananas topped with cheese and chocolate sprinkles. Modern street-food favorite.",
      ingredients: JSON.stringify([
        "4 ripe bananas",
        "Batter flour",
        "Grated cheese",
        "Chocolate sprinkles",
        "Sweetened condensed milk",
        "Cooking oil for frying",
      ]),
      instructions: JSON.stringify([
        "Coat bananas in batter.",
        "Fry until golden and crispy.",
        "Drain excess oil.",
        "Top with milk, cheese and sprinkles.",
        "Serve warm.",
      ]),
      image: "placeholder.png",
      difficulty: "hard",
      time: 63,
      status: "pending",
    },

    {
      slug: "sweet-martabak-chocolate",
      title: "Sweet Martabak Chocolate",
      description:
        "Thick fluffy pancake with chocolate, cheese and condensed milk. Beloved night snack.",
      ingredients: JSON.stringify([
        "250 g flour",
        "1 egg",
        "200 ml milk",
        "Chocolate spread",
        "Grated cheese",
        "Sugar and condensed milk to taste",
      ]),
      instructions: JSON.stringify([
        "Mix a smooth batter and rest it.",
        "Cook thick pancakes in a pan.",
        "Spread with butter.",
        "Add chocolate, cheese and milk.",
        "Fold, slice and serve.",
      ]),
      image: "placeholder.png",
      difficulty: "easy",
      time: 70,
      status: "pending",
    },

    {
      slug: "savory-martabak-egg",
      title: "Savory Egg Martabak",
      description:
        "Crispy stuffed flatbread with minced meat, eggs and spring onions. Served with pickles.",
      ingredients: JSON.stringify([
        "Martabak skins",
        "200 g minced beef",
        "3 eggs",
        "Spring onions, sliced",
        "Salt and pepper to taste",
        "Pickles for serving",
      ]),
      instructions: JSON.stringify([
        "Cook the meat with seasoning.",
        "Mix with eggs and onions.",
        "Fill the skins and fold.",
        "Pan-fry until crispy.",
        "Serve with pickles.",
      ]),
      image: "placeholder.png",
      difficulty: "medium",
      time: 77,
      status: "pending",
    },

    {
      slug: "gado-gado-jakarta",
      title: "Jakarta Gado-Gado",
      description:
        "Blanched vegetables with tofu and egg under thick peanut sauce. Jakarta most famous salad.",
      ingredients: JSON.stringify([
        "Bean sprouts, spinach and cabbage",
        "Fried tofu and boiled eggs",
        "100 g peanuts, ground",
        "Red chilies",
        "Salt and palm sugar to taste",
        "Crackers for serving",
      ]),
      instructions: JSON.stringify([
        "Blanch the vegetables.",
        "Fry the tofu.",
        "Grind peanut sauce ingredients.",
        "Arrange vegetables, tofu and egg.",
        "Pour sauce and add crackers.",
      ]),
      image: "placeholder.png",
      difficulty: "hard",
      time: 84,
      status: "pending",
    },

    {
      slug: "karedok-sundanese",
      title: "Sundanese Karedok",
      description:
        "Fresh raw vegetables pounded lightly with peanut sauce. Crisp Sundanese salad.",
      ingredients: JSON.stringify([
        "Cucumber, bean sprouts and cabbage",
        "Long beans, chopped",
        "100 g peanuts, ground",
        "Bird eye chilies",
        "Salt and palm sugar to taste",
        "Tamarind water",
      ]),
      instructions: JSON.stringify([
        "Grind peanuts with chilies and sugar.",
        "Add tamarind water.",
        "Toss in raw vegetables.",
        "Pound lightly to coat.",
        "Serve with crackers.",
      ]),
      image: "placeholder.png",
      difficulty: "easy",
      time: 91,
      status: "draft",
    },

    {
      slug: "lotek-bandung",
      title: "Bandung Lotek",
      description:
        "Boiled vegetables with peanut sauce and fried shallots, Bandung style. Similar to gado-gado with kencur aroma.",
      ingredients: JSON.stringify([
        "Spinach, bean sprouts and cabbage",
        "Fried tofu",
        "100 g peanuts, ground",
        "Kencur for aroma",
        "Salt and palm sugar to taste",
        "Red chilies",
      ]),
      instructions: JSON.stringify([
        "Blanch the vegetables.",
        "Grind peanut sauce with kencur.",
        "Thin with warm water.",
        "Arrange vegetables and tofu.",
        "Pour sauce and garnish.",
      ]),
      image: "placeholder.png",
      difficulty: "medium",
      time: 98,
      status: "draft",
    },

    {
      slug: "fruit-rujak-salad",
      title: "Fruit Rujak Salad",
      description:
        "Sliced tropical fruits with a sweet-spicy palm sugar sauce. Refreshing and bold.",
      ingredients: JSON.stringify([
        "Pineapple, mango and cucumber",
        "Jicama and kedondong",
        "100 g palm sugar",
        "Red chilies",
        "Tamarind water",
        "Salt to taste",
      ]),
      instructions: JSON.stringify([
        "Slice all fruits.",
        "Grind sugar with chilies and salt.",
        "Add tamarind water.",
        "Toss fruits with the sauce.",
        "Serve immediately.",
      ]),
      image: "placeholder.png",
      difficulty: "hard",
      time: 105,
      status: "draft",
    },

    {
      slug: "ginger-chicken-soup-wedang",
      title: "Ginger Chicken Soup",
      description:
        "Clear chicken soup warmed with ginger and lemongrass. Comforting when the weather is cold.",
      ingredients: JSON.stringify([
        "400 g chicken",
        "1 piece ginger, bruised",
        "1 stalk lemongrass, bruised",
        "1.2 liters water",
        "Salt and pepper to taste",
        "Spring onions for garnish",
      ]),
      instructions: JSON.stringify([
        "Boil the chicken until tender.",
        "Add ginger and lemongrass.",
        "Simmer until fragrant.",
        "Season with salt and pepper.",
        "Serve with spring onions.",
      ]),
      image: "placeholder.png",
      difficulty: "easy",
      time: 112,
      status: "draft",
    },

    {
      slug: "lemongrass-ginger-drink",
      title: "Lemongrass Ginger Drink",
      description:
        "Warm wedang drink with ginger, lemongrass and palm sugar. Soothing traditional beverage.",
      ingredients: JSON.stringify([
        "2 pieces ginger, bruised",
        "2 stalks lemongrass, bruised",
        "100 g palm sugar",
        "800 ml water",
        "A pinch of salt",
        "Pandan leaf for aroma",
      ]),
      instructions: JSON.stringify([
        "Boil water with ginger and lemongrass.",
        "Add palm sugar and pandan.",
        "Simmer until fragrant.",
        "Strain into cups.",
        "Serve warm.",
      ]),
      image: "placeholder.png",
      difficulty: "medium",
      time: 119,
      status: "draft",
    },
  ];

  const recipes = base.map((r, i) => ({
    ...r,
    userId: chief.id,
    categoryId: categories[i % categories.length].id,
    author: chief.username,
  }));

  await knex("recipes").insert(recipes);
};
