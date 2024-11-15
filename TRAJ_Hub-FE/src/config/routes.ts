import Home from "../pages/home.tsx";
import TopSloth from "../pages/Topsloth.tsx";
import RedPrimeOrigin from "../pages/RedPrimeOrigin.tsx";
import Araspberryberet from "../pages/Araspberryberet.tsx";
import JesusTts from "../pages/JesusTts.tsx";
import Arcade from "../pages/Arcade.tsx";
import Test from "../pages/test.tsx";

interface RouteType {
    path: string,
    component: React.ComponentType<any>,
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
      path: "/araspberryberet",
      component: Araspberryberet,
      name: "araspberryberet",
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
    {
      path:"/Arcade",
      component: Arcade,
      name: "Arcade"
    },
    {
      path:"/Test",
      component: Test,
      name: "Test"
    },
];

export default routes