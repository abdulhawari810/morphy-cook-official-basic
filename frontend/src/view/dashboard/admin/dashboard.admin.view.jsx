import { useAllRecipesForAdmin } from "@/hooks/recipes/useAllRecipesForAdmin.hooks";
import { useCountAllRecipes } from "@/hooks/recipes/useCountAllRecipes.hooks";
import DashboardView from "@/view/dashboard/components/dashboard.view";

export default function DashboardAdminView() {
  const { recipesAdmin, loadingRecipesAdmin } = useAllRecipesForAdmin();
  const { countAll } = useCountAllRecipes();

  console.log(countAll);

  return (
    <DashboardView
      recipes={recipesAdmin?.data}
      role="admin"
      loadingState={loadingRecipesAdmin}
      count={countAll}
      countAllRecipes={recipesAdmin?.totalData}
    />
  );
}
