import {createBrowserRouter} from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import AllMeals from "../Pages/AllMeals/AllMeals";
import UpcomingMeals from "../Pages/UpcomingMeals/UpcomingMeals";
import MealDetails from "../Pages/MealDetails/MealDetails";
import Dashboard from "../Layout/Dashboard";
import AdminProfile from './../Pages/DashboardAdminPages/AdminProfile';
import ManageUsers from './../Pages/DashboardAdminPages/ManageUsers';
import AddMeal from './../Pages/DashboardAdminPages/AddMeal';
import AdminAllReviews from './../Pages/DashboardAdminPages/AdminAllReviews';
import ManageMeals from './../Pages/DashboardAdminPages/ManageMeals';
import ServeMeals from './../Pages/DashboardAdminPages/ServeMeals';
import AdminUpcomingMeals from './../Pages/DashboardAdminPages/AdminUpcomingMeals';
import MyProfile from './../Pages/DashboardUserPages/MyProfile';
import MyRequestedMeals from './../Pages/DashboardUserPages/MyRequestedMeals';
import MyReviews from './../Pages/DashboardUserPages/MyReviews';
import PaymentHistory from './../Pages/DashboardUserPages/PaymentHistory';
import SignUp from "../Authentication/SignUp";
import Login from "../AuthProvider/Login";
import Checkout from "../Components/Checkout/Checkout";
import Contact from "../Pages/Contact/Contact";
import AdminReviewDetails from "../Pages/DashboardAdminPages/AdminReviewDetails";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import AdminRoute from "../PrivateRoute/AdminRoute";
import CustomerRoute from "../PrivateRoute/CustomerRoute";





const routes = createBrowserRouter([
    // !====MainLayout Layout=====
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children:[
            {
                path:'/',
                element:<Home></Home>,
            },
            {
                path:'/all-meals',
                element:<AllMeals></AllMeals>,
            },
            {
                path:'/meal/:id',
                element:<PrivateRoute>
                        <MealDetails></MealDetails>
                    </PrivateRoute>,
            },
            {
                path:'/upcoming-meals',
                element:<PrivateRoute>
                        <UpcomingMeals></UpcomingMeals>
                    </PrivateRoute>,
            },
            {
                path:'/checkout/:package_name',
                element:<PrivateRoute>
                        <Checkout></Checkout>
                    </PrivateRoute>,
            },
            {
                path:'/contact',
                element:<Contact></Contact>,
            },
        ],
    },
    // !====login Layout=====
    { path: '/log-in', 
        element:<Login></Login>
    },

    //! ====signup Layout=====
    {   path: '/register', 
        element:<SignUp></SignUp>
    },

    // !====dashboard Layout=====
    {
        path:'/dashboard',
        element:<PrivateRoute>
                <Dashboard></Dashboard>
            </PrivateRoute>,
        children: [
            // !====Normal user routes======
            {
                index: true, //===By default ,show this component====
                path:"/dashboard/my-profile",
                element:<PrivateRoute>
                    <MyProfile></MyProfile>
                </PrivateRoute>,
            },
            {
                path:"/dashboard/requested-meal-table",
                element:<PrivateRoute>
                    <CustomerRoute>
                        <MyRequestedMeals></MyRequestedMeals>
                    </CustomerRoute>
                </PrivateRoute>,
            },
            {
                path:"/dashboard/my-reviews-table",
                element:<PrivateRoute>
                    <MyReviews></MyReviews>
                </PrivateRoute>
            },
            {
                path:"/dashboard/user-payment-history",
                element: <PrivateRoute>
                    <PaymentHistory></PaymentHistory>
                </PrivateRoute>
            },
            {
                path:"/dashboard/review-details/:id",
                element: <PrivateRoute>
                    <CustomerRoute>
                        <AdminReviewDetails></AdminReviewDetails>
                    </CustomerRoute>
                </PrivateRoute>
            },

            //!==== admin only routes=====
            {
                index: true, //===By default ,show this component====
                path:"/dashboard/admin-profile",
                element:<PrivateRoute>
                    <AdminProfile></AdminProfile>
                </PrivateRoute>
            },
            {
                path:"/dashboard/manage-users",
                element:<PrivateRoute>
                    <AdminRoute>
                        <ManageUsers></ManageUsers>
                    </AdminRoute>
                </PrivateRoute>
            },
            {
                path:"/dashboard/add-meal",
                element:<PrivateRoute>
                    <AdminRoute>
                        <AddMeal></AddMeal>
                    </AdminRoute>
                </PrivateRoute>
            },
            {
                path:"/dashboard/all-meal-table",
                element:<PrivateRoute>
                    <AdminRoute>
                        <ManageMeals></ManageMeals>
                    </AdminRoute>
                </PrivateRoute>,
            },
            {
                path: "/dashboard/all-reviews-table",
                element:<PrivateRoute>
                    <AdminRoute>
                        <AdminAllReviews></AdminAllReviews>
                    </AdminRoute>
                </PrivateRoute>
            },
            {
                path:"/dashboard/serve-meal-table",
                element:<PrivateRoute>
                    <AdminRoute>
                        <ServeMeals></ServeMeals>
                    </AdminRoute>
                </PrivateRoute>
            },
            {
                path:"/dashboard/upcoming-meal-table",
                element:<PrivateRoute>
                    <AdminUpcomingMeals></AdminUpcomingMeals>
                </PrivateRoute>
            },,
        ]
    }



]);
export default routes;