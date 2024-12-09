

//React
import { useEffect } from "react";

//Redux
import { useSelector } from "react-redux"
import { RootState } from "../store/main"

//helpers
import { fetchEquipment, updateEquipment } from "../config/helpers";
import { useState } from "react";

interface EditPerksNWildcardProps {
    memberWildcard: string;
    memberPerk1: string;
    memberPerk2: string;
    memberPerk3: string;
}

const EditPerksNWildcard = (props: EditPerksNWildcardProps) => {
    const username = useSelector((state: RootState) => state.user.username);
    const [sugLists, setSugLists] = useState<{ [key: string]: string[] }>({});
    const [Perk1, setPerk1] = useState<string>(props.memberPerk1);
    const [Perk2, setPerk2] = useState<string>(props.memberPerk2);
    const [Perk3, setPerk3] = useState<string>(props.memberPerk3);
    const [Wildcard, setWildcard] = useState<string>(props.memberWildcard);

    const equipList: {
                etype: string;
                state: string;
                setState: React.Dispatch<React.SetStateAction<string>>;
                initValue: string;
            }[] = [
        {
            etype: 'Perk1',
            state: Perk1,
            setState: setPerk1,
            initValue: props.memberPerk1
        },
        {
            etype: 'Perk2',
            state: Perk2,
            setState: setPerk2,
            initValue: props.memberPerk2
        },
        {
            etype: 'Perk3',
            state: Perk3,
            setState: setPerk3,
            initValue: props.memberPerk3
        },
        {
            etype: 'Wildcard',
            state: Wildcard,
            setState: setWildcard,
            initValue: props.memberWildcard
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
            const updatedSugLists: { [key: string]: string[] } = {};
                for (const name of list) {
                    const response = await fetchEquipment(name);
                    if (response.ok) {
                        updatedSugLists[name] = response.datalist;
                    }
                }
                setSugLists(updatedSugLists);
        }
        equipmentData();
    },[])

    const SubmitEquipment = async () => {
        const response = await updateEquipment(username, lethal, tactical)
        if (response) {
            setTimeout(() => {document.location.reload();}, 400);
        }
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
                        if (sugLists[equipment.etype].includes(target.value)) {
                            equipment.setState(target.value)
                        }
                    }}
                    />
                <datalist id={`${equipment.etype}list`}>
                {(sugLists[equipment.etype] || []).map((ename, index) => (
                        <option 
                            key={`${equipment.etype}-${index}`}
                            value={ename}
                            ></option>
                    ))}
                </datalist>
            </div>
            ))
            }
            <button 
                type="button"
                onClick={() => {SubmitEquipment()}}
                className="shadow-outer-lower-light rounded-xl mt-3 p-2 bg-gradient-to-b from-gray-400">
                Submit
            </button>
        </form>
    )
}; export default EditPerksNWildcard;