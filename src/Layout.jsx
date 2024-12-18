import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import { Outlet } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BackToTop from './assets/Top.svg';
import Menu from './components/navbar/menu/Menu';

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
  const isrewind = location.pathname === '/rewind';


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
    <div
      style={{
        overflow: 'hidden'
      }}
    >
      {
        !isHomePage && !isrewind &&
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
      }
      {/* Add Dynamic Content Here */}

      {
        hamburgerIsOpen == false &&

        <div style={{ minHeight: '100vh' }}>
          <Outlet />
        </div>
      }
      <Toaster />
      {
        !isHomePage && hamburgerIsOpen == false && !isrewind &&
        <Footer />
      }
      {

        !isHomePage &&
        <button
          onClick={handleScrollToTop}
          className={`back-to-top ${showButton ? "show" : "hide"}`}
        >
          <img src={BackToTop} width={37} alt="Back to Top" />
        </button>
      }
    </div>
  )
}

export default Layout;