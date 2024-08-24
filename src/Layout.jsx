import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import { Outlet } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

function Layout(){
    return(
        <div>
            <Navbar/>
            {/* Add Dynamic Content Here */}
            <div style={{minHeight:'100vh'}}>
                <Outlet/>
            </div>
            <Toaster />
            <Footer/>
        </div>
    )
}

export default Layout;