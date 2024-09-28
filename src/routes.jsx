import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import LogOut from "./pages/LogOut";
import Login from "./pages/Login";
import Machines from "./pages/Machines";
import Mexanik from "./pages/Mexanik";
import SignUp from "./pages/SignUp";
import Transfer from "./pages/Transfer";
import User from "./pages/User";

export const routes = {
  public: [
    {
      id: 1,
      path: "/login",
      element: <Login />,
    },
    {
      id: 2,
      path: "/signUp",
      element: <SignUp />,
    },
    {
      id: 3,
      path: "/logOut",
      element: <LogOut />,
    },
  ],
  private: [
    {
      id: 4,
      path: "/",
      element: <Home />,
      // allowedRoles: ["admin"],
      // allowedRoles: ["admin", "kat-qala", "shovot", "urganch"],
      children: [
        {
          id: 5,
          path: "/",
          element: <Machines />,
          allowedRoles: ["admin", "kat-qala", "shovot", "urganch"],
        },
        {
          id: 6,
          path: "/machines",
          element: <Machines />,
          allowedRoles: ["admin", "kat-qala", "shovot", "urganch"],
        },
        {
          id: 7,
          path: "/inventory",
          element: <Inventory />,
          allowedRoles: ["admin"],
        },
        {
          id: 8,
          path: "/mexanik",
          element: <Mexanik />,
          allowedRoles: ["admin"],
        },
        {
          id: 9,
          path: "/transfer",
          element: <Transfer />,
          allowedRoles: ["admin"],
        },
      ],
    },
  ],
};
