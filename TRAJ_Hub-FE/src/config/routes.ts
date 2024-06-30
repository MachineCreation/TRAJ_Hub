import Home from "../pages/home.tsx";
import TopSloth from "../pages/Topsloth.tsx";

interface RouteType {
    path: string,
    component: () => JSX.Element,
    name: string
}

const routes: RouteType[] = [
    {
      path: "",
      component: Home,
      name: "Home Screen",
    },
    {
      path: "/topsloth",
      component: TopSloth,
      name: "TopSloth",
    },
];

export default routes