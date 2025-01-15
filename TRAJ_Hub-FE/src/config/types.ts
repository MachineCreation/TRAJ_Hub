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

export type Perk = {
  name: string,
  description: string
}

export type PerksType = {
  [key: string]: Perk[],
}


// type for signed url upload
type url_res = {
  path: string;
  signed_url: string;
  token: string;
}

export type Signed_url = {
  urls: {
    [key:string]: url_res
  };
}