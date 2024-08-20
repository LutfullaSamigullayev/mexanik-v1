import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import LogOut from "./pages/LogOut";
import Login from "./pages/Login";
import Machines from "./pages/Machines";
import Mexanik from "./pages/Mexanik";
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
  ],
  private: [
    {
      path: "/",
      element: <Home />,
      allowedRoles: ["admin"],
      children: [
        {
          path: "/",
          element: <Machines />,
        },
        {
          path: "/machines",
          element: <Machines />,
        },
        {
          path: "/inventory",
          element: <Inventory />,
        },
        {
          path: "/mexanik",
          element: <Mexanik />,
        },
      ],
    },
  ],
};
