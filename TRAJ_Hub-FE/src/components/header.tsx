// react
import { useNavigate } from "react-router-dom";

// components

// css


const Header = () => {

    const navigate = useNavigate()

    const handleNav = (nav:string) => (_event: React.MouseEvent<HTMLParagraphElement>) => {
        navigate(nav)
    }

    return (
        <header className="relative w-screen h-fit p-8 z-10">
            <p className="text-5xl text-cyan-50 cursor-pointer" onClick={handleNav('/')}><span className="text-yellow-600">&#91;</span>TRAJ<span className="text-yellow-600">&#93;</span> Hub</p>
        </header>
    );
};

export default Header;