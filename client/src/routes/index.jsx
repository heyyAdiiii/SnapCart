import {createBrowserRouter} from 'react-router-dom'
import App from "../App";
import Home from '../pages/Home';
import SearchPage from '../pages/SearchPage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import OTPVerification from '../pages/OTPVerification';
import ResetPassword from '../pages/ResetPassword';
import UserMenuMobile from '../pages/UserMenuMobile';
import Dashboard from '../layouts/Dashboard';
import Profile from '../pages/Profile';
import MyOrders from '../pages/MyOrders';
import Address from '../pages/Address';

const router = createBrowserRouter([
    {
        path:'/',
        element: <App/>,
        children:[
            {
                path:'',
                element:<Home/>
            },{
                path:"search",
                element: <SearchPage/>
            },{
                path:"login",
                element: <Login/>
            },{
                path:"register",
                element:<Register/>
            },{
                path:"forgot-password",
                element:<ForgotPassword/>
            },{
                path: "verification-otp",
                element:<OTPVerification/>
            },{
                path:"reset-password",
                element:<ResetPassword/>
            },{
                path:"user",
                element:<UserMenuMobile/>
            },{
                path:"dashboard",
                element:<Dashboard/>,
                children:[
                    {
                        path : "profile",
                        element: <Profile/>
                    },
                    {
                        path : "myorders",
                        element: <MyOrders/>
                    },
                    {
                        path : "address",
                        element: <Address/>
                    },
        ]
            }
        ]
    }
])

export default router;