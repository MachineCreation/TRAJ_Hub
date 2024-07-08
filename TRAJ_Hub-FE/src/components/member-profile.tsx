// react

// components

import Primary from "../images/profile/primary.png"
import Secondary from "../images/profile/secondary.png"
import hero from "../images/profile/hero.png"
import Tactical from '../images/profile/smaoke_grenade.png'
import Lethal from '../images/profile/Sticky grenade.png'
import P1 from '../images/profile/Irradiated_p_1.png'
import P2 from '../images/profile/Mountaineer_p_2.png'
import P3 from '../images/profile/Tempered_s_3.png'
import P4 from '../images/profile/combat_scou_p_4.png'

// css
// interface ProfileProps {
//     name: string
// }

const Profile = () => {
    return (
        <>
        <article className="relative flex flex-col md:flex-row justify-items-center  w-screen max-w-7xl min-h-custom-main h-fit m-auto p-5 ">
            <figure className=" relative flex w-fit max-w-96 min-h-custom-main ml-auto mt-2 mr-auto mb-auto ">
                <img className="flex max-w-full h-auto" src={hero} alt="" />
            </figure>
            <article className="flex flex-col m-auto md:w-4/6">
                <section className="flex flex-col lg:flex-row">
                    <figure className="p-2">
                        <img  src={Primary} alt=" SVA 545 " />
                    </figure>
                    <figure className="p-2">
                        <img  src={Secondary} alt="Superi 46" />
                    </figure>
                </section>
                <section className="flex">
                    <figure className="m-auto p-2">
                        <img src={Tactical} alt="" />
                    </figure>
                    <figure className="m-auto p-2">
                        <img src={Lethal} alt="" />
                    </figure>
                </section>
                <section className="flex flex-col m-auto sm:flex-row">
                    <figure className="flex p-2">
                        <img className="w-1/2 max-w-40 p-2" src={P1} alt=" SVA 545 " />
                        <img className="w-1/2 max-w-40 p-2" src={P2} alt="" />
                    </figure>
                    <figure className="flex p-2">
                        <img className="w-1/2 max-w-40 p-2" src={P3} alt=" SVA 545 " />
                        <img className="w-1/2 max-w-40 p-2" src={P4} alt="" />
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