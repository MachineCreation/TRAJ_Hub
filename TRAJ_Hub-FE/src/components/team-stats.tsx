// react
import { useEffect, useState } from "react";

// components
import YouTubeVideo from "./ytvid";
import ImageWithSkeleton from "./image_skeleton";

// css


const TeamStats = () => {

    const [sq_primary, setSq_primary] = useState<string>('')
    const [sq_secondary, setSq_secondary] = useState<string>('')
    const [sq_p_name, setSq_p_name] = useState<string>('')
    const [sq_s_name, setSq_s_name] = useState<string>('')
    const [clip1, setclip1] = useState<string>('')
    const [clip2, setclip2] = useState<string>('')
    const [clip3, setclip3] = useState<string>('')

    const fetchHome = async () => {
        try {
            const response = await fetch('https://traj-hub.onrender.com/populate-home', {
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch member profile');
            }

            const data = await response.json()

            if (data.length === 0)
                return null

            const home = data[0]

            setSq_primary(home['sq-primary'])
            setSq_secondary(home['sq-secondary'])
            setSq_p_name(home['sq-p-name'])
            setSq_s_name(home['sq-s-name'])
            setclip1(home.clip1)
            setclip2(home.clip2)
            setclip3(home.clip3)

        }
        catch (error) {
            console.error('An error occurred:', error);
            return null;
        }
    }

    useEffect(() => {
        fetchHome()
    },[])

    return (
        <section className="relative xl:absolute flex flex-col xl:flex-row xl:justify-between w-full xl:h-screen m-auto ">
            <aside className="flex order-2 xl:order-1 flex-col justify-stretch w-full xl:w-1/6 h-fit xl:h-full xl:pt-28 ">
                <figure className=" flex xl:grow m-1 h-fit p-3 bg-slate-500 bg-opacity-10 text-cyan-50">
                    Squad favorite Primary <br /> `{sq_p_name}`
                        <ImageWithSkeleton 
                            src = {sq_primary}
                            alt = {`${sq_p_name}`}
                            className=""
                        />
                    </figure>
                <figure className=" flex xl:grow m-1 h-fit p-3 bg-slate-500 bg-opacity-10 text-cyan-50">
                    <YouTubeVideo 
                        videoId={`${clip1}`}
                    />
                </figure>
            </aside>
            <article className="flex order-1 xl:order-2 xl:self-end w-full xl:w-1/4 h-60 xl:h-1/4">
                <figure className="flex grow mr-auto ml-auto justify-items-center text-center">
                    <YouTubeVideo 
                        videoId={`${clip3}`} 
                    />
                </figure>
            </article>
            <aside className="flex order-3 flex-col w-full xl:w-1/6 h-fit xl:h-full xl:pt-28">
                <figure className=" flex xl:grow m-1 h-fit p-3 bg-slate-500 bg-opacity-10 text-cyan-50">
                    Squad favorite secondary <br /> `{sq_s_name}`
                        <ImageWithSkeleton 
                            src = {sq_secondary}
                            alt = {`${sq_s_name}`}
                            className=""
                        />
                    </figure>
                <figure className=" flex xl:grow m-1 h-fit p-3 bg-slate-500 bg-opacity-10 text-cyan-50">
                    <YouTubeVideo
                        videoId={`${clip2}`}
                    />
                </figure>
            </aside>
        </section>
    );
};

export default TeamStats;