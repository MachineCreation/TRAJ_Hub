

//Redux
import { useSelector } from "react-redux"
import { RootState } from "../store/main"

//helpers
import { checkAuth, fetchEquipment } from "../config/helpers";
import { useState } from "react";

const EditEquipment = () => {
    const username = useSelector((state: RootState) => state.user.username);
    const equipList = ['lethal', 'tactical']
    var sugLists:{[key:string]:string[]} = {}
    const Auth = checkAuth();

    const equipmentData = async () => {
        const [isauth, setIsAuth] = useState<boolean | null>(null);
        const auth = await Auth()
        setIsAuth(auth);
        if (isauth) {
            equipList.forEach(async (name) => {
                const response = await fetchEquipment(name)
                sugLists[name] = response
            })
        }
    }

    return (
        <form
            onSubmit={() => {}}>
            {equipList.map((name, index) => (
                <div key={name}>
                    <h5>{name}</h5>
                    <input 
                        type="text"
                        autoComplete="off"
                        list={`${name}list`}
                        />
                    <datalist id={`${name}list`}>
                        
                    </datalist>
                </div>
            ))}
        </form>
    )
}; export default EditEquipment;