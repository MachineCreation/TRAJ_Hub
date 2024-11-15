
import { useState } from "react";

import * as weapons from "../config/variables";
import { TestData } from "../config/types";

// components
import WeaponDiaplay from "./weapon-display";
import WeaponChoiceInterface from "./weapon_choice_interface";


export default function WeaponBuilder() {
  
    // variables
  const [data, setData] = useState<TestData>(weapons.test_data);
  const data_name: string = Object.keys(data)[0];
  const weaponData = data[data_name];
  const [weaponIsLoaded, setWeaponIsLoaded] = useState<boolean>(false);
  const [weaponType, setWeaponType] = useState<string | null>(null);
  const [parameterList, setParameterList] = useState<string[]>([]);
  const weapon_stats = Object.entries(weaponData.stats).map(([key, value]) => ({
    [key]: {
      original: value.original,
      revised: value.revised,
    },
  }));
  const weapon_attachments = Object.entries(weaponData.attachments).map(
    ([name, data]) => ({
      [name]: {
        name: data.name,
        stats: data.stats,
      },
    })
  );

  // data functions

  const fetchData = async (buildMode: boolean) => {
    if (buildMode) {
      try {
        const response = await fetch(`${weapons.backend_url}api-post/build_balanced/${weaponType}`,{method: "POST",});

        if (!response.ok) {
          alert(
            "Failed to fetch balanced build from API. Check outage page for maintenance schedule."
          );
        }

        const data = await response.json();

        if (data.length === 0) {
          return null;
        }
        const dataNew: TestData = data;

        setData(dataNew);
        setWeaponIsLoaded(true);
      } catch (error) {
        console.error("An error occurred:", error);
        return null;
      }
    }
    else {
        try {
            const response = await fetch(`${weapons.backend_url}api/build_weapon`, {
                method:"POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "weapon_type": weaponType,
                    "parameters": parameterList
                })
            })
            if (!response.ok) {
                alert(
                  "Failed to fetch balanced build from API. Check outage page for maintenance schedule."
                );
              }
      
              const data = await response.json();
      
              if (data.length === 0) {
                return null;
              }
              const dataNew: TestData = data;
      
              setData(dataNew);
              setWeaponIsLoaded(true);
        }
        catch (error) {
            console.error("An error occurred:", error);
            return null;
        }
    }
  };

  //other functions

  const reset = () => {
    setWeaponIsLoaded(false)
    setWeaponType(null);
    setParameterList([]);
  };

  const addRemoveParameter = (parameter: string) => {
    setParameterList((prev) => {
        if (!prev.includes(parameter)) {
          return [...prev, parameter];
        } else {
          return prev.filter((item) => item !== parameter);
        }
      });
  };

  return (
    <article id="weap_article" className="relative flex w-full text-white">
      {weaponIsLoaded ? (
        <WeaponDiaplay 
            data_name={data_name}
            weaponData={weaponData}
            setWeaponIsLoaded={setWeaponIsLoaded}
            weapon_attachments={weapon_attachments}
            weapon_stats={weapon_stats}
            reset={reset}
        />
      ) : (
        <WeaponChoiceInterface 
            weaponType={weaponType}
            setWeaponType={setWeaponType}
            parameterList={parameterList}
            addRemoveParameter={addRemoveParameter}
            reset={reset}
            fetchData={fetchData}
        />
      )}
    </article>
  );
}
