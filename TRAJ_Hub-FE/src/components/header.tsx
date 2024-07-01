// react
import { useNavigate } from "react-router-dom";

// components

// css

interface HeaderProps {
    name: string
}

const Header = (props: HeaderProps) => {

    const navigate = useNavigate()

    const handleNav = (nav:string) => (_event: React.MouseEvent<HTMLParagraphElement>) => {
        navigate(nav)
    }

    return (
        <header className="flex justify-between relative w-screen h-fit p-8 text-cyan-50 z-10">
            <p className="text-5xl  cursor-pointer" onClick={handleNav('/')}><span className="text-yellow-600">&#91;</span>TRAJ<span className="text-yellow-600">&#93;</span> Hub</p>
            <p className="text-lg">{props.name}</p>
        </header>
    );
};

export default Header;