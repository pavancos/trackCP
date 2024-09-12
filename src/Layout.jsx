import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import { Outlet } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BackToTop from './assets/Top.svg';

function Layout() {
    const location = useLocation();
    // console.log('location: ', location);

    const [showButton, setShowButton] = useState(false);
  
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
  
    useEffect(() => {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
  
    // Scroll to top when navigating to a new page
    useEffect(() => {
      window.scrollTo({ top: 0, behavior: "auto" });
    }, [location.pathname]);
  
    const handleScrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  
    const isHomePage = location.pathname === '/';
    return (
        <div>
            {
                !isHomePage &&
                <Navbar />
            }
            {/* Add Dynamic Content Here */}
            <div style={{ minHeight: '100vh' }}>
                <Outlet />
            </div>
            <Toaster />
            {
                !isHomePage &&
                <Footer />
            }
            <button
                onClick={handleScrollToTop}
                className={`back-to-top ${showButton ? "show" : "hide"}`}
            >
                <img src={BackToTop} width={37} alt="Back to Top" />
            </button>
        </div>
    )
}

export default Layout;