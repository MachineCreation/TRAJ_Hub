import { useState } from "react";

// MUI
import Switch from "@mui/material/Switch";

interface ClipInputProps {
    ikey: string;
    ival: string;
    clip_obj: { [key: string]: string | File | null };
    addToClips: (addClip: { [key: string]: string | File | null }) => void;
}

const ClipInput = ({ ikey, addToClips }: ClipInputProps) => {
    const [inputType, setInputType] = useState<boolean>(false);
    const [urlIsValid, setUrlIsValid] = useState<boolean | null>(null);

    const switchInput = () => {
        setInputType(!inputType);
        setUrlIsValid(null); // Reset validation on input type switch
    };

    const validateYouTubeUrl = (inputUrl: string) => {
        const youtubeLiveUrlPattern = /^https:\/\/www\.youtube\.com\/live\/([a-zA-Z0-9_-]+)\?si=[a-zA-Z0-9_-]+$/;
        const youtubeShortUrlPattern = /^https:\/\/youtu\.be\/([a-zA-Z0-9_-]+)\?si=[a-zA-Z0-9_-]+$/;
    
        let match = inputUrl.match(youtubeLiveUrlPattern) || inputUrl.match(youtubeShortUrlPattern);
        if (!match) {
            setUrlIsValid(false);
            addToClips({ [ikey]: null });
        } else {
            const videoId = match[1];
            setUrlIsValid(true);
            addToClips({ [ikey]: `https://www.youtube.com/embed/${videoId}` });
        }
    };

    return (
        <div className="flex">
            <Switch checked={inputType} onChange={switchInput} />
            {inputType ? (
                <div className="flex items-center p-1">
                    <p className="p-1">{ikey}</p>
                    <div className="flex-col">
                        <input
                            type="text"
                            className={`flex ${urlIsValid ? "bg-green-600" : urlIsValid === false ? "bg-red-600" : ""}`}
                            placeholder='Youtube "Shere" link URL'
                            onChange={(e) => validateYouTubeUrl(e.target.value)}
                        />
                        {urlIsValid === false && <p className="text-red-500">Invalid YouTube URL</p>}
                    </div>
                </div>
            ) : (
                <div className="flex items-center p-1">
                    <p className="p-1">{ikey}</p>
                    <input
                        type="file"
                        accept="video/*"
                        className="flex max-w-[12.25rem]"
                        onChange={(e) => {
                            const file = e.target.files ? e.target.files[0] : null;
                            if (file && file.type.startsWith("video/")) {
                                addToClips({ [ikey]: file });
                            }
                            else{
                                alert("Only video files arre supported in this application input")
                                e.target.value = ""
                            }}
                        }
                    />
                </div>
            )}
        </div>
    );
};

export default ClipInput;
