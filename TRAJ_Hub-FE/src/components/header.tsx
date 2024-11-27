// react
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

// components
import routes from "../config/routes"

// css

interface HeaderProps {
    name: string
}

const Header = (props: HeaderProps) => {

    const [dropNav, setDropNav] = useState<Boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate()

    const handleNav = (nav:string) => {
        navigate(nav)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setDropNav(false);
          }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);

    return (
        <header className="flex justify-between items-center relative w-screen h-fit p-8 text-cyan-50 z-10">
            <p className="text-5xl cursor-pointer" onClick={() => {handleNav('/')}}><span className="text-yellow-600">&#91;</span>TRAJ<span className="text-yellow-600">&#93;</span> Hub</p>
            <section ref={dropdownRef} className="relative text-lg cursor-pointer" onClick={() => {setDropNav(!dropNav)}} onBlur={() => {setDropNav(false)}}>
                {props.name}
                <ul
                  className={`absolute w-fit h-fit p-5 right-0 top-10 rounded-xl ${dropNav? 'block': 'hidden'} bg-black shadow-orange-inner`}
                  >
                    {routes.map((route, index) => (
                        <li key={`navDrop${index}`}
                            onClick={() => {handleNav(route.path)}}
                            className={`text-right p-1 z-10 cursor-pointer border-indigo-500 ${index === 0 ? 'mb-2 border-b-2': null} ${props.name == route.name ? 'drop-filter': null}`} >
                            {route.name}
                        </li>
                    ))}
                </ul>
            </section>
        </header>
    );
};

export default Header;