//react
import { useState, useEffect } from "react";

//Redux
import { useSelector } from "react-redux";
import { RootState } from '../store/main';

//types
import { MemberName } from "../config/Members"

interface EditWeaponProps {
    setdata: (membername: MemberName) => Promise<void>;
    equip: string
}

const EditWeapon = ({setdata, equip}: EditWeaponProps) => {
    const username = useSelector((state: RootState) => state.user.username);


    return (
        <>
            <p>edit {equip} for {username}</p>
            <button type="submit" onClick={() => {setdata(username)}}>Submit</button>
        </>
    )
}

export default EditWeapon;