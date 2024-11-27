// react
import { lazy } from "react";

import Home from "../pages/home.tsx";
import TopSloth from "../pages/Topsloth.tsx";
import RedPrimeOrigin from "../pages/RedPrimeOrigin.tsx";
import Araspberryberet from "../pages/Araspberryberet.tsx";
import JesusTts from "../pages/JesusTts.tsx";
import WeaponCreator from "../pages/weaponCreator.tsx";
import Login from "../pages/login.tsx";

const Arcade = lazy(() => import('../pages/Arcade.tsx'));

export interface RouteType {
    path: string,
    component: React.ComponentType<any>,
    name: string,
    protected: boolean
}

const routes: RouteType[] = [
    {
      path: "/",
      component: Home,
      name: "Home",
      protected: false
    },
    {
      path: "/topsloth",
      component: TopSloth,
      name: "TopSloth",
      protected: false
    },
    {
      path: "/araspberryberet",
      component: Araspberryberet,
      name: "araspberryberet",
      protected: false
    },
    {
      path: "/RedPrimeOrigin",
      component: RedPrimeOrigin,
      name: "RedPrimeOrigin",
      protected: false
    },
    {
      path: "/JesusTts",
      component: JesusTts,
      name: "JesusTts",
      protected: false
    },
    {
      path:"/WeaponCreator",
      component: WeaponCreator,
      name: "Weapon Creator",
      protected: false
    },
    {
      path:"/Arcade",
      component: Arcade,
      name: "Arcade",
      protected: false
    },
    {
      path:"/login",
      component: Login,
      name: "Login",
      protected: false
    },
];

export default routes