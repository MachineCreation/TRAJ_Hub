
import * as weapons from '../config/variables';
import { WeaponData } from '../config/types';

//functions
import { ToTitleCase, FormatToTwoDecimals } from "../config/helpers";


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

    return (
        <article className='flex w-full flex-col p-4 text-xl'>
          <header id="weap_header"
            className='flex flex-col md:flex-row my-2 p-1 justify-around text-2xl md:text-3xl text-center rounded-xl border-x-2'>
            <section className='p-2'>{toTitleCase(props.weaponData.type)} &gt; {props.data_name}</section>
            <section className='p-2'>Overall tier: {props.weaponData["Overall tier"]} </section>
            <button
              className='py-1 px-[calc(5vw)] rounded-xl bg-yellow-500'
              onClick={() => {
                props.reset();
              }}
            >
              Reset
            </button>
          </header>

          <div className='flex flex-col lg:flex-row justify-between rounded-xl border-x-2'>
            <section className='flex p-2'>
              <ul className='flex-col flex-grow p-2 justify-between text-blue-300'>
              <h2 className='p-2 text-white'>Weapon Stats</h2>
                {props.weapon_stats.map((stat: Record<string, any>, index) => {
                  const [key, values] = Object.entries(stat)[0];
                  return (
                    <li key={index} className='flex flex-grow justify-between p-1 pl-4'>
                      <p> <span className='text-white'>{toTitleCase(key)}: </span>{values.original}</p>
                      <span
                        style={{
                          color: textColorComparison(
                            key,
                            parseValue(values.original),
                            parseValue(values.revised)
                          ),
                        }}
                      >
                        &#8594; {formatToTwoDecimals(values.revised)}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </section>

            <section className='m-2'>
              <h2 className='p-2'>Attachments</h2>

              <div className='flex-col'>
                {props.weapon_attachments.map((attachment, index) => {
                  const [key, values] = Object.entries(attachment)[0];
                  return (
                    <ul key={index}
                        className='m-1'>
                      <li className='pl-4'>
                        <h3 className='text-orange-500'>{toTitleCase(key)}</h3>
                        <div className='pl-2'>{values.name}</div>
                        <ul className='p-3'>
                          {Object.entries(values.stats).map((stat, index) => (
                            <li key={index}
                                className='pl-2'>
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

            <section className=' lg:w-1/2 p-4'>
                <img src="/media/JesusTts/primary.png" alt="" className=''/>
              </section>
          </div>

          <div className='flex my-2 justify-center rounded-xl border-x-2'>
            <button
                className='m-4 py-1 px-[calc(5vw)] rounded-xl  text-center bg-yellow-500'
                onClick={() => {
                  props.reset();
                }}
              >
                Reset
              </button>
          </div>
        </article>
    )
}

export default WeaponDiaplay