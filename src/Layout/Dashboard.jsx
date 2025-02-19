import { FaAd, FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaSearch, FaShoppingCart, FaUsers, FaUtensils,FaBoxOpen  } from "react-icons/fa";
import { MdReviews,MdUpcoming } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import useRole from "../Hooks/useRole";

const Dashboard = () => {
    const [role, isLoading]=useRole();
    // const isAdmin=true;
    const isAdmin=false;


    return (
        <div className="flex">
            {/* ----------Dashboard side bar------ */}
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className="menu p-4">
                {
                        role==="admin" && <>
                        {/* ------Admin Routes------ */}
                            <li>
                                <NavLink to="/dashboard/admin-profile">
                                    <FaHome></FaHome>
                                    Admin Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manage-users">
                                    <FaUsers></FaUsers>
                                    Manage Users
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/add-meal">
                                    <FaUtensils></FaUtensils>
                                    Add Meal</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/all-meal-table">
                                    <FaList></FaList>
                                    All Meals
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/all-reviews-table">
                                    <MdReviews />
                                    All Reviews
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/serve-meal-table">
                                    <FaBoxOpen />
                                    Serve Meals
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/upcoming-meal-table">
                                    <MdUpcoming />
                                    Upcoming Meals
                                </NavLink>
                            </li>
                            
                        </>
                }
                { 
                        // !-----User Routes------
                    role==="customer" && <>
                                <li>
                                    <NavLink to="/dashboard/my-profile">
                                        <FaHome></FaHome>
                                        My Profile
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/requested-meal-table">
                                        <FaShoppingCart></FaShoppingCart>
                                        My Requested Meals
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/my-reviews-table">
                                        <FaAd></FaAd>
                                        My Reviews
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/user-payment-history">
                                        <FaCalendar></FaCalendar>
                                        Payment History
                                    </NavLink>
                                </li>
                            </>
                }


                    {/*----- shared NavBar links----- */}
                    <div className="divider"></div>
                    <li>
                        <NavLink to="/">
                            <FaHome></FaHome>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/all-meals">
                            <FaSearch></FaSearch>
                            All Meals
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact">
                            <FaEnvelope></FaEnvelope>
                            Contact
                        </NavLink>
                    </li>
                </ul>
            </div>
            {/*---- Dashboard Content------ */}
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;