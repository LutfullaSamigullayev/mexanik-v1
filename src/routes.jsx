import Home from "./pages/Home";
import LogOut from "./pages/LogOut";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";



export const routes = {
    public: [
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: '/signUp',
            element: <SignUp />,
        },
        {
            path: '/logOut',
            element: <LogOut />,
        }
    ],
    private: [
        {
            path: "/",
            element: <Home />,
            allowedRoles: ["admin"],
        },
        
    ]
}