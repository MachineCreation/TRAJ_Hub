// React
import { useNavigate } from 'react-router-dom';

// components

// css
import "../css/QuadSquad.css"

const QuadSquad = () => {

    const navigate = useNavigate();

    const navClick = (nav: string) => (_event: React.MouseEvent<HTMLDivElement>) => {
        navigate(nav);
    }

    return(
        <div className="absolute flex justify-items-center w-full h-screen">
            <section className="flex w-full max-w-5xl h-screen m-auto overflow-hidden relative">
                <figure id="avi-t" onClick={navClick("/topsloth")} className='cursor-pointer z-10'></figure>
                <figure id="avi-r" onClick={navClick("/RedPrimeOrigin")} className='cursor-pointer z-10'></figure>
                <figure id="avi-a" onClick={navClick("/araspberryberet")} className='cursor-pointer z-10'></figure>
                <figure id="avi-j" onClick={navClick("/JesusTts")} className='cursor-pointer z-10'></figure>
            </section>
        </div>
    );
};

export default QuadSquad;