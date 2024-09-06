// React
import { useNavigate } from 'react-router-dom';

// css
import"../css/nav.css"

// images

// components

function NavCube() {

    const navigate = useNavigate();

    const navClick = (nav: string) => (_event: React.MouseEvent<HTMLDivElement>) => {
        navigate(nav);
    }

    return (
        <nav className="p-5 m-auto h-svh justify-items-center min-w-70 z-10">
            <div className="cube flex justify-items-center m-auto text-yellow-400">
                <div className="front side flex justify-items-center m-auto ">
                    <div className="face flex m-auto border-2 border-transparent animate-border cursor-pointer" onClick={navClick("/topsloth")}>
                        <p className="flex m-auto ">Top sLoTh</p>
                    </div>
                </div>
                <div className="back side flex justify-items-center">
                    <div className="face flex m-auto border-2 border-transparent animate-border cursor-pointer" onClick={navClick("/RedPrimeOrigin")}>
                        <p className="flex m-auto ">RedPrimeOrigin</p>
                    </div>
                </div>
                <div className="right side flex justify-items-center">
                    <div className="face flex m-auto border-2 border-transparent animate-border cursor-pointer" onClick={navClick("/araspberryberet")}>
                    <p className="flex m-auto ">araspberryberret</p>
                    </div>
                </div>
                <div className="left side flex justify-items-center">
                    <div className="face flex m-auto border-2 border-transparent animate-border cursor-pointer" onClick={navClick("/JesusTts")}>
                        <p className="flex m-auto ">JesusTts</p>
                    </div>
                </div>
                <div className="top side flex justify-items-center ">
                    <div className="face flex m-auto border-2 border-transparent animate-border cursor-pointer">
                        <p className="flex m-auto ">&#91;TRAJ&#93;</p>
                    </div>
                </div>
                <div className="bottom side flex justify-items-center ">
                    <div className="face flex m-auto border-2 border-transparent animate-border cursor-pointer">
                        <p className="flex m-auto ">&#91;TRAJ&#93;</p>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavCube;