import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
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
    path: "/explain",
    name: "explainPage",
    component: () => import("./pages/ShapPage"),
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
