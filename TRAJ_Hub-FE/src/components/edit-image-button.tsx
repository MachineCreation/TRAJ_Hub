

interface EditImageButtonProps {
    authForPage: boolean;
    setSlot: (setEditInageModal: string) => void;
    setVis: (setVisable: boolean) => void
    slot: string;
}

const EditImageButton = ({authForPage, setSlot, setVis, slot}: EditImageButtonProps) => {

    return (
        <button className={`absolute w-8 aspect-square bottom-4 right-4 ${authForPage? null: 'hidden' }`}>
            <img src="/media/edit_pencil.png" 
            alt="" 
            className="invert object-contain w-full h-full overflow-visible"
            onClick={() => {setSlot(slot); setVis(true)}}/>
        </button>
    )
};

export default EditImageButton;
