import { Member } from "../config/Members";

import Video from "./ytvid";

interface ClipGalleryProps {
    data: Member;
}

const ClipGallery = ({data}: ClipGalleryProps) => {

    const clip_data = data.WeaponDetails?.clips

    return (
        <article className="relative flex flex-col md:flex-row justify-items-center w-screen max-w-7xl min-h-custom-main h-fit m-auto p-5">
                <div className="relative flex w-full aspect-video flex-wrap justify-items-center m-auto">
                    {Object.entries<string>(clip_data || {}).map(([key, value]:[string, string]) => (
                        value != 'url'? (
                            <div 
                                className="aspect-video h-32 sm:h-80 mx-auto my-4 p-2 border-0.2 border-spacing-6 border-double rounded-2xl border-amber-700 border-spacing"
                                key={`${key}`}>
                                <Video
                                    videoId={value}
                                />
                            </div>
                        ) : null
                    ))}
                </div>
            </article>
    )
};

export default ClipGallery