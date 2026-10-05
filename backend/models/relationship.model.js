import UsersModels from "./users.model.js";
import RecipeModels from "./recipe.models.js";
import FavouriteModels from "./favourite.model.js";
import CategoriesModels from "./categories.model.js";
import ProfileModels from "./profile.models.js";
import ReviewModels from "./review.model.js";

UsersModels.hasMany(RecipeModels, { foreignKey: "userId", as: "recipes" });
RecipeModels.belongsTo(UsersModels, { foreignKey: "userId", as: "recipe" });

UsersModels.hasOne(ProfileModels, { foreignKey: "userId", as: "profiles" });
ProfileModels.belongsTo(UsersModels, { foreignKey: "userId", as: "profile" });

UsersModels.hasMany(FavouriteModels, {
  foreignKey: "userId",
  as: "favourites",
});
FavouriteModels.belongsTo(UsersModels, {
  foreignKey: "userId",
  as: "favourite",
});

UsersModels.hasMany(RecipeModels, {
  foreignKey: "userId",
  as: "recipe_author",
});
RecipeModels.belongsTo(UsersModels, {
  foreignKey: "userId",
  as: "recipes_authors",
});

RecipeModels.hasMany(FavouriteModels, {
  foreignKey: "recipeId",
  as: "favourite_recipes",
});
FavouriteModels.belongsTo(RecipeModels, {
  foreignKey: "recipeId",
  as: "favourite_recipe",
});

RecipeModels.belongsTo(CategoriesModels, {
  foreignKey: "categoryId",
  as: "category",
});
CategoriesModels.hasMany(RecipeModels, {
  foreignKey: "categoryId",
  as: "recipes",
  onDelete: "RESTRICT",
  constraints: true,
});

UsersModels.hasMany(ReviewModels, {
  foreignKey: "userId",
  as: "reviews",
});
ReviewModels.belongsTo(UsersModels, {
  foreignKey: "userId",
  as: "reviewer",
});

RecipeModels.hasMany(ReviewModels, {
  foreignKey: "recipeId",
  as: "reviews",
  onDelete: "CASCADE",
  constraints: true,
});
ReviewModels.belongsTo(RecipeModels, {
  foreignKey: "recipeId",
  as: "review_recipe",
});

export {
  UsersModels,
  RecipeModels,
  FavouriteModels,
  CategoriesModels,
  ProfileModels,
  ReviewModels,
};
