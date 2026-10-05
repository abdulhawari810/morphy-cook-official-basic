import { db } from "./db";
import { ROLES, USER_STATUS, TWO_FACTOR_STATUS } from "@/config/constants";

const now = new Date().toISOString();

const demoUsers = [
  {
    username: "admin",
    email: "admin@gmail.com",
    password: "admin123",
    role: ROLES.ADMIN,
    profile: "default.png",
    is_active: USER_STATUS.ACTIVE,
    is_verified: "in_verified",
    two_factor_enabled: TWO_FACTOR_STATUS.INACTIVE,
    two_factor_secret: null,
    two_factor_temp_secret: null,
    two_factor_updateAt: null,
    createdAt: now,
    updatedAt: now,
  },
  {
    username: "chef",
    email: "chef@gmail.com",
    password: "chef123",
    role: ROLES.CHIEF,
    profile: "default.png",
    is_active: USER_STATUS.ACTIVE,
    is_verified: "in_verified",
    two_factor_enabled: TWO_FACTOR_STATUS.INACTIVE,
    two_factor_secret: null,
    two_factor_temp_secret: null,
    two_factor_updateAt: null,
    createdAt: now,
    updatedAt: now,
  },
  {
    username: "users",
    email: "users@gmail.com",
    password: "users123",
    role: ROLES.USER,
    profile: "default.png",
    is_active: USER_STATUS.ACTIVE,
    is_verified: "in_verified",
    two_factor_enabled: TWO_FACTOR_STATUS.INACTIVE,
    two_factor_secret: null,
    two_factor_temp_secret: null,
    two_factor_updateAt: null,
    createdAt: now,
    updatedAt: now,
  },
];

const demoCategory = [
  {
    slug: "breakfast",
    name: "Breakfast",
    desc: "Quick and tasty recipes for breakfast.",
  },
  {
    slug: "lunch",
    name: "Lunch",
    desc: "Filling recipes perfect for lunch.",
  },
  {
    slug: "dinner",
    name: "Dinner",
    desc: "Hearty recipes for dinner time.",
  },
  {
    slug: "dessert",
    name: "Dessert",
    desc: "Sweet dishes and desserts.",
  },
  {
    slug: "indonesian",
    name: "Indonesian",
    desc: "Authentic archipelago dishes.",
  },
  {
    slug: "asian",
    name: "Asian",
    desc: "Popular dishes from across Asia.",
  },
  {
    slug: "western",
    name: "Western",
    desc: "Classic western-style dishes.",
  },
  {
    slug: "seafood",
    name: "Seafood",
    desc: "Fish, shrimp, squid and shellfish dishes.",
  },
  {
    slug: "chicken",
    name: "Chicken",
    desc: "Chicken-based favorite recipes.",
  },
  {
    slug: "beef",
    name: "Beef",
    desc: "Beef-based hearty recipes.",
  },
  {
    slug: "vegetarian",
    name: "Vegetarian",
    desc: "Meat-free vegetable recipes.",
  },
  {
    slug: "vegan",
    name: "Vegan",
    desc: "Plant-based vegan recipes.",
  },
  {
    slug: "soup",
    name: "Soup",
    desc: "Warm and comforting soups.",
  },
  {
    slug: "noodles",
    name: "Noodles",
    desc: "Noodle dishes, fried or soupy.",
  },
  {
    slug: "rice",
    name: "Rice",
    desc: "Rice-based main dishes.",
  },
  {
    slug: "fried",
    name: "Fried",
    desc: "Crispy fried favorites.",
  },
  {
    slug: "grilled",
    name: "Grilled",
    desc: "Grilled and barbecued dishes.",
  },
  {
    slug: "steamed",
    name: "Steamed",
    desc: "Healthy steamed dishes.",
  },
  {
    slug: "snack",
    name: "Snack",
    desc: "Light bites and snacks.",
  },
  {
    slug: "beverage",
    name: "Beverage",
    desc: "Drinks, hot and cold.",
  },
];

const recipes = [
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

    thumbnail: "placeholder.png",
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

    thumbnail: "placeholder.png",
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

    thumbnail: "placeholder.png",
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

    thumbnail: "placeholder.png",
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

    thumbnail: "placeholder.png",
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

    thumbnail: "placeholder.png",
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

    thumbnail: "placeholder.png",
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

    thumbnail: "placeholder.png",
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

    thumbnail: "placeholder.png",
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

    thumbnail: "placeholder.png",
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

    thumbnail: "placeholder.png",
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

    thumbnail: "placeholder.png",
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

    thumbnail: "placeholder.png",
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

    thumbnail: "placeholder.png",
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

    thumbnail: "placeholder.png",
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

    thumbnail: "placeholder.png",
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

    thumbnail: "placeholder.png",
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

    thumbnail: "placeholder.png",
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

    thumbnail: "placeholder.png",
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

    thumbnail: "placeholder.png",
    difficulty: "easy",
    time: 15,
    status: "accept",
  },


  {
    slug: "ayam-goreng-kalasan",
    title: "Ayam Goreng Kalasan",
    description:
      "Resep Ayam Goreng Kalasan khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Ayam Goreng Kalasan secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Ayam Goreng Kalasan, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Ayam Goreng Kalasan selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "easy",
    time: 10,
    status: "accept",
  },

  {
    slug: "ayam-bakar-taliwang",
    title: "Ayam Bakar Taliwang",
    description:
      "Resep Ayam Bakar Taliwang khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Ayam Bakar Taliwang secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Ayam Bakar Taliwang, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Ayam Bakar Taliwang selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "medium",
    time: 17,
    status: "accept",
  },

  {
    slug: "ayam-opor-putih",
    title: "Ayam Opor Putih",
    description:
      "Resep Ayam Opor Putih khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Ayam Opor Putih secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Ayam Opor Putih, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Ayam Opor Putih selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "hard",
    time: 24,
    status: "accept",
  },

  {
    slug: "ayam-woku-manado",
    title: "Ayam Woku Manado",
    description:
      "Resep Ayam Woku Manado khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Ayam Woku Manado secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Ayam Woku Manado, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Ayam Woku Manado selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "easy",
    time: 31,
    status: "accept",
  },

  {
    slug: "ayam-betutu-bali",
    title: "Ayam Betutu Bali",
    description:
      "Resep Ayam Betutu Bali khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Ayam Betutu Bali secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Ayam Betutu Bali, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Ayam Betutu Bali selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "medium",
    time: 38,
    status: "accept",
  },

  {
    slug: "ayam-rica-rica-kemangi",
    title: "Ayam Rica-Rica Kemangi",
    description:
      "Resep Ayam Rica-Rica Kemangi khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Ayam Rica-Rica Kemangi secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Ayam Rica-Rica Kemangi, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Ayam Rica-Rica Kemangi selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "hard",
    time: 45,
    status: "accept",
  },

  {
    slug: "ayam-geprek-sambal-bawang",
    title: "Ayam Geprek Sambal Bawang",
    description:
      "Resep Ayam Geprek Sambal Bawang khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Ayam Geprek Sambal Bawang secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Ayam Geprek Sambal Bawang, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Ayam Geprek Sambal Bawang selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "easy",
    time: 52,
    status: "accept",
  },

  {
    slug: "ayam-penyet-surabaya",
    title: "Ayam Penyet Surabaya",
    description:
      "Resep Ayam Penyet Surabaya khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Ayam Penyet Surabaya secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Ayam Penyet Surabaya, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Ayam Penyet Surabaya selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "medium",
    time: 59,
    status: "accept",
  },

  {
    slug: "ayam-lodho-tulungagung",
    title: "Ayam Lodho Tulungagung",
    description:
      "Resep Ayam Lodho Tulungagung khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Ayam Lodho Tulungagung secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Ayam Lodho Tulungagung, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Ayam Lodho Tulungagung selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "hard",
    time: 15,
    status: "accept",
  },

  {
    slug: "ayam-kecap-manis",
    title: "Ayam Kecap Manis",
    description:
      "Resep Ayam Kecap Manis khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Ayam Kecap Manis secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Ayam Kecap Manis, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Ayam Kecap Manis selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "easy",
    time: 22,
    status: "accept",
  },

  {
    slug: "bebek-goreng-madura",
    title: "Bebek Goreng Madura",
    description:
      "Resep Bebek Goreng Madura khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Bebek Goreng Madura secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Bebek Goreng Madura, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Bebek Goreng Madura selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "medium",
    time: 29,
    status: "accept",
  },

  {
    slug: "bebek-bakar-bumbu-hitam",
    title: "Bebek Bakar Bumbu Hitam",
    description:
      "Resep Bebek Bakar Bumbu Hitam khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Bebek Bakar Bumbu Hitam secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Bebek Bakar Bumbu Hitam, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Bebek Bakar Bumbu Hitam selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "hard",
    time: 36,
    status: "accept",
  },

  {
    slug: "empal-gepuk-sunda",
    title: "Empal Gepuk Sunda",
    description:
      "Resep Empal Gepuk Sunda khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Empal Gepuk Sunda secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Empal Gepuk Sunda, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Empal Gepuk Sunda selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "easy",
    time: 43,
    status: "accept",
  },

  {
    slug: "dendeng-balado-padang",
    title: "Dendeng Balado Padang",
    description:
      "Resep Dendeng Balado Padang khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Dendeng Balado Padang secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Dendeng Balado Padang, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Dendeng Balado Padang selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "medium",
    time: 50,
    status: "accept",
  },

  {
    slug: "sate-ayam-madura",
    title: "Sate Ayam Madura",
    description:
      "Resep Sate Ayam Madura khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Sate Ayam Madura secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Sate Ayam Madura, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Sate Ayam Madura selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "hard",
    time: 57,
    status: "accept",
  },

  {
    slug: "sate-kambing-maranggi",
    title: "Sate Kambing Maranggi",
    description:
      "Resep Sate Kambing Maranggi khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Sate Kambing Maranggi secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Sate Kambing Maranggi, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Sate Kambing Maranggi selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "easy",
    time: 13,
    status: "accept",
  },

  {
    slug: "sate-lilit-bali",
    title: "Sate Lilit Bali",
    description:
      "Resep Sate Lilit Bali khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Sate Lilit Bali secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Sate Lilit Bali, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Sate Lilit Bali selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "medium",
    time: 20,
    status: "accept",
  },

  {
    slug: "sate-padang-pariaman",
    title: "Sate Padang Pariaman",
    description:
      "Resep Sate Padang Pariaman khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Sate Padang Pariaman secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Sate Padang Pariaman, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Sate Padang Pariaman selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "hard",
    time: 27,
    status: "accept",
  },

  {
    slug: "sate-taichan-senayan",
    title: "Sate Taichan Senayan",
    description:
      "Resep Sate Taichan Senayan khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Sate Taichan Senayan secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Sate Taichan Senayan, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Sate Taichan Senayan selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "easy",
    time: 34,
    status: "pending",
  },

  {
    slug: "sate-usus-angkringan",
    title: "Sate Usus Angkringan",
    description:
      "Resep Sate Usus Angkringan khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Sate Usus Angkringan secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Sate Usus Angkringan, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Sate Usus Angkringan selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "medium",
    time: 41,
    status: "draft",
  },

  {
    slug: "gulai-kambing-jawa",
    title: "Gulai Kambing Jawa",
    description:
      "Resep Gulai Kambing Jawa khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Gulai Kambing Jawa secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Gulai Kambing Jawa, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Gulai Kambing Jawa selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "hard",
    time: 48,
    status: "accept",
  },

  {
    slug: "tongseng-sapi-solo",
    title: "Tongseng Sapi Solo",
    description:
      "Resep Tongseng Sapi Solo khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Tongseng Sapi Solo secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Tongseng Sapi Solo, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Tongseng Sapi Solo selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "easy",
    time: 55,
    status: "accept",
  },

  {
    slug: "rawon-nguling",
    title: "Rawon Nguling",
    description:
      "Resep Rawon Nguling khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Rawon Nguling secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Rawon Nguling, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Rawon Nguling selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "medium",
    time: 11,
    status: "accept",
  },

  {
    slug: "soto-betawi-santan",
    title: "Soto Betawi Santan",
    description:
      "Resep Soto Betawi Santan khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Soto Betawi Santan secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Soto Betawi Santan, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Soto Betawi Santan selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "hard",
    time: 18,
    status: "accept",
  },

  {
    slug: "soto-mie-bogor",
    title: "Soto Mie Bogor",
    description:
      "Resep Soto Mie Bogor khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Soto Mie Bogor secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Soto Mie Bogor, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Soto Mie Bogor selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "easy",
    time: 25,
    status: "accept",
  },

  {
    slug: "soto-kudus-ayam",
    title: "Soto Kudus Ayam",
    description:
      "Resep Soto Kudus Ayam khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Soto Kudus Ayam secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Soto Kudus Ayam, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Soto Kudus Ayam selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "medium",
    time: 32,
    status: "accept",
  },

  {
    slug: "soto-banjar-kalimantan",
    title: "Soto Banjar Kalimantan",
    description:
      "Resep Soto Banjar Kalimantan khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Soto Banjar Kalimantan secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Soto Banjar Kalimantan, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Soto Banjar Kalimantan selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "hard",
    time: 39,
    status: "accept",
  },

  {
    slug: "bakso-malang-komplit",
    title: "Bakso Malang Komplit",
    description:
      "Resep Bakso Malang Komplit khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Bakso Malang Komplit secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Bakso Malang Komplit, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Bakso Malang Komplit selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "easy",
    time: 46,
    status: "accept",
  },

  {
    slug: "mie-ayam-wonogiri",
    title: "Mie Ayam Wonogiri",
    description:
      "Resep Mie Ayam Wonogiri khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Mie Ayam Wonogiri secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Mie Ayam Wonogiri, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Mie Ayam Wonogiri selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "medium",
    time: 53,
    status: "accept",
  },

  {
    slug: "mie-aceh-tumis",
    title: "Mie Aceh Tumis",
    description:
      "Resep Mie Aceh Tumis khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Mie Aceh Tumis secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Mie Aceh Tumis, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Mie Aceh Tumis selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "hard",
    time: 60,
    status: "accept",
  },

  {
    slug: "mie-goreng-tek-tek",
    title: "Mie Goreng Tek-Tek",
    description:
      "Resep Mie Goreng Tek-Tek khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Mie Goreng Tek-Tek secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Mie Goreng Tek-Tek, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Mie Goreng Tek-Tek selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "easy",
    time: 16,
    status: "accept",
  },

  {
    slug: "mie-celor-palembang",
    title: "Mie Celor Palembang",
    description:
      "Resep Mie Celor Palembang khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Mie Celor Palembang secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Mie Celor Palembang, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Mie Celor Palembang selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "medium",
    time: 23,
    status: "accept",
  },

  {
    slug: "nasi-liwet-solo",
    title: "Nasi Liwet Solo",
    description:
      "Resep Nasi Liwet Solo khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Nasi Liwet Solo secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Nasi Liwet Solo, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Nasi Liwet Solo selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "hard",
    time: 30,
    status: "accept",
  },

  {
    slug: "nasi-uduk-betawi",
    title: "Nasi Uduk Betawi",
    description:
      "Resep Nasi Uduk Betawi khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Nasi Uduk Betawi secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Nasi Uduk Betawi, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Nasi Uduk Betawi selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "easy",
    time: 37,
    status: "accept",
  },

  {
    slug: "nasi-kuning-manado",
    title: "Nasi Kuning Manado",
    description:
      "Resep Nasi Kuning Manado khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Nasi Kuning Manado secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Nasi Kuning Manado, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Nasi Kuning Manado selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "medium",
    time: 44,
    status: "accept",
  },

  {
    slug: "nasi-pecel-madiun",
    title: "Nasi Pecel Madiun",
    description:
      "Resep Nasi Pecel Madiun khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Nasi Pecel Madiun secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Nasi Pecel Madiun, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Nasi Pecel Madiun selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "hard",
    time: 51,
    status: "accept",
  },

  {
    slug: "nasi-campur-bali",
    title: "Nasi Campur Bali",
    description:
      "Resep Nasi Campur Bali khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Nasi Campur Bali secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Nasi Campur Bali, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Nasi Campur Bali selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "easy",
    time: 58,
    status: "accept",
  },

  {
    slug: "nasi-padang-komplit",
    title: "Nasi Padang Komplit",
    description:
      "Resep Nasi Padang Komplit khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Nasi Padang Komplit secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Nasi Padang Komplit, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Nasi Padang Komplit selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "medium",
    time: 14,
    status: "accept",
  },

  {
    slug: "nasi-tutug-oncom",
    title: "Nasi Tutug Oncom",
    description:
      "Resep Nasi Tutug Oncom khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Nasi Tutug Oncom secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Nasi Tutug Oncom, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Nasi Tutug Oncom selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "hard",
    time: 21,
    status: "pending",
  },

  {
    slug: "nasi-bakar-ayam-jamur",
    title: "Nasi Bakar Ayam Jamur",
    description:
      "Resep Nasi Bakar Ayam Jamur khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Nasi Bakar Ayam Jamur secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Nasi Bakar Ayam Jamur, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Nasi Bakar Ayam Jamur selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "easy",
    time: 28,
    status: "draft",
  },

  {
    slug: "lontong-sayur-medan",
    title: "Lontong Sayur Medan",
    description:
      "Resep Lontong Sayur Medan khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Lontong Sayur Medan secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Lontong Sayur Medan, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Lontong Sayur Medan selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "medium",
    time: 35,
    status: "accept",
  },

  {
    slug: "lontong-balap-surabaya",
    title: "Lontong Balap Surabaya",
    description:
      "Resep Lontong Balap Surabaya khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Lontong Balap Surabaya secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Lontong Balap Surabaya, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Lontong Balap Surabaya selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "hard",
    time: 42,
    status: "accept",
  },

  {
    slug: "ketoprak-jakarta",
    title: "Ketoprak Jakarta",
    description:
      "Resep Ketoprak Jakarta khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Ketoprak Jakarta secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Ketoprak Jakarta, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Ketoprak Jakarta selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "easy",
    time: 49,
    status: "accept",
  },

  {
    slug: "gado-gado-siram",
    title: "Gado-Gado Siram",
    description:
      "Resep Gado-Gado Siram khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Gado-Gado Siram secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Gado-Gado Siram, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Gado-Gado Siram selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "medium",
    time: 56,
    status: "accept",
  },

  {
    slug: "pecel-lele-lamongan",
    title: "Pecel Lele Lamongan",
    description:
      "Resep Pecel Lele Lamongan khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Pecel Lele Lamongan secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Pecel Lele Lamongan, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Pecel Lele Lamongan selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "hard",
    time: 12,
    status: "accept",
  },

  {
    slug: "ikan-bakar-jimbaran",
    title: "Ikan Bakar Jimbaran",
    description:
      "Resep Ikan Bakar Jimbaran khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Ikan Bakar Jimbaran secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Ikan Bakar Jimbaran, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Ikan Bakar Jimbaran selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "easy",
    time: 19,
    status: "accept",
  },

  {
    slug: "ikan-pepes-sunda",
    title: "Ikan Pepes Sunda",
    description:
      "Resep Ikan Pepes Sunda khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Ikan Pepes Sunda secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Ikan Pepes Sunda, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Ikan Pepes Sunda selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "medium",
    time: 26,
    status: "accept",
  },

  {
    slug: "pindang-patin-palembang",
    title: "Pindang Patin Palembang",
    description:
      "Resep Pindang Patin Palembang khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Pindang Patin Palembang secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Pindang Patin Palembang, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Pindang Patin Palembang selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "hard",
    time: 33,
    status: "accept",
  },

  {
    slug: "pallumara-makassar",
    title: "Pallumara Makassar",
    description:
      "Resep Pallumara Makassar khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Pallumara Makassar secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Pallumara Makassar, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Pallumara Makassar selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "easy",
    time: 40,
    status: "accept",
  },

  {
    slug: "cumi-saus-padang",
    title: "Cumi Saus Padang",
    description:
      "Resep Cumi Saus Padang khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Cumi Saus Padang secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Cumi Saus Padang, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Cumi Saus Padang selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "medium",
    time: 47,
    status: "accept",
  },

  {
    slug: "udang-saus-mentega",
    title: "Udang Saus Mentega",
    description:
      "Resep Udang Saus Mentega khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Udang Saus Mentega secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Udang Saus Mentega, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Udang Saus Mentega selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "hard",
    time: 54,
    status: "accept",
  },

  {
    slug: "kerang-dara-rebus",
    title: "Kerang Dara Rebus",
    description:
      "Resep Kerang Dara Rebus khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Kerang Dara Rebus secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Kerang Dara Rebus, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Kerang Dara Rebus selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "easy",
    time: 10,
    status: "accept",
  },

  {
    slug: "gurame-asam-manis",
    title: "Gurame Asam Manis",
    description:
      "Resep Gurame Asam Manis khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Gurame Asam Manis secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Gurame Asam Manis, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Gurame Asam Manis selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "medium",
    time: 17,
    status: "accept",
  },

  {
    slug: "lele-mangut-jogja",
    title: "Lele Mangut Jogja",
    description:
      "Resep Lele Mangut Jogja khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Lele Mangut Jogja secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Lele Mangut Jogja, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Lele Mangut Jogja selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "hard",
    time: 24,
    status: "accept",
  },

  {
    slug: "bandeng-presto-semarang",
    title: "Bandeng Presto Semarang",
    description:
      "Resep Bandeng Presto Semarang khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Bandeng Presto Semarang secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Bandeng Presto Semarang, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Bandeng Presto Semarang selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "easy",
    time: 31,
    status: "accept",
  },

  {
    slug: "sayur-asem-betawi",
    title: "Sayur Asem Betawi",
    description:
      "Resep Sayur Asem Betawi khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Sayur Asem Betawi secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Sayur Asem Betawi, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Sayur Asem Betawi selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "medium",
    time: 38,
    status: "accept",
  },

  {
    slug: "sayur-lodeh-rebung",
    title: "Sayur Lodeh Rebung",
    description:
      "Resep Sayur Lodeh Rebung khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Sayur Lodeh Rebung secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Sayur Lodeh Rebung, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Sayur Lodeh Rebung selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "hard",
    time: 45,
    status: "accept",
  },

  {
    slug: "capcay-jawa-nyemek",
    title: "Capcay Jawa Nyemek",
    description:
      "Resep Capcay Jawa Nyemek khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Capcay Jawa Nyemek secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Capcay Jawa Nyemek, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Capcay Jawa Nyemek selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "easy",
    time: 52,
    status: "accept",
  },

  {
    slug: "tumis-pare-teri",
    title: "Tumis Pare Teri",
    description:
      "Resep Tumis Pare Teri khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Tumis Pare Teri secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Tumis Pare Teri, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Tumis Pare Teri selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "medium",
    time: 59,
    status: "pending",
  },

  {
    slug: "tumis-genjer-tauco",
    title: "Tumis Genjer Tauco",
    description:
      "Resep Tumis Genjer Tauco khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Tumis Genjer Tauco secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Tumis Genjer Tauco, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Tumis Genjer Tauco selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "hard",
    time: 15,
    status: "draft",
  },

  {
    slug: "oseng-mercon-tetelan",
    title: "Oseng Mercon Tetelan",
    description:
      "Resep Oseng Mercon Tetelan khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Oseng Mercon Tetelan secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Oseng Mercon Tetelan, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Oseng Mercon Tetelan selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "easy",
    time: 22,
    status: "accept",
  },

  {
    slug: "terong-balado-terasi",
    title: "Terong Balado Terasi",
    description:
      "Resep Terong Balado Terasi khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Terong Balado Terasi secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Terong Balado Terasi, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Terong Balado Terasi selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "medium",
    time: 29,
    status: "accept",
  },

  {
    slug: "sambal-goreng-kentang-ati",
    title: "Sambal Goreng Kentang Ati",
    description:
      "Resep Sambal Goreng Kentang Ati khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Sambal Goreng Kentang Ati secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Sambal Goreng Kentang Ati, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Sambal Goreng Kentang Ati selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "hard",
    time: 36,
    status: "accept",
  },

  {
    slug: "perkedel-kentang-daging",
    title: "Perkedel Kentang Daging",
    description:
      "Resep Perkedel Kentang Daging khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Perkedel Kentang Daging secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Perkedel Kentang Daging, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Perkedel Kentang Daging selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "easy",
    time: 43,
    status: "accept",
  },

  {
    slug: "martabak-telur-mini",
    title: "Martabak Telur Mini",
    description:
      "Resep Martabak Telur Mini khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Martabak Telur Mini secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Martabak Telur Mini, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Martabak Telur Mini selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "medium",
    time: 50,
    status: "accept",
  },

  {
    slug: "tahu-gejrot-cirebon",
    title: "Tahu Gejrot Cirebon",
    description:
      "Resep Tahu Gejrot Cirebon khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Tahu Gejrot Cirebon secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Tahu Gejrot Cirebon, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Tahu Gejrot Cirebon selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "hard",
    time: 57,
    status: "accept",
  },

  {
    slug: "tahu-tek-surabaya",
    title: "Tahu Tek Surabaya",
    description:
      "Resep Tahu Tek Surabaya khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Tahu Tek Surabaya secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Tahu Tek Surabaya, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Tahu Tek Surabaya selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "easy",
    time: 13,
    status: "accept",
  },

  {
    slug: "tempe-bacem-manis",
    title: "Tempe Bacem Manis",
    description:
      "Resep Tempe Bacem Manis khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Tempe Bacem Manis secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Tempe Bacem Manis, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Tempe Bacem Manis selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "medium",
    time: 20,
    status: "accept",
  },

  {
    slug: "tempe-mendoan-banyumas",
    title: "Tempe Mendoan Banyumas",
    description:
      "Resep Tempe Mendoan Banyumas khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Tempe Mendoan Banyumas secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Tempe Mendoan Banyumas, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Tempe Mendoan Banyumas selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "hard",
    time: 27,
    status: "accept",
  },

  {
    slug: "tempe-orek-kering",
    title: "Tempe Orek Kering",
    description:
      "Resep Tempe Orek Kering khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Tempe Orek Kering secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Tempe Orek Kering, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Tempe Orek Kering selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "easy",
    time: 34,
    status: "accept",
  },

  {
    slug: "keripik-singkong-balado",
    title: "Keripik Singkong Balado",
    description:
      "Resep Keripik Singkong Balado khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Keripik Singkong Balado secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Keripik Singkong Balado, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Keripik Singkong Balado selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "medium",
    time: 41,
    status: "accept",
  },

  {
    slug: "pisang-goreng-wijen",
    title: "Pisang Goreng Wijen",
    description:
      "Resep Pisang Goreng Wijen khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Pisang Goreng Wijen secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Pisang Goreng Wijen, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Pisang Goreng Wijen selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "hard",
    time: 48,
    status: "accept",
  },

  {
    slug: "es-cendol-dawet",
    title: "Es Cendol Dawet",
    description:
      "Resep Es Cendol Dawet khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Es Cendol Dawet secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Es Cendol Dawet, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Es Cendol Dawet selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "easy",
    time: 55,
    status: "accept",
  },

  {
    slug: "es-teler-sultan",
    title: "Es Teler Sultan",
    description:
      "Resep Es Teler Sultan khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Es Teler Sultan secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Es Teler Sultan, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Es Teler Sultan selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "medium",
    time: 11,
    status: "accept",
  },

  {
    slug: "es-campur-pelangi",
    title: "Es Campur Pelangi",
    description:
      "Resep Es Campur Pelangi khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Es Campur Pelangi secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Es Campur Pelangi, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Es Campur Pelangi selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "hard",
    time: 18,
    status: "accept",
  },

  {
    slug: "bajigur-hangat",
    title: "Bajigur Hangat",
    description:
      "Resep Bajigur Hangat khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Bajigur Hangat secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Bajigur Hangat, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Bajigur Hangat selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "easy",
    time: 25,
    status: "accept",
  },

  {
    slug: "bandrek-susu-jahe",
    title: "Bandrek Susu Jahe",
    description:
      "Resep Bandrek Susu Jahe khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Bandrek Susu Jahe secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Bandrek Susu Jahe, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Bandrek Susu Jahe selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "medium",
    time: 32,
    status: "accept",
  },

  {
    slug: "wedang-ronde-jahe",
    title: "Wedang Ronde Jahe",
    description:
      "Resep Wedang Ronde Jahe khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Wedang Ronde Jahe secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Wedang Ronde Jahe, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Wedang Ronde Jahe selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "hard",
    time: 39,
    status: "accept",
  },

  {
    slug: "klepon-gula-merah",
    title: "Klepon Gula Merah",
    description:
      "Resep Klepon Gula Merah khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Klepon Gula Merah secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Klepon Gula Merah, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Klepon Gula Merah selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "easy",
    time: 46,
    status: "pending",
  },

  {
    slug: "dadar-gulung-kelapa",
    title: "Dadar Gulung Kelapa",
    description:
      "Resep Dadar Gulung Kelapa khas Indonesia dengan bumbu rempah pilihan dan cita rasa autentik. Cocok disajikan hangat untuk keluarga.",
    ingredients: JSON.stringify([
      "Bahan utama untuk Dadar Gulung Kelapa secukupnya",
      "6 siung bawang merah, iris halus",
      "4 siung bawang putih, cincang",
      "Cabai merah dan rawit sesuai selera",
      "Garam, gula, dan kaldu bubuk secukupnya",
      "Minyak goreng secukupnya",
      "Air matang secukupnya",
    ]),
    instructions: JSON.stringify([
      "Siapkan semua bahan untuk Dadar Gulung Kelapa, cuci bersih dan potong sesuai kebutuhan.",
      "Haluskan atau iris bumbu (bawang merah, bawang putih, dan cabai) lalu tumis hingga harum.",
      "Masukkan bahan utama, aduk rata hingga tercampur dengan bumbu.",
      "Tambahkan air, garam, gula, dan kaldu bubuk, lalu masak hingga matang dan bumbu meresap.",
      "Koreksi rasa, masak sebentar hingga tingkat kematangan yang diinginkan.",
      "Sajikan Dadar Gulung Kelapa selagi hangat.",
    ]),
    thumbnail: "placeholder.png",
    difficulty: "medium",
    time: 53,
    status: "draft",
  },
];

// Naikkan versi ini setiap kali data demo berubah (tambah resep/kategori)
// agar browser yang masih menyimpan data lama otomatis di-seed ulang.
const DEMO_SEED_VERSION = "4";

// Jumlah data yang harus ada setelah seeding. Dipakai sebagai pemeriksa
// integritas: `demo_seed_version` saja tidak cukup, karena seed yang gagal
// di tengah jalan (mis. `bulkAdd` kena batas ukuran transaksi) tetap
// menyisakan sebagian data + versi yang sudah tertulis.
const EXPECTED = {
  users: demoUsers.length,
  categories: demoCategory.length,
  recipes: recipes.length,
};

const isComplete = async () => {
  const [users, categories, recipeCount] = await Promise.all([
    db.users.count(),
    db.categories.count(),
    db.recipes.count(),
  ]);

  const complete =
    users === EXPECTED.users &&
    categories === EXPECTED.categories &&
    recipeCount === EXPECTED.recipes;

  if (!complete) {
    console.info(
      `[demo-seed] Data belum lengkap (users ${users}/${EXPECTED.users}, ` +
        `categories ${categories}/${EXPECTED.categories}, ` +
        `recipes ${recipeCount}/${EXPECTED.recipes}) -> seeding ulang.`,
    );
  }

  return complete;
};

export const seedDemoUsers = async () => {
  try {
    const savedVersion = localStorage.getItem("demo_seed_version");

    // Sudah seed versi terbaru DAN jumlahnya cocok -> tidak perlu apa-apa.
    if (savedVersion === DEMO_SEED_VERSION && (await isComplete())) return;

    // Reset penuh (termasuk data lama 20 resep) lalu seed ulang tahap per tahap.
    // Tahap dipisah (bukan 1 transaksi raksasa) supaya 1 tahap gagal
    // tidak menggugurkan tahap lain dan mudah dilacak di console.
    await Promise.all([
      db.users.clear(),
      db.categories.clear(),
      db.recipes.clear(),
      db.favourite.clear(),
      db.profile_information.clear(),
      db.refresh_token.clear(),
      db.reviews.clear(),
    ]);

    await db.users.bulkAdd(demoUsers);
    await db.categories.bulkAdd(demoCategory);

    const chief = await db.users.where("role").equals(ROLES.CHIEF).first();
    const categories = await db.categories.toArray();

    if (!chief || categories.length === 0) {
      throw new Error("Seed gagal: user chief atau kategori tidak ditemukan.");
    }

    await db.recipes.bulkAdd(
      recipes.map((recipe, i) => ({
        ...recipe,
        userId: chief.id,
        categoryId: categories[i % categories.length].id,
        author: chief.username,
      })),
    );

    // Seed contoh reviews (1 per user per resep, hanya resep accept)
    const demoUser = await db.users.where("role").equals(ROLES.USER).first();
    const adminUser = await db.users.where("role").equals(ROLES.ADMIN).first();
    const acceptRecipes = await db.recipes.where("status").equals("accept").limit(3).toArray();

    const demoReviews = [];
    if (demoUser && acceptRecipes[0]) {
      demoReviews.push({
        userId: demoUser.id,
        recipeId: acceptRecipes[0].id,
        rating: 5,
        comment: "Enak banget, bumbunya pas!",
        createdAt: now,
        updatedAt: now,
      });
    }
    if (demoUser && acceptRecipes[1]) {
      demoReviews.push({
        userId: demoUser.id,
        recipeId: acceptRecipes[1].id,
        rating: 4,
        comment: "Segar dan gampang dibuat.",
        createdAt: now,
        updatedAt: now,
      });
    }
    if (adminUser && acceptRecipes[0]) {
      demoReviews.push({
        userId: adminUser.id,
        recipeId: acceptRecipes[0].id,
        rating: 5,
        comment: "Sudah coba, mantap!",
        createdAt: now,
        updatedAt: now,
      });
    }

    if (demoReviews.length > 0) {
      await db.reviews.bulkAdd(demoReviews);
    }

    //_ validasi dulu sebelum menandai versi; kalau gagal, versi tidak
    //_ ditulis supaya seeding dicoba lagi di reload berikutnya
    if (!(await isComplete())) {
      console.warn("[demo-seed] Seeding selesai tapi jumlah data tidak sesuai.");
      return;
    }

    localStorage.setItem("demo_seed_version", DEMO_SEED_VERSION);
    console.info("[demo-seed] Data demo berhasil dimuat.");
  } catch (err) {
    console.error("[demo-seed] Gagal memuat data demo:", err);
  }
};
