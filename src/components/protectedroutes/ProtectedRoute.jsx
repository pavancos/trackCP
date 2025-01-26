import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../store/authContext';
import ProtectedNavbar from './protectednavbar/ProtectedNavbar';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Menu from './protectednavbar/menu/Menu';
import Loading from '../Loading';
import BackToTop from '../../assets/Top.svg';
const ProtectedRoutes = () => {
  const location = useLocation();

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

  // Auth Logic
  const { authState } = useAuth();

  if (authState.isAuthenticated === null) {
    return (
      <div className='w-screen h-[calc(100vh-80px)]  flex justify-center items-center'>
        <Loading />
      </div>
    );
  }

  if (!authState.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div
        style={{
          overflow: 'hidden'
        }}
      >
        {
          <div>
            <ProtectedNavbar
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
        {
          hamburgerIsOpen == false &&

          <div style={{ minHeight: '100vh' }}>
            <Outlet />
          </div>
        }
        {
          <button
            onClick={handleScrollToTop}
            className={`back-to-top ${showButton ? "show" : "hide"}`}
          >
            <img src={BackToTop} width={37} alt="Back to Top" />
          </button>
        }
      </div>
    </>
  );
};

export default ProtectedRoutes;

