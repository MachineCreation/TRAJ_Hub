// react
import { useEffect, useState } from "react";

// components
import YouTubeVideo from "./ytvid";
import ImageWithSkeleton from "./image_skeleton";

// css


const TeamStats = () => {

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
            <aside className="flex order-2 mx-auto xl:mx-1 xl:order-1 flex-col justify-stretch w-11/12 xl:w-1/6 h-fit xl:h-full xl:pt-28 ">
                <figure className=" flex flex-col justify-around xl:grow mx-auto my-1 xl:m-1 h-fit p-3 bg-slate-500 bg-opacity-10 text-cyan-50 ">
                    <h1 className="text-center">Squad favorite Primary <br /> <span className="text-orange-600 mb-2">{sq_p_name}</span></h1>
                        <ImageWithSkeleton 
                            src = {"https://obnwntqubaadmcbmdjjp.supabase.co/storage/v1/object/public/user_weapon_photos/Squad_primary.png"}
                            alt = {`${sq_p_name}`}
                            className="w-auto aspect-video"
                        />
                    </figure>
                <figure className=" flex xl:grow m-1 h-fit p-3 bg-slate-500 bg-opacity-10 text-cyan-50">
                    <YouTubeVideo 
                        videoId={clip1}
                    />
                </figure>
            </aside>
            <article className="flex mx-auto order-1 xl:order-2 xl:self-end w-11/12 h-fit xl:w-1/4 xl:h-1/4">
                <figure className="flex grow mx-auto justify-items-center text-center">
                    <YouTubeVideo 
                        videoId={clip3} 
                    />
                </figure>
            </article>
            <aside className="flex order-3 flex-col w-11/12 mx-auto xl:mx-1 xl:w-1/6 h-fit xl:h-full xl:pt-28">
                <figure className=" flex flex-col justify-around xl:grow mx-auto my-1 xl:m-1 h-fit p-3 bg-slate-500 bg-opacity-10 text-cyan-50">
                    <h1 className="text-center">Squad favorite Secondary <br /> <span className="text-orange-600 mb-2">{sq_s_name}</span></h1>
                        <ImageWithSkeleton 
                            src = {"https://obnwntqubaadmcbmdjjp.supabase.co/storage/v1/object/public/user_weapon_photos/Squad_secondary.png"}
                            alt = {`${sq_s_name}`}
                            className="w-auto aspect-video"
                        />
                    </figure>
                <figure className=" flex xl:grow m-1 h-fit p-3 bg-slate-500 bg-opacity-10 text-cyan-50">
                    <YouTubeVideo
                        videoId={clip2}
                    />
                </figure>
            </aside>
        </section>
    );
};

export default TeamStats;