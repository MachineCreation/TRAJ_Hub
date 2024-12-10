

//React
import { useEffect } from "react";

//Redux
import { useSelector } from "react-redux"
import { RootState } from "../store/main"

//helpers
import { fetchperks, fetchWildcards, updatePerks, updateWildcard } from "../config/helpers";
import { useState } from "react";

//types
import { PerksType } from "../config/types";

interface EditPerksNWildcardProps {
    memberWildcard: string;
    wcd: string;
    memberPerk1: string;
    p1d: string;
    memberPerk2: string;
    p2d: string;
    memberPerk3: string;
    p3d:string;
}

const EditPerksNWildcard = (props: EditPerksNWildcardProps) => {
    const username = useSelector((state: RootState) => state.user.username);
    const [sugLists, setSugLists] = useState<PerksType>({});
    const [Perk1, setPerk1] = useState<string>(props.memberPerk1);
    const [perk1Description, setperk1Description] = useState<string>(props.p1d);
    const [Perk2, setPerk2] = useState<string>(props.memberPerk2);
    const [perk2Description, setperk2Description] = useState<string>(props.p2d);
    const [Perk3, setPerk3] = useState<string>(props.memberPerk3);
    const [perk3Description, setperk3Description] = useState<string>(props.p3d);
    const [Wildcard, setWildcard] = useState<string>(props.memberWildcard);
    const [WildcardDescription, setWildcardDescription] = useState<string>(props.wcd)

    const equipList: {
                label:string;
                etype: string;
                state: string;
                setState: React.Dispatch<React.SetStateAction<string>>;
                setDescrip: React.Dispatch<React.SetStateAction<string>>
                initValue: string;
            }[] = [
        {
            label: 'Perk1',
            etype: 'perks1',
            state: Perk1,
            setState: setPerk1,
            setDescrip: setperk1Description,
            initValue: props.memberPerk1
        },
        {
            etype: 'perks2',
            state: Perk2,
            setState: setPerk2,
            setDescrip: setperk2Description,
            initValue: props.memberPerk2,
            label: "Perk2"
        },
        {
            etype: 'perks3',
            state: Perk3,
            setState: setPerk3,
            setDescrip: setperk3Description,
            initValue: props.memberPerk3,
            label: "Perk3"
        },
        {
            etype: 'Wildcard',
            state: Wildcard,
            setState: setWildcard,
            setDescrip: setWildcardDescription,
            initValue: props.memberWildcard,
            label: "Wildcard"
        },
    ]

    const [list, setlist] = useState<string[]>([]);

    const populateList = () => {
        const newList = equipList.map((eq) => eq.etype)
        setlist(newList);
    }

    if(list.length <= 0) {
            populateList()
        }

    useEffect(() => {
        const equipmentData = async () => {
            const updatedSugLists: PerksType  = {};
                    const response = await fetchperks();
                    if (response.ok && response.datalist) {
                        Object.entries(response.datalist).forEach(([key,value]) => {
                                updatedSugLists[key] = value
                        })
                    }
                    const result = await fetchWildcards();
                    if (result.ok && result.datalist) {
                        updatedSugLists["Wildcard"] = Object.entries(result.datalist).flatMap(([_key, value]) => value)
                        
                    }
                setSugLists(updatedSugLists);
        }
        equipmentData();
    },[])

    const SubmitEquip = async () => {
        await updatePerks(username, Perk1, perk1Description, Perk2, perk2Description, Perk3, perk3Description);
        await updateWildcard(username,Wildcard,WildcardDescription);
        setTimeout(() => {
            document.location.reload()
        }, 750);
    }

    return (
        <form
            className="flex flex-col">
            {equipList.map((equipment) => (
                <div key={equipment.etype}>
                <h5>{equipment.etype}</h5>
                <input 
                    type="text"
                    autoComplete="off"
                    list={`${equipment.etype}list`}
                    value={equipment.state}
                    onBlur={(e) => {e.target.value = equipment.state}}
                    onClick={(e) => {
                        const target = e.target as HTMLInputElement;
                        target.value = ''
                    }}
                    onInput={(e) => {
                        const target = e.target as HTMLInputElement;
                        if (sugLists[equipment.etype]) {
                            sugLists[equipment.etype].some((perk) => {
                                if (perk.name === target.value){
                                    equipment.setState(target.value)
                                    equipment.setDescrip(perk.description)
                            }
                        });
                        }
                    }}
                    />
                <datalist id={`${equipment.etype}list`}>
                {(sugLists[equipment.etype] || []).map((ename, index) => (
                        <option 
                            key={`${equipment.etype}-${index}`}
                            value={ename.name}
                            ></option>
                    ))}
                </datalist>
            </div>
            ))
            }
            <button 
                type="button"
                onClick={() => {SubmitEquip()}}
                className="shadow-outer-lower-light rounded-xl mt-3 p-2 bg-gradient-to-b from-gray-400">
                Submit
            </button>
        </form>
    )
}; export default EditPerksNWildcard;