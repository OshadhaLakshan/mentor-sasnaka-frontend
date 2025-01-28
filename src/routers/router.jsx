import {
    createBrowserRouter,
} from "react-router-dom";
import Home from "../pages/Home";
import App from "../App";
import Error from "../components/Error";
import Register from "../components/Register";
import Login from "../components/Login";
import Chats from "../components/Chats";
import PrivateRoute from "./PrivateRoute";
import Schedule from "../components/Schedule";
import Mentorship from "../components/Mentorship";
import RegisterMentor from "../components/RegisterMentor";
import AdminRoute from "./AdminRoute";
import AdminDashboard from "../components/AdminDashboard";
import AdminLogin from "../components/AdminLogin";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "*",  // Catch-all for 404 errors
                element: <Error errorCode="404" message="Sorry, we couldn't find that page." />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/mentorship",
                element: <Mentorship />
            },
            {
                path: "/register-mentor",
                element: <RegisterMentor />
            },
            {
                path: "/chats",
                element: <PrivateRoute><Chats /></PrivateRoute>
            },
            {
                path: "/schedule",
                element: <PrivateRoute><Schedule /></PrivateRoute>
            },{
                path: "/admin",
                element: <AdminLogin/>
            },
            {
                path: "/dashboard",
                element: <AdminRoute><AdminDashboard/></AdminRoute>,
                children: [
                    {
                        path: "",
                        element: <AdminRoute><AdminDashboard/></AdminRoute>
                    },
                ]
            },
        ],
    },
]);


export default router;