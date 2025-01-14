//react
import { useNavigate } from "react-router-dom"

export const UploadTutorialVideoLink = () => {
    const nav = useNavigate();

    return (
        <p 
            className="flex flex-col self-center py-5 text-2xl text-center text-cyan-500 cursor-pointer"
            onClick={() => {nav('/upload_from_xbox')}} >
                If you need help getting your files off of your Xbox.
                <span className="text-green-400">
                    click here.
                </span>
        </p>
    );
};

interface LoadingSpinnerProps {
  color?: string;
}

export const LoadingSpinner = ({color = 'text-yellow-500' }: LoadingSpinnerProps) => {

  return (
    <div
      className={`flex w-1/4 aspect-square my-2 items-center self-center border-4 border-collapse border-cyan-500 border-l-transparent border-solid rounded-full animate-spin shadow-orange-inner-large ${color}`}
    >|||||||||||||||||||||||||||</div>
  );
};

