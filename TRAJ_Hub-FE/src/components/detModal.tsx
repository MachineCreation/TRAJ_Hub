// react
import { useState, useEffect } from "react";

//components
import { Member, WeaponDetailKey } from "../config/Members";

//css
interface WeaponModalProps {
    equip: boolean;
    data: Member;
}

const WeaponModal = ({equip, data }: WeaponModalProps) => {
    const [weapon, setWeapon] = useState<WeaponDetailKey>("Primary Weapon Details");

    useEffect(() => {
        if (equip) {
            setWeapon("Primary Weapon Details");
        } else {
            setWeapon("Secondary Weapon Details");
        }
    }, [equip]);

    return (
        <article className="fixed flex justify-items-center items-center w-screen h-screen p-4 bg-black bg-opacity-70 z-30">
            <section className="relative flex m-auto p-16 h-full full overflow-scroll rounded-2xl shadow-outer-green flex-wrap bg-grey ">
                {data.WeaponDetails && (
                    <>
                    <figure className="flex flex-col">
                        <h1 className="text-sky-400 text-3xl">
                        <strong>{data.WeaponDetails?.[weapon]?.name}</strong>
                        </h1>
                        <ul className="relative flex flex-col m-3 p-3 ">
                            {Object.entries(data.WeaponDetails[weapon].stats).map(([key, value]) => (
                                <li
                                key={key}>
                                    <strong>{key}:</strong> <span className=" text-yellow-500">&nbsp;&nbsp;{value}</span>
                                </li>
                            ))}
                        </ul>
                    </figure>
                    <figure className="flex flex-col">
                        <h2 className="text-sky-400 text-3xl"><strong>Attachments</strong></h2>
                        <ul className="relative flex flex-col m-3 p-3 ">
                            {Object.entries(data.WeaponDetails[weapon].Attachments).map(([key, attachment]) => (
                                <li
                                key={key}>
                                    <strong className="text-green-500">{attachment.name}</strong>
                                    <ul>
                                        {Object.entries(attachment.stats).map(([statKey, statValue]) => (
                                            <li key={statKey}>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>{statKey}:</strong> <span className="text-yellow-500">&nbsp;&nbsp;{statValue}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </figure>
                    </>
                )}
            </section>
        </article>
    );
};

export default WeaponModal;
