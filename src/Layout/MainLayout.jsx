import { Outlet } from "react-router-dom";
import Footer from "../Pages/Shared/Footer/Footer";
import NavBar from "../Pages/Shared/NavBar/NavBar";


const MainLayout = () => {
    return (
        <div>
            <NavBar></NavBar>
            <div className='pt-[64px] min-h-[calc(100vh-68px)]'>
                <Outlet />
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;