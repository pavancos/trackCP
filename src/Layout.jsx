import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import { Outlet } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';

function Layout() {
    const location = useLocation();
    console.log('location: ', location);
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
        </div>
    )
}

export default Layout;