import { useState, useEffect } from "react";
import WeaponModal from "./detModal";
import { members, MemberName, Member, WeaponDetails } from "../config/Members";

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
                    <img className="flex max-w-full h-auto" src={memberData.WeaponDetails?.["hero"]} alt="Member Profile image" />
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
                        <figure className="m-auto p-2">
                            <img src={`/media/tacticals/${memberData.WeaponDetails?.["tactical"]}.png`} alt="Tactical" />
                        </figure>
                        <figure className="m-auto p-2">
                            <img src={`/media/lethals/${memberData.WeaponDetails?.["lethal"]}.png`} alt="Lethal" />
                        </figure>
                    </section>
                    <section className="flex flex-col m-auto sm:flex-row">
                        <figure className="flex p-2">
                            <img className="w-1/2 max-w-40 p-2" src={`/media/perks/${memberData.WeaponDetails?.["perks"].P1}.png`} alt={memberData.WeaponDetails?.["perks"].P1} />
                            <img className="w-1/2 max-w-40 p-2" src={`/media/perks/${memberData.WeaponDetails?.["perks"].P2}.png`} alt={memberData.WeaponDetails?.["perks"].P2} />
                        </figure>
                        <figure className="flex p-2">
                            <img className="w-1/2 max-w-40 p-2" src={`/media/perks/${memberData.WeaponDetails?.["perks"].P3}.webp`} alt={memberData.WeaponDetails?.["perks"].P3} />
                            <img className="w-1/2 max-w-40 p-2" src={`/media/perks/${memberData.WeaponDetails?.["perks"].P4}.webp`} alt={memberData.WeaponDetails?.["perks"].P4} />
                        </figure>
                    </section>
                </article>
            </article>
            <article className="relative flex flex-col md:flex-row justify-items-center w-screen max-w-7xl min-h-custom-main h-fit m-auto p-5">
                <p>5 most recent YouTube videos from member</p>
            </article>
        </>
    );
};

export default Profile;
