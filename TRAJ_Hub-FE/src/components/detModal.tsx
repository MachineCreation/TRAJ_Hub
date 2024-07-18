// react
import { useState, useEffect } from "react";

//components
import { members, MemberName, Member, WeaponDetails, WeaponDetailKey } from "../config/Members";

// Import JSON data dynamically based on member name
const importWeaponDetails = async (name: MemberName): Promise<WeaponDetails> => {
    switch (name) {
        case "JesusTts":
            return (await import("../config/test.json")).default;
        // Add cases for other members as needed
        default:
            throw new Error("No WeaponDetails found for the given member.");
    }
};

//css
interface WeaponModalProps {
    name: MemberName;
    equip: boolean;
}

const WeaponModal = ({ name, equip }: WeaponModalProps) => {
    const member = members[name];
    const [weapon, setWeapon] = useState<WeaponDetailKey>("Primary Weapon Details");
    const [memberData, setMemberData] = useState<Member>(member);

    useEffect(() => {
        if (equip) {
            setWeapon("Primary Weapon Details");
        } else {
            setWeapon("Secondary Weapon Details");
        }
    }, [equip]);

    useEffect(() => {
        const fetchMemberData = async () => {
            try {
                const data = await importWeaponDetails(name);
                setMemberData((prevData) => ({
                    ...prevData,
                    WeaponDetails: data
                }));
            } catch (error) {
                console.error('Failed to fetch member data:', error);
            }
        };

        if (!member.WeaponDetails) {
            fetchMemberData();
        }
    }, [name, member.WeaponDetails]);

    return (
        <article className="absolute flex justify-items-center items-center w-screen h-screen bg-black bg-opacity-70 z-30">
            <section className="relative flex m-auto p-16 rounded-2xl shadow-outer-green flex-wrap bg-grey ">
                {memberData.WeaponDetails && (
                    <>
                    <figure className="flex flex-col">
                        <h1 className="text-sky-400 text-3xl">
                        <strong>{memberData.WeaponDetails?.[weapon]?.name}</strong>
                        </h1>
                        <ul className="relative flex flex-col m-3 p-3 ">
                            {Object.entries(memberData.WeaponDetails[weapon].stats).map(([key, value]) => (
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
                            {Object.entries(memberData.WeaponDetails[weapon].Attachments).map(([_key, attachment]) => (
                                <li
                                key={attachment.id}>
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
