export interface WeaponDetails {
    "hero": string;
    "Primary Image": string;
    "Primary Weapon Details": {
        name: string;
        class: string;
        stats: {
            [key: string]: string | number;
        };
        Attachments: {
            [key: string]: {
                id: string;
                name: string;
                stats: {
                    [key: string]: string | number;
                };
            };
        };
    };
    "Secondary Image": string;
    "Secondary Weapon Details": {
        name: string;
        class: string;
        stats: {
            [key: string]: string | number;
        };
        Attachments: {
            [key: string]: {
                id: string;
                name: string;
                stats: {
                    [key: string]: string | number;
                };
            };
        };
    };
    "lethal": string;
    "tactical": string;
    "perks": {
        "P1": string;
        "P2": string;
        "P3": string;
        "P4": string;
    };
    "clips": {
        "C1": string;
        "C2": string;
        "C3": string;
        "C4": string;
    }

}

export interface Member {
    WeaponDetails?: WeaponDetails | null;
}

export const members: Record<string, Member> = {
    TopSloth: {                                                     //images for TopSloth
        WeaponDetails: null,
    },
    RedPrimeOrigin: {                                                     //images for RedPrimeOrigin
        WeaponDetails: null,
    },
    Araspberryberet: {                                                     //images for Araspberryberet
        WeaponDetails: null,
    },
    JesusTts: {                                                     //images for JesusTts
        WeaponDetails: null,
    }
}

export type MemberName = keyof typeof members;
export type WeaponType = keyof WeaponDetails;
export type WeaponDetailKey = "Primary Weapon Details" | "Secondary Weapon Details";


