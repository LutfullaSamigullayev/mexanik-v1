import Home from "./pages/Home";
import LogOut from "./pages/LogOut";
import Login from "./pages/Login";
import Machines from "./pages/Machines";
import SignUp from "./pages/SignUp";

export const routes = {
  public: [
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signUp",
      element: <SignUp />,
    },
    {
      path: "/logOut",
      element: <LogOut />,
    },
    {
      path: "/machines",
      element: <Machines />,
    },
  ],
  private: [
    {
      path: "/",
      element: <Home />,
      allowedRoles: ["admin"],
    },
  ],
};
