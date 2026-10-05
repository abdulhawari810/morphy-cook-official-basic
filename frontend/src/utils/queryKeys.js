// ─────────────────────────────────────────────────────────────
// Query key factories
//
// Aturan: `all()` WAJIB mengembalikan root key tanpa suffix,
// supaya `invalidateQueries(keys.all())` mencocokkan seluruh
// key turunan (prefix matching) milik domain tersebut.
// ─────────────────────────────────────────────────────────────

export const recipeKeys = {
  all: () => ["recipes"],

  list: (params = {}) => ["recipes", "list", params],

  detail: (id) => ["recipes", "detail", id],

  byAuthor: (authorId, params = {}) => [
    "recipes",
    "author",
    authorId,
    params,
  ],

  admin: (params = {}) => ["recipes", "admin", params],

  count: () => ["recipes", "count"],
};

export const AuthKeys = {
  all: () => ["auth"],

  current: () => ["auth", "current"],
};

export const qrcodeKeys = {
  all: () => ["qrcode"],
};

export const profileKeys = {
  all: () => ["profile"],
};

export const favouriteKeys = {
  all: () => ["favourite"],

  count: () => ["favourite", "count"],
};

export const reviewKeys = {
  all: () => ["reviews"],

  byRecipe: (recipeId, params = {}) => ["reviews", "recipe", recipeId, params],

  summary: (recipeId) => ["reviews", "recipe", recipeId, "summary"],

  mine: () => ["reviews", "me"],
};

export const categoriesKeys = {
  all: () => ["categories"],
};

export const usersKeys = {
  all: () => ["users"],

  list: (params = {}) => ["users", "list", params],

  single: (id) => ["users", "single", id],
};

export const backendKeys = {
  health: () => ["backend-health"],
};