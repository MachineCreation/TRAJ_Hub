// Stats types for weapon builder windows ----------------------

type StatDetails = {
    original: string | number;
    revised: string | number;
  };
  
  export type Stats = {
    [key: string]: StatDetails;
  };
  
  export type WeaponData = {
    "Overall tier": string;
    attachments: {
      [key: string]: {
        name: string;
        stats: {
          [key: string]: string;
        };
      };
    };
    "parameter grades": {
      [key: string]: {
        original: string;
        revised: string;
      };
    };
    stats: Stats;
    type: string;
  };
  
  export type TestData = {
    [key: string]: WeaponData;
  };
  

// types for weapon edit api fetching

export type MemberWeaponData = {
  "stats": {
    [key: string]:string
  },
  attachment_types: string[]
}