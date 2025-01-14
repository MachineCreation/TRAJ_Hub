

// small components
import { UploadTutorialVideoLink } from "./small_components";

// helpers
import { updateImage } from "../config/helpers";

//Redux
import { useSelector } from "react-redux";
import { RootState } from '../store/main';
import { useState } from "react";

interface EditImageModalProps {
    equip: string;
    isvisable: (setIsEditImageVisible: boolean) => void;
}

const EditImageModal = ({equip, isvisable}: EditImageModalProps) => {

    const username = useSelector((state: RootState) => state.user.username);
    const [newimage, setNewimage] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState<boolean |null>(null);

    const submitImage = async () => {
         
        if (newimage){
            const response = await updateImage(username,equip,newimage)
            if (await response) {
                setTimeout(() => {document.location.reload()},1000)
            }
        }
    }


    return (
        <article className="fixed flex flex-col justify-items-center items-center w-screen h-screen p-2 sm:p-4 bg-black bg-opacity-70 z-30">
            <section className="relative flex flex-col m-auto p-4 pt-10 sm:p-16 min-w-1/2 h-fit overflow-scroll rounded-2xl shadow-outer-green flex-wrap bg-grey ">
                <p 
                    className="absolute top-2 right-4 text-5xl text-yellow-200 drop-shadow-arrows cursor-pointer"
                    onClick={() => {isvisable(false)}}>X</p>

                <UploadTutorialVideoLink />

                <form className="flex flex-col justify-center">
                    <label 
                        htmlFor="image-input"
                        className="flex mx-auto my-2 text-center">
                            Choose new {equip} image: 
                        </label>
                    <input 
                        id="image-input"
                        required={true}
                        type="file"
                        className="flex w-[70vw] sm:w-auto"
                        onInput={(e) => {
                            const target = e.target as HTMLInputElement;
                            if (target.files && target.files.length > 0) {
                                setIsLoading(true);
                                const selectedFile = target.files[0];
                                setNewimage(selectedFile);
                      
                                const reader = new FileReader();
                                reader.onload = () => {
                                    setIsLoading(true);
                                    console.log("File is ready for preview:", selectedFile.name);
                                };
                                reader.readAsDataURL(selectedFile);
                            }
                        }} />
                        {isLoading != null? (
                            <>
                                {!isLoading? (
                                    <p className="flex justify-center bg-yellow-500 bg-opacity-50 rounded">
                                        Loading...
                                    </p>
                                ): (
                                    <p className="flex justify-center bg-green-500 bg-opacity-50 rounded">
                                        Ready
                                </p>)}
                            </>
                        ): (null)}
                    <button 
                        className=" bg-gradient-to-b p-1 my-3 rounded-xl shadow-outer-lower-light from-gray-400 h-fit"
                        type="button"
                        disabled={!isLoading}
                        onClick={() => {
                            submitImage()
                        }}> Submit
                    </button>
                </form>
            </section>
        </article>
    )
}

export default EditImageModal