

//components
import EditEquipment from "./edit-equipment";
import EditPerksNWildcard from "./edit-perks-n-wildcard";

interface EditEquipModalProps {
    isVis: (setEquipmentEditorVis: boolean) => void;
    mtype: string | null;
    memberLethal: string;
    memberTactical: string;
    memberWildcard: string;
    wcd:string;
    memberPerk1: string;
    p1d: string;
    memberPerk2: string;
    p2d: string;
    memberPerk3: string;
    p3d:string;
}

const EditEPModal = ({isVis, mtype, memberLethal, memberTactical, memberPerk1, memberPerk2, memberPerk3, memberWildcard, wcd, p1d, p2d, p3d}:EditEquipModalProps) => {
    
    return (
        <article className="fixed flex flex-col justify-items-center items-center w-screen h-screen p-2 sm:p-4 bg-black bg-opacity-70 z-30">
            <section className="relative flex flex-col m-auto p-4 pt-10 sm:p-16 min-w-1/2 h-fit overflow-scroll rounded-2xl shadow-outer-green flex-wrap bg-grey ">
            <p 
                    className="absolute top-2 right-4 text-5xl text text-yellow-200 drop-shadow-arrows cursor-pointer"
                    onClick={() => {isVis(false)}}>X</p>
                {mtype? (
                    <>
                        {mtype === 'equip'? (
                            <EditEquipment 
                                memberLethal={memberLethal}
                                memberTactical={memberTactical}
                                />
                        ): (
                            <EditPerksNWildcard 
                                    memberWildcard={memberWildcard}
                                    memberPerk1={memberPerk1}
                                    memberPerk2={memberPerk2}
                                    memberPerk3={memberPerk3} 
                                    wcd={wcd} 
                                    p1d={p1d} 
                                    p2d={p2d} 
                                    p3d={p3d}                            />
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