//react
import { useState, useEffect } from "react";

//Redux
import { useSelector } from "react-redux";
import { RootState } from '../store/main';

//types
import { MemberWeaponData } from "../config/types";

//variables
import { weapontypes } from "../config/variables";

//helpers
import { 
    ToTitleCase,
    fetchWeaponsByType, 
    fetchEditWeaponData, 
    fetchEditattachmentsByType,
    checkAuth,
    pushMemberDataUpdate } from "../config/helpers";

// components
import { BooleanToggle } from "./boolean-toggle";

interface EditWeaponProps {
    equip: string;
    clicked: (setButtonClicked:boolean) => void;
}

const EditWeapon = ({equip, clicked}: EditWeaponProps) => {
    const username = useSelector((state: RootState) => state.user.username);
    const [weaponType, setWeaponType] = useState<string>('');
    const [weaponName, setWeaponName] = useState<string>('');
    const [weaponSugList, setWeaponSugList] = useState<string[] | []>([]);
    const [attachmentTypeList, setAttachmentTypeList] = useState<string[] | null>(null);
    const [attachmentLists, setAttachmentLists] = useState<{ [key: string]: string[] }>({});
    const [gunFighter, setGunFighter] = useState<number>(5)
    const [gunslinger, setGunslinger] = useState<boolean>(false)
    const [selectedAttachments, setSelectedAttachments] = useState<{ [key: string]: string }>({});
    const [totalSelected, setTotalSelected] = useState(0);
    const [isauth, setIsAuth] = useState<boolean | null>(null)
    const Auth = checkAuth();

    const triggerGunfighter = () => {
        if (gunFighter === 5) {
            setGunFighter(8)
            setGunslinger(true)
        } else {
            setGunFighter(5);
            setGunslinger(false)
        }
    }

    const submitForm = async () => {
        const auth = await Auth();
        setIsAuth(auth)
        console.log(isauth)
        if (isauth) {
            const response = await pushMemberDataUpdate(username,equip,weaponType,weaponName,selectedAttachments);
            if (response) {
                alert(`${username} ${equip} data updated`)
                setTimeout(() => {
                    document.location.reload()
                }, 700);;
            }
        }
    };

    const selectAttachment = (type: string, value: string) => {
        setSelectedAttachments((prev) => {
          const isReplacing = !!prev[type];
          const updated = { ...prev, [type]: value };
    
          setTotalSelected(Object.keys(updated).length - (isReplacing ? 1 : 0));
          return updated;
        });
      };

    const weapontypeInput = async (weaponType: string) => {
        if (weaponType === '' || !weapontypes.includes(weaponType)) {
            const wname = document.getElementById("Weapon name")
            if (wname) {
                (wname as HTMLInputElement).value = ''
            }
            setWeaponType('')
            setWeaponName('')
            return null

        } else {
            setWeaponType(weaponType);
            setWeaponName('')
            const sug = await fetchWeaponsByType(weaponType);
            setWeaponSugList(sug);
        }
    };

    const weaponNameInput = async (weaponName: string) => {
        setWeaponName(weaponName);
        const weaponData: MemberWeaponData | null = await fetchEditWeaponData(weaponType, weaponName)
        if (weaponData) {
            setAttachmentTypeList(weaponData.attachment_types);
        } else {
            setAttachmentTypeList([]);
        }
    };

    useEffect(() => {
        const fetchAttachments = async () => {
            const updatedLists: { [key: string]: string[] } = {};
            if (attachmentTypeList) {
                for (const aType of attachmentTypeList) {
                    const attList = await fetchEditattachmentsByType(weaponType, weaponName, aType);
                    updatedLists[aType] = attList;
                }
                setAttachmentLists(updatedLists);
            }
        };
    
        if (weaponType && weaponName) fetchAttachments();
    }, [attachmentTypeList, weaponType, weaponName]);

    const weaponEditInputs = [
        {
            name: "Weapon type",
            sugList: weapontypes,
            function: weapontypeInput
        },
        {
            name: "Weapon name",
            sugList: weaponSugList,
            function: weaponNameInput
        }
      ]

      const MaxAttach = totalSelected >= gunFighter;
      const filled = weaponName !== '' && weaponType !== '';

    return (
        <article className="realative flex flex-col">
            <p className="absolute top-2 right-4 text-5xl text-yellow-200 drop-shadow-arrows cursor-pointer" onClick={() => {clicked(false)}}>&laquo;
            </p>
            <h4 className="text-2xl mb-4 text-orange-500">Edit {equip} for {username}</h4>
            <form id="memberWeaponEdit">
                
                <div className="flex flex-col">
                    <div className="flex flex-wrap items-center self-center my-3 justify-between">
                    <BooleanToggle 
                        ifTrue={"Gunfighter"} 
                        height={"h-12"} 
                        width={"w-40"} 
                        IO={gunslinger} 
                        changeMode={triggerGunfighter} />
                    </div>

                    {weaponEditInputs.map((input, index) => (
                        <div 
                            key={`editmain${input.name}${index}`}
                            className="flex flex-wrap items-center justify-between">
                        <label htmlFor={input.name}>{input.name}: </label>
                        <input 
                            id={input.name} 
                            name={input.name}
                            type="text"
                            autoComplete="off" 
                            list={`${input.name}suglist`} 
                            onInput={(e) => {
                                const target = e.target as HTMLInputElement
                                input.function(target.value)
                                }}
                            disabled={input.name === "Weapon name" && !weaponType} />

                        <datalist id={`${input.name}suglist`}>
                            {input.sugList.map((value, index) => (
                                <option key={`typeoption${input.name}${index}`} value={value}></option>
                            ))}
                        </datalist>
                        </div>
                    ))}
                    {attachmentTypeList && weaponName? (
                        <>
                        <h4 className="text-2xl mb-4 text-orange-500">Attachments</h4>
                        {attachmentTypeList.map((aType, index) => (
                            <div 
                                key={`attachmentType${index}`}
                                className="flex flex-wrap items-center justify-between">
                                <p>{ToTitleCase(aType)}</p>
                                <input
                                    type="text"
                                    autoComplete="off"
                                    list={`${aType}suglist`}
                                    name={aType}
                                    onChange={(e) => selectAttachment(aType, e.target.value)}
                                    disabled={MaxAttach && !selectedAttachments[aType]}
                                />
                                <datalist id={`${aType}suglist`}>
                                    {(attachmentLists[aType] || []).map((attachment, index) => (
                                        <option key={`${aType}attach${index}`} value={attachment}></option>
                                    ))}
                                </datalist>
                            </div>
                        ))}
                        </>
                    ): (<></>)}
                    <button 
                        type="button" 
                        onClick={() => {submitForm()}}
                        className="shadow-outer-lower-light rounded-xl mt-3 p-2 bg-gradient-to-b from-gray-400"
                        disabled={!filled}>
                            Submit
                        </button>
                </div>
            </form>
        </article>
    )
}

export default EditWeapon;