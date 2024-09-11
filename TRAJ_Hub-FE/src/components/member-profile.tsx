import { useState, useEffect } from "react";
import WeaponModal from "./detModal";
import ClipGallery from "./clip_gallery";
import { members, MemberName, Member, WeaponDetails, PerkId, equipId } from "../config/Members";
import ImageWithSkeleton from "./image_skeleton";

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

    async function fetchMemberData(memberName: string): Promise<WeaponDetails | null> {
        try {
            const response = await fetch('https://traj-hub.onrender.com/get-member-profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ member: memberName }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch member profile');
            }
    
            const data = await response.json();
    
            if (data.length === 0) {
                return null;
            }
    
            const profile = data[0];
    
            const transformWeaponDetails = (weaponData: any) => {
                const weaponName = Object.keys(weaponData)[0];
                const weaponInfo = weaponData[weaponName];
    
                return {
                    name: weaponName,
                    stats: weaponInfo.stats,
                    Attachments: Object.keys(weaponInfo.attachments || {}).reduce((acc: any, type: string) => {
                        acc[type] = {
                            name: type,
                            stats: weaponInfo.attachments[type]
                        };
                        return acc;
                    }, {}),
                };
            };
    
            const formattedData: WeaponDetails = {
                hero: profile.hero_image_url,
                "Primary Image": profile.primary_image_url,
                "Primary Weapon Details": transformWeaponDetails(profile['primary-weapon']),
                "Secondary Image": profile.secondary_image_url,
                "Secondary Weapon Details": transformWeaponDetails(profile['secondary-weapon']),
                lethal: profile.lethal,
                tactical: profile.tactical,
                perks: {
                    P1: profile.perk1,
                    P2: profile.perk2,
                    P3: profile.perk3,
                    P4: profile.perk4,
                },
                clips: {
                    C1: profile.C1,
                    C2: profile.C2,
                    C3: profile.C3,
                    C4: profile.C4,
                    C5: profile.C5,
                    C6: profile.C6,
                },
            };
    
            return formattedData;
        } catch (error) {
            console.error('An error occurred:', error);
            return null;
        }
    }
    

    useEffect(() => {
        async function loadMemberData(memberName: MemberName) {
            const memberData = await fetchMemberData(memberName);
            if (memberData) {
                members[memberName].WeaponDetails = memberData;
                setMemberData((prevData) => ({
                    ...prevData,
                    WeaponDetails: memberData,
                }));
            }
        }

        loadMemberData(props.name);
    }, [props.name]);


    const handleClick = (prime: boolean) => () => {
        setIsPrimary(prime);
        setIsModalVisible(true);
    };

    const handleModalClick = () => {
        setIsModalVisible(false);
    };

    const handleEquipClick = (eid: equipId, id?: PerkId) => (event: React.MouseEvent<HTMLElement>) => {
        let equip: { name: string, stats: string } | null = null;

        if (eid === 'perks' && id) {
            const perks = memberData.WeaponDetails?.[eid];
            if (perks && id in perks) {
                equip = perks[id as keyof typeof perks];
            }
        } else {
            equip = memberData.WeaponDetails?.[eid] as { name: string, stats: string };
        }

        if (equip) {
            setDescriptionBox({
                name: equip.name,
                description: equip.stats
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

    // console.log(memberData)

    return (
        <>
            <div
                id="wmodal"
                className={`absolute transition-opacity duration-200 ${isModalVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={handleModalClick}
            >
                <WeaponModal
                    equip={isPrimary}
                    data = {memberData}
                />
            </div>
            <article className="relative flex flex-col md:flex-row justify-items-center w-screen max-w-7xl min-h-custom-main h-fit m-auto p-5">
                <figure className="relative flex w-fit max-w-96 min-h-custom-main ml-auto mt-2 mr-auto mb-auto">
                    <ImageWithSkeleton className="flex max-w-full h-auto"
                     src={`${memberData.WeaponDetails?.hero || ""}/380x740`} 
                     alt="Member Profile image" />
                </figure>
                <article className="flex flex-col m-auto md:w-4/6">
                    <section className="flex flex-col lg:flex-row">
                        <figure id="primary" className="p-2" onClick={handleClick(true)}>
                            <ImageWithSkeleton src={`${memberData.WeaponDetails?.["Primary Image"] || ""}/360x200`} 
                                               alt={`${memberData.WeaponDetails?.["Primary Weapon Details"].name}`} 
                                               className="border border-orange-600 rounded-2xl"/>
                        </figure>
                        <figure id="secondary" className="p-2" onClick={handleClick(false)}>
                            <ImageWithSkeleton src={`${memberData.WeaponDetails?.["Secondary Image"] || ""}/360x200`} 
                                               alt={`${memberData.WeaponDetails?.["Secondary Weapon Details"].name}`} 
                                               className="border border-cyan-400 rounded-2xl"
                                               />
                        </figure>
                    </section>
                    <section className="flex">
                        <figure 
                            className="m-auto p-2 cursor-help"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleEquipClick("tactical")(e)}}>
                            <ImageWithSkeleton 
                            src={`/media/tacticals/${memberData.WeaponDetails?.tactical.name}.png`} 
                            alt="Tactical"
                             />
                        </figure>
                        <figure 
                            className="m-auto p-2 cursor-help"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleEquipClick("lethal")(e)}} >
                            <ImageWithSkeleton 
                            src={`/media/lethals/${memberData.WeaponDetails?.lethal.name}.png`} 
                            alt="Lethal"
                            />
                        </figure>
                    </section>
                    <section className="flex flex-col m-auto sm:flex-row">
                        <figure className="flex p-2">
                            <div
                                id="P1"
                                className="w-1/2 max-w-40 p-2 cursor-help"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleEquipClick("perks","P1")(e);
                                }}>
                                <ImageWithSkeleton
                                    className="w-full max-w-40"
                                    src={`/media/perks/${memberData.WeaponDetails?.perks.P1.name}.webp`}
                                    alt={memberData.WeaponDetails?.perks.P1.name || ''}
                                />
                            </div>
                            <div
                                id="P2"
                                className="w-1/2 max-w-40 p-2 cursor-help"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleEquipClick("perks","P2")(e);
                                }}>
                                <ImageWithSkeleton
                                    className="w-full max-w-40"
                                    src={`/media/perks/${memberData.WeaponDetails?.perks.P2.name}.webp`}
                                    alt={memberData.WeaponDetails?.perks.P2.name || ''}
                                />
                            </div>
                        </figure>
                        <figure className="flex p-2">
                            <div
                                id="P3"
                                className="w-1/2 max-w-40 p-2 cursor-help"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleEquipClick("perks","P3")(e);
                                }}>
                                <ImageWithSkeleton
                                    className="w-full max-w-40"
                                    src={`/media/perks/${memberData.WeaponDetails?.perks.P3.name}.webp`}
                                    alt={memberData.WeaponDetails?.perks.P3.name || ''}
                                />
                            </div>
                            <div
                                id="P4"
                                className="w-1/2 max-w-40 p-2 cursor-help"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleEquipClick("perks","P4")(e);
                                }}>
                                <ImageWithSkeleton
                                    className="w-full max-w-40"
                                    src={`/media/perks/${memberData.WeaponDetails?.perks.P4.name}.webp`}
                                    alt={memberData.WeaponDetails?.perks.P4.name || ''}
                                />
                            </div>
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
            <ClipGallery 
                data = {memberData}
            />
        </>
    );
};

export default Profile;
