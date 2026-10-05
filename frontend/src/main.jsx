import { createRoot } from "react-dom/client";
import "@/css/global.css";
import "./i18n";
import "@/css/custom.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// indexedDB seeders
import { seedDemoUsers } from "./API/mockup/seeders";

// config
import { IS_DEMO, QUERY_DEFAULTS } from "@/config/env";
import { applyTheme } from "@/utils/theme.utils";

// feature
import ProtectedRoute from "@/protected/protectedRoute";
import ProtectedRouteUsers from "@/protected/protectedRouteUsers";

import AppLayout from "@/layout/app.layout";
import DashboardLayout from "@/layout/dashboard.layout";
import SettingsLayout from "@/layout/settings.layout";

import HomeView from "@/view/home/home.view";
import DetailView from "@/view/home/detail.view";
import CategoryView from "@/view/home/category.view";
import RecipesView from "@/view/home/recipes.view";
import FavouriteView from "@/view/home/favourite.view";
import PrivacyView from "@/view/home/privacy.view";
import TermsView from "@/view/home/terms.view";
import RegisterView from "@/view/auth/register.view";
import LoginView from "@/view/auth/login.view";
import ProfileView from "@/view/home/profile.view";

// chef dashboard
import DashboardChefView from "@/view/dashboard/chef/dashboard.chef.view";
import RecipeChefView from "@/view/dashboard/chef/recipe.chef.view";

// admin dashboard
import DashboardAdminView from "@/view/dashboard/admin/dashboard.admin.view";
import UsersAdminView from "./view/dashboard/admin/users.admin.view";
import RecipeAdminView from "./view/dashboard/admin/recipe.admin.view";

// component handle error
import ErrorBoundary from "./components/handleError/ErrorBoundary";
import BackendStatus from "./hooks/server/checkBackend";
import { ROLES } from "@/config/constants";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <HomeView /> },
      { path: "category", element: <CategoryView /> },
      { path: "recipes", element: <RecipesView /> },
      { path: "favourite", element: <FavouriteView /> },
      { path: "recipes/detail/:id", element: <DetailView /> },
      { path: "privacy", element: <PrivacyView /> },
      { path: "terms", element: <TermsView /> },
    ],
  },
  {
    path: "/my",
    errorElement: <ErrorBoundary />,
    element: <ProtectedRouteUsers />,
    children: [
      {
        element: <SettingsLayout />,
        children: [
          {
            index: true,
            element: <ProfileView />,
          },
        ],
      },
    ],
  },
  {
    path: "/register",
    errorElement: <ErrorBoundary />,
    element: <RegisterView />,
  },
  {
    path: "/login",
    errorElement: <ErrorBoundary />,
    element: <LoginView />,
  },
  {
    path: "/dashboard/chef",
    errorElement: <ErrorBoundary />,
    element: <ProtectedRoute allowedRoles={[ROLES.CHIEF]} />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <DashboardChefView />,
          },
          {
            path: "recipe",
            element: <RecipeChefView />,
          },
        ],
      },
    ],
  },
  {
    path: "/dashboard/admin",
    errorElement: <ErrorBoundary />,
    element: <ProtectedRoute allowedRoles={[ROLES.ADMIN]} />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <DashboardAdminView />,
          },
          {
            path: "users",
            element: <UsersAdminView />,
          },
          {
            path: "recipe",
            element: <RecipeAdminView />,
          },
        ],
      },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      ...QUERY_DEFAULTS,
      retry: (failureCount, error) => {
        //_ jangan retry error yang memang tidak akan hilang
        if (error?.type === "NETWORK_ERROR") return false;
        if (error?.response?.status >= 400 && error.response.status < 500) {
          return false;
        }

        return failureCount < QUERY_DEFAULTS.retry;
      },
    },
  },
});

const bootstrap = async () => {
  //_ terapkan theme lebih awal agar tidak ada flash warna salah
  applyTheme(localStorage.getItem("theme") || "light");

  //_ seeding IndexedDB hanya relevan di mode demo.
  //_ Dibungkus try/catch supaya aplikasi tetap tampil walau seeding gagal
  //_ (mis. IndexedDB dihapus manual saat koneksi masih terbuka).
  if (IS_DEMO) {
    try {
      await seedDemoUsers();
    } catch (err) {
      console.error("[demo-seed] Bootstrap seeding gagal:", err);
    }

    //_ Helper debug di console browser: await window.resetDemoData()
    window.resetDemoData = async () => {
      localStorage.removeItem("demo_seed_version");
      await seedDemoUsers();
      location.reload();
    };
  }

  createRoot(document.getElementById("root")).render(
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-center" reverseOrder={false} />
      {IS_DEMO ? (
        <RouterProvider router={router} />
      ) : (
        <BackendStatus>
          <RouterProvider router={router} />
        </BackendStatus>
      )}
    </QueryClientProvider>,
  );
};

bootstrap();
