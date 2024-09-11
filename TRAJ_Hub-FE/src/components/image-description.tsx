// React
import { useEffect, useState } from "react";
// Components
import ImageWithSkeleton from "./image_skeleton";

// interface
interface imageProps {
    name: string;
    type: string;
    dataAddress: string;
    imageAddress: string;
}

const ImageDescription = ({name, type, dataAddress, imageAddress}: imageProps) => {
    const [description, setDescription] = useState<{} | null>(null)
    
    useEffect(() => {
        const fetchDescription = async () => {
            try{
                const response = await fetch(`${dataAddress}/get-weapon-data`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        "type": type,
                        "name": name,
                    })
                });

                if (!response.ok) {
                    throw new Error("Error fatching image description")
                };

                const data = await response.json();
                if (data.length !== 0) {
                    setDescription(data)
                }

            }
            catch (error) {
                console.log("error", error)
            };
        };
    },[]);


    return (
        <>
                <section className="relative flex flex-col w-full h-full p-[2vw]">
                    <ImageWithSkeleton
                        src = {imageAddress}
                        alt = {name}
                        className="w-full aspect-video"
                    />
                </section>
        </>
    )
};

export default ImageDescription;