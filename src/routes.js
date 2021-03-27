import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("./pages/AboutPage"),
  },
  {
    path: "/recipe/:recipeId",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
  },
  {
    path: "/myRecipes/:recipeId",
    name: "recipeInternal",
    component: () => import("./pages/RecipeInternalViewPage"),
    props:true
  },
  {
    path: "/myFavoriteRecipes",
    name: "myFavoriteRecipes",
    component: () => import("./pages/MyFavoriteRecipesPage"),
  },
  {
    path: "/myFamilyRecipes",
    name: "myFamilyRecipes",
    component: () => import("./pages/MyFamilyRecipesPage"),
  },
  {
    path: "/myRecipes",
    name: "myRecipes",
    component: () => import("./pages/MyRecipesPage"),
  },
  {
    path: "/shap",
    name: "shap",
    component: () => import("./pages/ShapPage"),
  },
  {
    path: "/lime",
    name: "lime",
    component: () => import("./pages/LimePage"),
  },
  {
    path: "/evaluation",
    name: "evaluation",
    component: () => import("./pages/EvaluationPage"),
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
];

export default routes;
