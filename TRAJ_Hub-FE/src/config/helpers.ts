// splitting and capitalizing "rifle"
export const SplitRifle = (str: string) => {
  if (str.includes("rifle")) {
    return str.replace("rifle", " Rifle");
  }
  return str;
};

// converting strings to title Case
export const ToTitleCase = (str: string): string => {
  return str
    .toLowerCase()
    .split(/(\s+|-|')/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
};

// convert strinifyed float to 2 decimal float
export const FormatToTwoDecimals = (floatStr: string): string => {
  const num = parseFloat(floatStr);
  if (isNaN(num)) return floatStr; // Return original if not a valid number
  return num.toFixed(2);
}

/*--------------------------fetch routes-------------------------- 
eventually all fetches will be called from here */

//types
import { MemberWeaponData } from "./types";

//variables
import { backend_url } from "./variables";

//redux
import { useDispatch } from 'react-redux';
import { setUsername } from '../store/user';

// ---------------------------Auth check -------------------------------

export const checkAuth = () => {
  const dispatch = useDispatch();
  
  return async (): Promise<boolean> => {
    try {
      const response = await fetch(`${backend_url}/auth/check`, {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      const username: string = await data.username
      dispatch(setUsername(username))
      return data.authenticated;
    } catch (error) {
      console.error('Error checking authentication:', error);
      return false;
    }
  }
};

//-----------------------------fetch weapon list by type --------------------
export const fetchWeaponsByType = async (weaponType: string | null):Promise<string[] | []> => {
  if (weaponType == null) {
    alert("Can not fetch data for type null. Please select from available types.")
    return []
  }
  try {
    const response = await fetch(`${backend_url}/api-proxy/weapons/${weaponType}`, {method: "GET"})

    const data = await response.json()
    const weaponList: string[] = await data["weapons"]

    return weaponList
  }
  catch (error){
    alert(`An error occured while fetching weapons list from type ${weaponType}: ${error}`)
    console.error('An error occurred:', error);
    return [];
  }
}

//------------ fetch weapon data by type and name return stats and attachment types

export const fetchEditWeaponData = async (weaponType:string, weaponName:string): Promise<MemberWeaponData | null> => {
  try {
    const response = await fetch(`${backend_url}/api-proxy/weapon/${weaponType}/${weaponName}`,{method: "GET"})

    if (!response.ok) {
      console.error(`Failed to fetch weapon data: ${response.statusText}`)
      return null
    }

    const data = await response.json()

    const weaponData: MemberWeaponData = {
      'stats': data.stats,
      'attachment_types': data.attachment_types
    }
    return weaponData
  }
  catch (error) {
    console.error(`Error fetching weapon data: ${error}`);
    return null;
  }
}

/*--------fetch attachments by weapon type, weapon name, 
----------attachment type return a list of attachments */

export const fetchEditattachmentsByType = async (weaponType:string, weaponName:string, attachmentType: string): Promise<string[]> => {
  const list = [weaponType, weaponName, attachmentType]
  if (list.includes('')){
    console.log(`list is missing params: ${list}`);
    return [];
  };

  try {
    const response = await fetch(`${backend_url}/api-proxy/attachment_type/${weaponType}/${weaponName}/${attachmentType}`, {method: "GET"})

    if (!response.ok) {
      console.error(`Failed to fetch list of attachments for ${weaponType}, ${weaponName}, ${attachmentType}. Error: ${response.statusText}`)
      return [];
    };

    const data = await response.json()
    const attachmentList =await data.attachments

    return attachmentList
  } catch (error){
    alert(`Error fetching attachment list: ${error}`)
    console.error(`Error fetching attachment list: ${error}`)
    return []
  }
}

/* Update member data using epquipment slot name, weapon type, weapom name, and a
 list of attachment types and attachments in the form of an object. return boolean value. */

export const pushMemberDataUpdate = async (
  username: string,
  equip: string,
  wType:string,
  wName:string,
  attObject: { [key: string]: string }) => {

    const upBody = {
      user: username,
      slot: equip,
      type: wType,
      name: wName,
      attachments: attObject
    }

    const response = await fetch(`${backend_url}/update-weapon-data`,{
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(upBody)
    })

    if (!response.ok) {
      alert(`Failed to update ${username} ${equip}`)
      console.error(`Failed to update ${username} ${equip}. Error: ${response.statusText}`)
      return false
    }

    return true
  }