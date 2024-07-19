import { useState, useEffect } from "react";
import WeaponModal from "./detModal";
import { members, MemberName, Member, WeaponDetails, PerkId, equipId } from "../config/Members";

// Import JSON data dynamically based on member name
const importWeaponDetails = async (name: MemberName): Promise<WeaponDetails> => {
    switch (name) {
        case "JesusTts":
            return (await import("../config/test.json")).default;
        // Add cases for other members as needed
        default:
            throw new Error("No Weapon Details found for the given member.");
    }
};

// css
interface MemberProps {
    name: MemberName;
}

const Profile = (props: MemberProps) => {
    const member = members[props.name];
    const [memberData, setMemberData] = useState<Member>(member);
    const [isPrimary, setIsPrimary] = useState<boolean>(true);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [descriptionBox, setDescriptionBox] = useState<{ name: string, description: string } | null>(null);
    const [boxPosition, setBoxPosition] = useState<{ top: number, left: number, width: number } | null>(null);

    useEffect(() => {
        const fetchMemberData = async () => {
            try {
                const data = await importWeaponDetails(props.name);
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
    }, [props.name, member.WeaponDetails]);

    const handleClick = (prime: boolean) => () => {
        setIsPrimary(prime);
        setIsModalVisible(true);
    };

    const handleModalClick = () => {
        setIsModalVisible(false);
    };

    const handleEquipClick = (eid: equipId, id?: PerkId) => (event: React.MouseEvent<HTMLImageElement>) => {
        let equip: { name: string, description: string } | null = null;

        if (eid === 'perks' && id) {
            const perks = memberData.WeaponDetails?.[eid];
            if (perks && id in perks) {
                equip = perks[id as keyof typeof perks];
            }
        } else {
            equip = memberData.WeaponDetails?.[eid] as { name: string, description: string };
        }

        if (equip) {
            setDescriptionBox({
                name: equip.name,
                description: equip.description
            });
            const rect = event.currentTarget.getBoundingClientRect();
            setBoxPosition({
                top: rect.bottom + window.scrollY,
                left: rect.left + (rect.width / 2) + window.scrollX,
                width: rect.width
            });
        }
    };

    const handleDocumentClick = () => {
        setDescriptionBox(null);
        setBoxPosition(null);
    };

    useEffect(() => {
        document.addEventListener("click", handleDocumentClick);
        return () => {
            document.removeEventListener("click", handleDocumentClick);
        };
    }, []);

    return (
        <>
            <div
                id="wmodal"
                className={`absolute transition-opacity duration-200 ${isModalVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={handleModalClick}
            >
                <WeaponModal
                    name={props.name}
                    equip={isPrimary}
                />
            </div>
            <article className="relative flex flex-col md:flex-row justify-items-center w-screen max-w-7xl min-h-custom-main h-fit m-auto p-5">
                <figure className="relative flex w-fit max-w-96 min-h-custom-main ml-auto mt-2 mr-auto mb-auto">
                    <img className="flex max-w-full h-auto" src={memberData.WeaponDetails?.hero} alt="Member Profile image" />
                </figure>
                <article className="flex flex-col m-auto md:w-4/6">
                    <section className="flex flex-col lg:flex-row">
                        <figure id="primary" className="p-2" onClick={handleClick(true)}>
                            <img src={memberData.WeaponDetails?.["Primary Image"]} alt=" SVA 545 " />
                        </figure>
                        <figure id="secondary" className="p-2" onClick={handleClick(false)}>
                            <img src={memberData.WeaponDetails?.["Secondary Image"]} alt="Superi 46" />
                        </figure>
                    </section>
                    <section className="flex">
                        <figure className="m-auto p-2 cursor-help">
                            <img 
                            src={`/media/tacticals/${memberData.WeaponDetails?.tactical.name}.png`} 
                            alt="Tactical"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleEquipClick("tactical")(e)}} />
                        </figure>
                        <figure className="m-auto p-2 cursor-help">
                            <img 
                            src={`/media/lethals/${memberData.WeaponDetails?.lethal.name}.png`} 
                            alt="Lethal"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleEquipClick("lethal")(e)}} />
                        </figure>
                    </section>
                    <section className="flex flex-col m-auto sm:flex-row">
                        <figure className="flex p-2">
                            <img
                                id="P1"
                                className="w-1/2 max-w-40 p-2 cursor-help"
                                src={`/media/perks/${memberData.WeaponDetails?.perks.P1.name}.png`}
                                alt={memberData.WeaponDetails?.perks.P1.name}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleEquipClick("perks","P1")(e);
                                }}
                            />
                            <img
                                id="P2"
                                className="w-1/2 max-w-40 p-2 cursor-help"
                                src={`/media/perks/${memberData.WeaponDetails?.perks.P2.name}.png`}
                                alt={memberData.WeaponDetails?.perks.P2.name}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleEquipClick("perks","P2")(e);
                                }}
                            />
                        </figure>
                        <figure className="flex p-2">
                            <img
                                id="P3"
                                className="w-1/2 max-w-40 p-2 cursor-help"
                                src={`/media/perks/${memberData.WeaponDetails?.perks.P3.name}.webp`}
                                alt={memberData.WeaponDetails?.perks.P3.name}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleEquipClick("perks","P3")(e);
                                }}
                            />
                            <img
                                id="P4"
                                className="w-1/2 max-w-40 p-2 cursor-help"
                                src={`/media/perks/${memberData.WeaponDetails?.perks.P4.name}.webp`}
                                alt={memberData.WeaponDetails?.perks.P4.name}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleEquipClick("perks","P4")(e);
                                }}
                            />
                        </figure>
                    </section>
                </article>
            </article>
            {descriptionBox && boxPosition && (
                <div
                    className="absolute bg-grey p-4 mt-4 rounded-2xl shadow-outer-green transform -translate-x-1/2 z-30"
                    style={{ top: boxPosition.top, left: boxPosition.left, width: boxPosition.width }}
                >
                    <h2>{descriptionBox.name}</h2>
                    <p>{descriptionBox.description}</p>
                </div>
            )}
            <article className="relative flex flex-col md:flex-row justify-items-center w-screen max-w-7xl min-h-custom-main h-fit m-auto p-5">
                <p>5 most recent YouTube videos from member</p>
            </article>
        </>
    );
};

export default Profile;
