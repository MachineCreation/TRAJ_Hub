//react
import { useState, useEffect } from "react";

//components
import EditWeapon from "./edit-weapon";

//Redux
import { useSelector } from "react-redux";
import { RootState } from '../store/main';

//types
import { Member, WeaponDetailKey } from "../config/Members";

//css
interface WeaponModalProps {
    equip: boolean;
    data: Member;
    editable: boolean;
    click: () => void;
}

const WeaponModal = ({equip, data,  editable, click }: WeaponModalProps) => {
    const [weapon, setWeapon] = useState<WeaponDetailKey>("Primary Weapon Details");
    const [weaponPos, setWeaponPos] = useState<string>("primary");
    const [buttonClicked, setButtonClicked] = useState<boolean>(false);
    const username = useSelector((state: RootState) => state.user.username);
    
    useEffect(() => {
        if (equip) {
            setWeapon("Primary Weapon Details");
            setWeaponPos("primary");
        } else {
            setWeapon("Secondary Weapon Details");
            setWeaponPos("secondary");
        }
    },[equip]);

    return (
        <article className="fixed flex flex-col justify-items-center items-center w-screen h-screen p-2 sm:p-4 bg-black bg-opacity-70 z-30">
            <section className="relative flex-col m-auto p-4 pt-10 sm:p-16 min-w-1/2 h-full full overflow-scroll rounded-2xl shadow-outer-green flex-wrap bg-grey ">
                {buttonClicked ? (
                    <EditWeapon 
                        equip={weaponPos}
                        clicked={setButtonClicked}
                        />
                ): (
                    <>
                    <div className="flex">
                    {editable? (<section className="flex p-2 self-center w-fit mx-auto mb-5 -mt-12 sm:-mt-20 bg-orange-500 rounded-xl text-xl">
                        <button onClick={() => {setButtonClicked(true)}}>
                            Edit {weaponPos} for {username}
                        </button>
                    </section>):
                    (<></>)}
                </div>

                <div className="flex flex-col md:flex-row"
                    onClick={click}>
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
                </div></>
                )}
            </section>
        </article>
    )
};

export default WeaponModal;
