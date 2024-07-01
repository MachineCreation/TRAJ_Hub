import Home from "../pages/home.tsx";
import TopSloth from "../pages/Topsloth.tsx";
import RedPrimeOrigin from "../pages/RedPrimeOrigin.tsx";
import Araspberryberet from "../pages/Araspberryberet.tsx";
import JesusTts from "../pages/JesusTts.tsx";

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
    {
      path: "/Araspberryberet",
      component: Araspberryberet,
      name: "Araspberryberet",
    },
    {
      path: "/RedPrimeOrigin",
      component: RedPrimeOrigin,
      name: "RedPrimeOrigin",
    },
    {
      path: "/JesusTts",
      component: JesusTts,
      name: "JesusTts",
    },
];

export default routes