// React
import { useState, useEffect } from "react";

// components
import WeaponModal from "./weaponModal";
import ClipGallery from "./clip_gallery";
import ImageWithSkeleton from "./image_skeleton";
import EditImageModal from "./edit-image-modal";
import EditImageButton from "./edit-image-button";
import EditEPModal from "./edit-equip-modal";

//MUI
import { Skeleton } from "@mui/material";

//Redux
import { useSelector } from "react-redux";
import { RootState } from '../store/main';

//types
import { members, MemberName, Member, WeaponDetails, PerkId, equipId } from "../config/Members";

// variables
import { backend_url } from "../config/variables";
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
    const username = useSelector((state: RootState) => state.user.username);
    const [authForPage, setauthforpage] = useState<boolean> (false);
    const [isEditImageVisible, setIsEditImageVisible] = useState<boolean>(false)
    const [slot, setSlot] = useState<string>('')
    const [primaryImageLoaded, setPrimaryImageLoaded] = useState<boolean>(false);
    const primaryImage = new Image();
    const [primaryImageSrc, setprimaryImageSrc] = useState<string | null>(null)
    const [secondaryImageLoaded, setsecondaryImageLoaded] = useState<boolean>(false);
    const secondaryImage = new Image();
    const [secondaryImageSrc, setsecondaryImageSrc] = useState<string | null>(null)
    const [heroImageLoaded, setheroImageLoaded] = useState<boolean>(false);
    const heroImage = new Image();
    const [heroImageSrc, setHeroImageSrc] = useState<string | null>(null);
    const [equipEditorVis, setEquipEditorVis] = useState<boolean>(false);
    const[editType, setEditType] =useState<string | null>(null)

    if (memberData.WeaponDetails) {
        heroImage.src = memberData.WeaponDetails?.hero
        primaryImage.src = memberData.WeaponDetails?.["Primary Image"]
        heroImage.onload = () => {
            setHeroImageSrc(heroImage.src)
            setheroImageLoaded(true)
        }
        primaryImage.onload = () => {
            setprimaryImageSrc(primaryImage.src)
            setPrimaryImageLoaded(true)
        }
    }

    if (memberData.WeaponDetails) {
        secondaryImage.src = memberData.WeaponDetails?.["Secondary Image"]
        secondaryImage.onload = () => {
            setsecondaryImageSrc(secondaryImage.src)
            setsecondaryImageLoaded(true)
        }
        secondaryImage.onerror = () => {
            console.log('failed to loasd image')
        }
    }

    async function fetchMemberData(memberName: string): Promise<WeaponDetails | null> {
        try {
            const response = await fetch(`${backend_url}/get-member-profile`, {
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
    };

    async function loadMemberData(memberName: MemberName) {
        const memberData = await fetchMemberData(memberName);
        if (memberData) {
            members[memberName].WeaponDetails = memberData;
            setMemberData((prevData) => ({
                ...prevData,
                WeaponDetails: memberData,
            }));
        }
    };

    useEffect(() => {
        loadMemberData(props.name);
    },[])

    const handleWeaponClick = (prime: boolean) => () => {
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

    useEffect(() => {
        const handleDocumentClick = () => {
          setDescriptionBox(null);
          setBoxPosition(null);
        };
      
        document.addEventListener("click", handleDocumentClick);
      
        return () => {
          document.removeEventListener("click", handleDocumentClick);
        };
      }, []);

      useEffect(() => {
        if (username === props.name) {
            setauthforpage(true);
        };
      }, []);

    return (
        <>
            <div
                id="wmodal"
                className={`absolute transition-opacity duration-200 ${isModalVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            >
                <WeaponModal
                    equip={isPrimary}
                    data = {memberData}
                    editable = {authForPage}
                    click = {handleModalClick}
                />
            </div>
            <div
                id="imagemodal"
                className={`absolute transition-opacity duration-200 ${isEditImageVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                
                <EditImageModal 
                    equip={slot}
                    isvisable={setIsEditImageVisible}
                    />
            </div>
            <div
                id="imagemodal"
                className={`absolute transition-opacity duration-200 ${equipEditorVis ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                
                <EditEPModal 
                    isVis={setEquipEditorVis}
                    mtype={editType}
                    memberTactical={memberData.WeaponDetails?.tactical.name || ''}
                    memberLethal={memberData.WeaponDetails?.lethal.name || ''}
                    memberWildcard={memberData.WeaponDetails?.perks.P4.name || ''}
                    memberPerk1={memberData.WeaponDetails?.perks.P1.name || ''}
                    memberPerk2={memberData.WeaponDetails?.perks.P2.name || ''}
                    memberPerk3={memberData.WeaponDetails?.perks.P3.name || ''} 
                    wcd={memberData.WeaponDetails?.perks.P4.stats || ''} 
                    p1d={memberData.WeaponDetails?.perks.P1.stats || ''} 
                    p2d={memberData.WeaponDetails?.perks.P2.stats || ''} 
                    p3d={memberData.WeaponDetails?.perks.P3.stats || ''}
                    />

            </div>
            <article className="relative flex flex-col md:flex-row justify-items-center w-screen max-w-7xl min-h-custom-main h-fit m-auto p-5">
                <figure className="relative flex w-fit max-w-96 min-h-custom-main ml-auto mt-2 mr-auto mb-auto">
                    {heroImageLoaded? (
                        <>
                        <img className="flex max-w-full h-auto"
                            src={heroImageSrc || ''}
                            alt="Member Profile image" />

                        <EditImageButton 
                            authForPage={authForPage}
                            setSlot={setSlot}
                            setVis = {setIsEditImageVisible}
                            slot="hero"
                        />
                     </>
                    ):(
                        <Skeleton 
                        variant="rounded"
                        animation="wave"
                        width={380}
                        height={740}
                        sx={{ bgcolor: 'rgb(50,50,50)' }}
                        />
                    )}
                </figure>
                <article className="flex flex-col m-auto md:w-4/6">
                    <section className="flex flex-col lg:flex-row">
                        <figure 
                            id="primary" 
                            className="relative p-2" >
                            
                            {primaryImageLoaded? (
                                <>
                                    <img src={primaryImageSrc || ''} 
                                    alt={`${memberData.WeaponDetails?.["Primary Weapon Details"].name}`} 
                                    className="border border-orange-600 rounded-2xl"
                                    onClick={handleWeaponClick(true)}/>

                                    <EditImageButton 
                                    authForPage={authForPage}
                                    setSlot={setSlot}
                                    setVis = {setIsEditImageVisible}
                                    slot="primary"/>
                                </>
                            ): (
                                <Skeleton 
                                    variant="rounded"
                                    animation="wave"
                                    width={360}
                                    height={200}
                                    sx={{ bgcolor: 'rgb(50,50,50)' }}
                                    />
                            )}
                        </figure>
                        <figure id="secondary" className="relative p-2" >
                            {secondaryImageLoaded? (
                                <>
                                    <img src={secondaryImageSrc|| ""} 
                                    alt={`${memberData.WeaponDetails?.["Secondary Weapon Details"].name}`} 
                                    className="border border-cyan-400 rounded-2xl"
                                    onClick={handleWeaponClick(false)}/>

                                    <EditImageButton 
                                    authForPage={authForPage}
                                    setSlot={setSlot}
                                    setVis = {setIsEditImageVisible}
                                    slot="secondary"
                                />
                                </>
                            ): (
                                <Skeleton 
                                    variant="rounded"
                                    animation="wave"
                                    width={360}
                                    height={200}
                                    sx={{ bgcolor: 'rgb(50,50,50)' }}
                                    />
                            )}
                        </figure>
                    </section>
                    <section className="relative flex justify-around">
                        <figure 
                            className="p-2 cursor-help"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleEquipClick("tactical")(e)}}>
                            <ImageWithSkeleton 
                            src={`/media/tacticals/${memberData.WeaponDetails?.tactical.name}.png`} 
                            alt="Tactical"
                             />
                        </figure>
                        <figure 
                            className="p-2 cursor-help"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleEquipClick("lethal")(e)}} >
                            <ImageWithSkeleton 
                            src={`/media/lethals/${memberData.WeaponDetails?.lethal.name}.png`} 
                            alt="Lethal"
                            />
                        </figure>
                        {authForPage? (
                        <button 
                            className="absolute flex w-full bottom-0 bg-cyan-300 rounded bg-opacity-30 justify-center"
                            onClick={() => {
                                setEditType('equip');
                                setEquipEditorVis(true);
                            }}
                            >
                            Edit equipment
                        </button>
                    ): (null)}
                    </section>

                    <section className="relative flex flex-col sm:flex-row justify-center">
                        <figure className="flex p-2 justify-around">
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
                        <figure className="flex p-2 justify-around">
                            <div
                                id="P3"
                                className="w-1/2 max-w-40 p-2 cursor-help"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleEquipClick("perks","P3")(e);
                                }}>
                                <ImageWithSkeleton
                                    className="max-w-40"
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
                        {authForPage? (
                        <button 
                            className="absolute flex w-full bottom-0 bg-cyan-300 rounded bg-opacity-30 justify-center"
                            onClick={() => {
                                setEditType('perks');
                                setEquipEditorVis(true);
                            }}
                            >
                            Edit perks
                        </button>
                    ): (null)}
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
            {/* <ClipGallery 
                data = {memberData}
            /> */}
        </>
    );
};

export default Profile;
