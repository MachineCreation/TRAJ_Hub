

interface EditEquipModalProps {
    isVis: (setEquipmentEditorVis: boolean) => void;
    mtype: string | null;
}

const EditEPModal = ({isVis, mtype}:EditEquipModalProps) => {
    
    return (
        <article className="fixed flex flex-col justify-items-center items-center w-screen h-screen p-2 sm:p-4 bg-black bg-opacity-70 z-30">
            <section className="relative flex flex-col m-auto p-4 pt-10 sm:p-16 min-w-1/2 h-fit overflow-scroll rounded-2xl shadow-outer-green flex-wrap bg-grey ">
            <p 
                    className="absolute top-2 right-4 text-5xl text text-yellow-200 drop-shadow-arrows cursor-pointer"
                    onClick={() => {isVis(false)}}>X</p>
                {mtype? (
                    <>
                        {mtype === 'equip'? (
                            <>equip</>
                        ): (
                            <>perks</>
                        )}
                    </>
                ): (
                    <>null</>
                )}
            </section>
        </article>
    )
};

export default EditEPModal