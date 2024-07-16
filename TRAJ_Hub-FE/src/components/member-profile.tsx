// react

import { useState,useEffect } from "react";

// components

import { members, MemberName } from "../config/Members"

// css
interface MemberProps {
    name: MemberName;
}

const Profile = (props: MemberProps) => {

    const member = members[props.name]
    const [memberData, setMemberData] = useState<typeof member>(member);

    useEffect(() => {
        const fetchMemberData = async () => {
            try {
                const response = await fetch('https://api.example.com/member/${props}'); // don't forget where your endpoint goes Joe!
                const data: Partial<typeof member> = await response.json();
                setMemberData((prevData) => ({
                    ...prevData,
                    ...data
                }));
            } catch (error) {
                console.error('Failed to fetch member data:', error);
            }
        };

        fetchMemberData();
    }, []);

    return (
        <>
        <article className="relative flex flex-col md:flex-row justify-items-center  w-screen max-w-7xl min-h-custom-main h-fit m-auto p-5 ">
            <figure className=" relative flex w-fit max-w-96 min-h-custom-main ml-auto mt-2 mr-auto mb-auto ">
                <img className="flex max-w-full h-auto" src={memberData.hero} alt="" />
            </figure>
            <article className="flex flex-col m-auto md:w-4/6">
                <section className="flex flex-col lg:flex-row">
                    <figure className="p-2">
                        <img  src={memberData.primary} alt=" SVA 545 " />
                    </figure>
                    <figure className="p-2">
                        <img  src={memberData.secondary} alt="Superi 46" />
                    </figure>
                </section>
                <section className="flex">
                    <figure className="m-auto p-2">
                        <img src={memberData.tactical} alt="" />
                    </figure>
                    <figure className="m-auto p-2">
                        <img src={memberData.lethal} alt="" />
                    </figure>
                </section>
                <section className="flex flex-col m-auto sm:flex-row">
                    <figure className="flex p-2">
                        <img className="w-1/2 max-w-40 p-2" src={memberData.perk1} alt=" SVA 545 " />
                        <img className="w-1/2 max-w-40 p-2" src={memberData.perk2} alt="" />
                    </figure>
                    <figure className="flex p-2">
                        <img className="w-1/2 max-w-40 p-2" src={memberData.perk3} alt=" SVA 545 " />
                        <img className="w-1/2 max-w-40 p-2" src={memberData.perk4} alt="" />
                    </figure>
                </section>
            </article>
        </article>
        <article className="relative flex flex-col md:flex-row justify-items-center  w-screen max-w-7xl min-h-custom-main h-fit m-auto p-5 ">
            <p>5 most recent YouTube videos from member</p>
        </article>
        </>
    );
};

export default Profile;