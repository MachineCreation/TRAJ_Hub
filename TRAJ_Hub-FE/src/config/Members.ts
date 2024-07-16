
export interface TopSloth {
    hero: string;
    primary: string;
    secondary: string;
    tactical: string;
    lethal: string;
    perk1: string;
    perk2: string;
    perk3: string;
    perk4: string;
}

export interface RedPrimeOrigin {
    hero: string;
    primary: string;
    secondary: string;
    tactical: string;
    lethal: string;
    perk1: string;
    perk2: string;
    perk3: string;
    perk4: string;
}

export interface Araspberryberet {
    hero: string;
    primary: string;
    secondary: string;
    tactical: string;
    lethal: string;
    perk1: string;
    perk2: string;
    perk3: string;
    perk4: string;
}

export interface JesusTts {
    hero: string;
    primary: string;
    secondary: string;
    tactical: string;
    lethal: string;
    perk1: string;
    perk2: string;
    perk3: string;
    perk4: string;
}

export const members = {

    TopSloth: {                                                     //images for TopSloth
        hero: "/media/TopSloth/hero.png",
        primary: "/media/TopSloth/primary.png",
        secondary: "/media/TopSloth/secondary.png",
        tactical: "/media/TopSloth/tactical.png",
        lethal: "/media/TopSloth/lethal.png",
        perk1: "/media/TopSloth/perk1.png",
        perk2: "/media/TopSloth/perk2.png",
        perk3: "/media/TopSloth/perk3.png",
        perk4: "/media/TopSloth/perk4.png",
        clip1: "/media/TopSloth/",
        clip2: "/media/TopSloth/",
        clip3: "/media/TopSloth/",
        clip4: "/media/TopSloth/",
    },

    RedPrimeOrigin: {                                                     //images for RedPrimeOrigin
        hero: "/media/RedPrimeOrigin/hero.png",
        primary: "/media/RedPrimeOrigin/primary.png",
        secondary: "/media/RedPrimeOrigin/secondary.png",
        tactical: "/media/RedPrimeOrigin/tactical.png",
        lethal: "/media/RedPrimeOrigin/lethal.png",
        perk1: "/media/RedPrimeOrigin/perk1.png",
        perk2: "/media/RedPrimeOrigin/perk2.png",
        perk3: "/media/RedPrimeOrigin/perk3.png",
        perk4: "/media/RedPrimeOrigin/perk4.png",
        clip1: "/media/RedPrimeOrigin/",
        clip2: "/media/RedPrimeOrigin/",
        clip3: "/media/RedPrimeOrigin/",
        clip4: "/media/RedPrimeOrigin/",
    },

    Araspberryberet: {                                                     //images for Araspberryberet
        hero: "/media/Araspberryberet/hero.png",
        primary: "/media/Araspberryberet/primary.png",
        secondary: "/media/Araspberryberet/secondary.png",
        tactical: "/media/Araspberryberet/tactical.png",
        lethal: "/media/Araspberryberet/lethal.png",
        perk1: "/media/Araspberryberet/perk1.png",
        perk2: "/media/Araspberryberet/perk2.png",
        perk3: "/media/Araspberryberet/perk3.png",
        perk4: "/media/Araspberryberet/perk4.png",
        clip1: "/media/Araspberryberet/",
        clip2: "/media/Araspberryberet/",
        clip3: "/media/Araspberryberet/",
        clip4: "/media/Araspberryberet/",
    },

    JesusTts: {                                                     //images for JesusTts
        hero: "/media/JesusTts/hero.png",
        primary: "/media/JesusTts/primary.png",
        secondary: "/media/JesusTts/secondary.png",
        tactical: "/media/JesusTts/tactical.png",
        lethal: "/media/JesusTts/lethal.png",
        perk1: "/media/JesusTts/perk1.png",
        perk2: "/media/JesusTts/perk2.png",
        perk3: "/media/JesusTts/perk3.png",
        perk4: "/media/JesusTts/perk4.png",
        clip1: "/media/JesusTts/",
        clip2: "/media/JesusTts/",
        clip3: "/media/JesusTts/",
        clip4: "/media/JesusTts/",
    }
}

export type MemberName = keyof typeof members;