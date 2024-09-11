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
    const [description, setDescription] = useState<{}>({})
    
    useEffect(() => {
        if (name && type) {
        const fetchDescription = async () => {
            try{
                const response = await fetch(`${dataAddress}/weapon-data`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify({
                        type: type,
                        name: name,
                    })
                });

                if (!response.ok) {
                    throw new Error("Error fatching image description")
                };

                const data = await response.json();
                if (data.length !== 0) {
                    setDescription(data.stats)
                }

            }
            catch (error) {
                console.log("error", error)
            };
        };
        
            fetchDescription();
        }
    },[name, type]);

    return (
        <>
                <section className="relative justify-items-center flex flex-col w-full mx-auto my-5 h-fit rounded-2xl p-[2vw] bg-black text-gray-700">
                    <ImageWithSkeleton
                        src = {imageAddress}
                        alt = {name}
                        className="w-full aspect-video border border-orange-600 rounded-2xl"
                    />
                    <h1 className="text-center text-[4vw]">{type} -&gt; <span className="text-yellow-600">{name}</span></h1>
                    <ul className="relative flex flex-wrap justify-items-center mx-auto p-3">
                            {Object.entries(description).map(([key, value]) => (
                                <li
                                key={key}
                                className="flex mx-auto my-2 p-3 underline decoration-orange-600 border-y-2 border-cyan-400 rounded-2xl">
                                    <strong className="text-green-500">{key}:</strong> <span className=" text-yellow-500">&nbsp;&nbsp;{value as string}</span>
                                </li>
                            ))}
                        </ul>
                </section>

        </>
    )
};

export default ImageDescription;