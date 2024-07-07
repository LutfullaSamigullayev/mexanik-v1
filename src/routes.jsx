import { Home } from "./pages/Home";
import Login from "./pages/Login";



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