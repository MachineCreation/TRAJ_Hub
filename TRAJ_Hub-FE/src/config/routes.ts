// react
import { lazy } from "react";

import Home from "../pages/home.tsx";
import TopSloth from "../pages/Topsloth.tsx";
import RedPrimeOrigin from "../pages/RedPrimeOrigin.tsx";
import Araspberryberet from "../pages/Araspberryberet.tsx";
import JesusTts from "../pages/JesusTts.tsx";
import WeaponCreator from "../pages/weaponCreator.tsx";

const Arcade = lazy(() => import('../pages/Arcade.tsx'));

interface RouteType {
    path: string,
    component: React.ComponentType<any>,
    name: string
}

const routes: RouteType[] = [
    {
      path: "/",
      component: Home,
      name: "Home",
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
      path:"/WeaponCreator",
      component: WeaponCreator,
      name: "Weapon Creator"
    },
    {
      path:"/Arcade",
      component: Arcade,
      name: "Arcade"
    },
];

export default routes