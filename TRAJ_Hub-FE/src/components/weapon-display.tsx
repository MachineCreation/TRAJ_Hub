
import * as weapons from '../config/variables';
import { WeaponData } from '../config/types';

//functions
import { SplitRifle, ToTitleCase, FormatToTwoDecimals } from "../config/helpers";


interface weaponDisplayProps {
    data_name: string;
    weaponData: WeaponData;
    setWeaponIsLoaded: (weaponIsLoaded:boolean) => void
    weapon_attachments: { [x: string]: { name: string; stats: { [key: string]: string; }; }; }[]
    weapon_stats: { [x: string]: { original: string | number; revised: string | number; }; }[]
    reset: () => void
}

const WeaponDiaplay = (props:weaponDisplayProps) => {


    
    
    const textColorComparison = (
            stat: string,
            Ovalue: number,
            Rvalue: number
        ) => {
            if (Ovalue === Rvalue) {
                return "inherit";
            }
            if (weapons.negativeValueIsPositiveEffect.includes(stat)) {
                return Ovalue < Rvalue ? "red" : "green";
            }
            return Ovalue > Rvalue ? "red" : "green";
            };

            const parseValue = (value: string | number): number => {
            if (typeof value === "string") {
                return parseFloat(value.replace(/[^0-9.]/g, ""));
            }
            return value;
    };

    const colorStatEffectIndicator = (statType: string, stat: string): string => {
        if (statType == "name") {
            return "inherit";
        }
        if (weapons.negativeValueIsPositiveEffect.includes(statType)) {
            return stat.includes("-") ? "green" : "red";
        }
        return stat.includes("-") ? "red" : "green";
    };

    const formatToTwoDecimals = (floatStr: string): string => {
        return FormatToTwoDecimals(floatStr)
    }

    const toTitleCase = (str: string): string => {
        return ToTitleCase(str);
    }

    const splitRifle = (str:string) => {
        return SplitRifle(str);
    }

    return (
        <>
          <header id="weap_header">
            <section>{props.data_name}</section>
            <section>{splitRifle(props.weaponData.type)}</section>
            <section>Overall tier: {props.weaponData["Overall tier"]} </section>
            <button
              onClick={() => {
                props.reset();
              }}
            >
              reset
            </button>
          </header>
          <section>
            <h2>Weapon Stats</h2>
            <ul>
              {props.weapon_stats.map((stat: Record<string, any>, index) => {
                const [key, values] = Object.entries(stat)[0];
                return (
                  <li key={index}>
                    {toTitleCase(key)} {values.original} &#8594;
                    <span
                      style={{
                        color: textColorComparison(
                          key,
                          parseValue(values.original),
                          parseValue(values.revised)
                        ),
                      }}
                    >
                      {formatToTwoDecimals(values.revised)}
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>

          <section>
            <h2>Attachments</h2>
            <div>
              {props.weapon_attachments.map((attachment, index) => {
                const [key, values] = Object.entries(attachment)[0];
                return (
                  <ul key={index}>
                    <li>
                      <h3>{toTitleCase(key)}</h3>
                      <div>{values.name}</div>
                      <ul>
                        {Object.entries(values.stats).map((stat, index) => (
                          <li key={index}>
                            <>{stat[0]}</>
                            <span
                              style={{
                                color: colorStatEffectIndicator(
                                  stat[0],
                                  stat[1]
                                ),
                              }}
                            >
                              {stat[1]}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                );
              })}
            </div>
          </section>
        </>
    )
}

export default WeaponDiaplay