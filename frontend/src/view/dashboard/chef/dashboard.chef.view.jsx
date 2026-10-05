import { useCountRecipesByAuthor } from "@/hooks/recipes/useCountRecipesByAuthor.hooks";
import { useRecipesByAuthor } from "@/hooks/recipes/useRecipeByAuthor.hooks";
import DashboardView from "@/view/dashboard/components/dashboard.view";

export default function DashboardChefView() {
  const { recipesByAuthor, loadingRecipesAuthor } = useRecipesByAuthor();
  const { count } = useCountRecipesByAuthor();

  console.log(count);

  return (
    <DashboardView
      recipes={recipesByAuthor?.data}
      role="chef"
      loadingState={loadingRecipesAuthor}
      count={count}
    />
  );
}
