import { Link } from 'react-router-dom';
import Logo from '../../../assets/logo.png'
import useAuth from './../../../Hooks/useAuth';
import { useContext } from 'react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import LoadingSpinner from '../../../Components/LoadingSpinner/LoadingSpinner';


const NavBar = () => {
    const { user,loading } = useAuth()
    //? ------OR----user & handleLogout same component theke neya jabe ki??????
    const {handleLogout}=useContext(AuthContext)
    console.log("I am user from Navbar====>>>>>>>>",user?.photoURL)

    
    const navOptions=<>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/all-meals'>All Meals</Link></li>
            <li><Link to='/upcoming-meals'>Upcoming Meals</Link></li>
            <div className="indicator hidden md:block pl-3 pt-2">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="badge badge-xs badge-success indicator-item">+27</span>
            </div>
    </>
    if(loading){
        return <LoadingSpinner></LoadingSpinner>
    }
    return (
        <>
        <div className="navbar bg-black text-white fixed z-30 bg-opacity-30 max-w-[2520px] mx-auto">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h8m-8 6h16"
                        />
                    </svg>
                    </div>
                    <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-slate-300 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    >
                        {navOptions}
                    </ul>
                </div>
                <Link to='/'>
                    <div className='flex justify-center items-center pl-4 gap-4'>
                        <img className='h-[36px]' src={Logo} alt="" />
                        <a className="text-2xl font-extrabold">Aurora Heights</a>
                    </div>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navOptions}
                </ul>
            </div>
            <div className="navbar-end mr-10">
                {
                    user ? 
                    <>
                        <div className="dropdown dropdown-hover">
                            <div tabIndex={0} role="button" className="">
                                <img className='w-12 h-12 rounded-full' src={user?.photoURL} alt="" srcset="" />
                            </div>
                            <ul tabIndex={0} className="dropdown-content menu bg-slate-400 text-white rounded-lg z-10 w-56 p-2 shadow -ml-10">
                                <li className='m-2'>{user?.displayName}</li>
                                <li><Link className='btn bg-slate-400 w-32 border-none text-left pl-0 h-2' to='/dashboard'>Dashboard</Link></li>
                                <li><button className='btn bg-slate-400 w-32 border-none text-left pl-0' onClick={handleLogout}>Log out</button></li>
                            </ul>
                        </div>
                    </> : 
                    <>
                        <Link to='/log-in' className="pr-5 text-xl font-bold">Join Us</Link>
                    </>
                }
            </div>
        </div>
        </>
    );
};

export default NavBar;
