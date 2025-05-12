import Navbar from "./navbar/Navbar"
import Menu from "./navbar/menu/Menu"
import { useState, useEffect } from "react";
const NotFound = () => {
    const [hamburgerIsOpen, setHamburgerIsOpen] = useState(false);

    const toggleMenu = () => {
        setHamburgerIsOpen(!hamburgerIsOpen);
    };

    useEffect(() => {
        if (hamburgerIsOpen) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, [hamburgerIsOpen]);
    return (
        <>
            <div>
                <Navbar
                    toggleMenu={toggleMenu}
                    hamburgerIsOpen={hamburgerIsOpen}
                />
                {
                    hamburgerIsOpen &&
                    <Menu
                        toggleMenu={toggleMenu}
                    />
                }
            </div>
            <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] font-afacad">
                <h1 className="text-8xl">404</h1>
                <h2 className="tracking-[0.5rem]">Not Found</h2>
                <p className="">"Tracking failed. Please check the path or try again."</p>
            </div>
        </>
    )
}
export default NotFound