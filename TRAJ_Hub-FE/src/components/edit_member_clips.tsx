//react
import { useState } from "react";

//components
import ClipInput from "./clip-input";

//types
import { Member } from "../config/Members";

// routes
import { updateMemberClips } from "../config/routes/member_page_routes";

interface editMemberClipsProps {
    data: Member;
    isVis: (setVideoEditorVis: boolean) => void;
    uname: string;
}

const EditMemberClips = ({data, isVis, uname}: editMemberClipsProps) => {

    const clip_data = data.WeaponDetails?.clips
    const [clip_object, setClip_object] = useState<{ [key: string]: string | File | null }>({});
    const updateClips = updateMemberClips

    const addToClips = (newClip: { [key: string]: string | File | null }) => {
        setClip_object((prev) => ({ ...prev, ...newClip }));
    };

    const submitClips = async () => {
        if (Object.keys(clip_object).length !== 0){
            try {
                const response = await updateClips(uname, clip_object)
                if (!response.ok) {
                    alert('An error has occured. Please check the file types you have submitted');
                }
                else {
                    alert('Your changes have been added to the que. Note that depending on file size and trafic your updates my take as long as a day to show up.');
                    document.location.reload();
                };
            }
            catch (error) {
                console.error({"Error": error});
                alert("Form not submitted")
            }
        }
        else {
            alert("Can not subit empty form")
        }
        
    }

    return (
        <article className={`fixed flex w-screen h-screen justify-center items-center p-4 bg-black bg-opacity-55 z-30`}>
            <form className=" relative flex flex-col h-fit px-4 py-12 shadow-outer-green rounded-xl bg-grey justify-center">
                <p 
                    className="absolute top-2 right-4 text-5xl text text-yellow-200 drop-shadow-arrows cursor-pointer"
                    onClick={() => {isVis(false)}}>
                        X
                </p>
                <section className= "flex flex-col lg:flex-row flex-wrap justify-around p-2 max-w-3xl">
                    {Object.entries(clip_data || {}).map(([inputkey, value]) => (
                        <ClipInput
                            ikey={inputkey}
                            ival={value}
                            clip_obj={clip_object}
                            addToClips={addToClips} />
                    ))}
                </section>
                <section className="flex w-full self-center justify-around">
                    <button 
                        type="reset"
                        className="flex  shadow-outer-lower-light rounded-xl p-2 bg-gradient-to-b from-gray-400">
                        Clear
                    </button>
                    <button 
                        className="flex  shadow-outer-lower-light rounded-xl p-2 bg-gradient-to-b from-gray-400"
                        onClick={submitClips}>
                        Submit
                    </button>
                </section>
            </form>
        </article>
    )
}

export default EditMemberClips;