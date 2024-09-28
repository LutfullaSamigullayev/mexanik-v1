import {
  GlobalOutlined,
  CheckSquareOutlined,
  ContainerOutlined,
  UserOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useDispatch } from "react-redux";
import { setFilial } from "../redux/slices/machineSlice";
import { Logo } from "./Logo";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const Nav4 = () => {
  const dispatch = useDispatch();

  const location = useLocation();

  // -----------  Localstorage start ------------------

  const location2 = localStorage.getItem("location");

  const role = localStorage.getItem("role");

  // -----------  Localstorage end ------------------

  useEffect(() => {}, []);

  const navLinks = {
    admin: [
      {
        key: "filial",
        label: "Filiallar",
        icon: <GlobalOutlined />,
        children: [
          {
            key: "katqala",
            label: <Link to={"/"}>Kat qal'a</Link>,
            onClick: () => dispatch(setFilial("katqala")),
          },
          {
            key: "shovot",
            label: <Link to={"/"}>Shovot</Link>,
            onClick: () => dispatch(setFilial("shovot")),
          },
          {
            key: "urganch",
            label: <Link to={"/"}>Urganch</Link>,
            onClick: () => dispatch(setFilial("urganch")),
          },
        ],
      },
      {
        key: "transfer",
        icon: <ExportOutlined />,
        label: <Link to={"/transfer"}>Jo'natma</Link>,
        onClick: () => dispatch(setFilial("transfer")),
      },

      {
        key: "inventory",
        label: "Inventarizatsiya",
        icon: <CheckSquareOutlined />,
        children: [
          {
            key: "inventory-katqala",
            label: <Link to={"/inventory"}>Kat qal'a</Link>,
            onClick: () => dispatch(setFilial("katqala")),
          },
          {
            key: "inventory-shovot",
            label: <Link to={"/inventory"}>Shovot</Link>,
            onClick: () => dispatch(setFilial("shovot")),
          },
          {
            key: "inventory-urganch",
            label: <Link to={"/inventory"}>Urganch</Link>,
            onClick: () => dispatch(setFilial("urganch")),
          },
        ],
      },
      // {
      //   type: "divider",
      // },
      {
        key: "mexanik",
        label: "Mexaniklar",
        icon: <ContainerOutlined />,
        children: [
          {
            key: "mexanik-katqala",
            label: <Link to={"/mexanik"}>Kat qal'a</Link>,
            onClick: () => dispatch(setFilial("katqala")),
          },
          {
            key: "mexanik-shovot",
            label: <Link to={"/mexanik"}>Shovot</Link>,
            onClick: () => dispatch(setFilial("shovot")),
          },
          {
            key: "mexanik-urganch",
            label: <Link to={"/mexanik"}>Urganch</Link>,
            onClick: () => dispatch(setFilial("urganch")),
          },
        ],
      },
      {
        key: "user",
        label: "User",
        icon: <UserOutlined />,
        children: [
          {
            key: "user-profile",
            label: <Link to={"/user"}>Profile</Link>,
            // onClick: () => dispatch(setFilial("katqala")),
          },
          {
            key: "user-notification",
            label: <Link to={"/user"}>Notification</Link>,
            // onClick: () => dispatch(setFilial("shovot")),
          },
        ],
      },
      // {
      //   key: "grp",
      //   label: "Uztex Group",
      //   type: "group",
      //   children: [
      //     {
      //       key: "about",
      //       label: "About",
      //     },
      //     {
      //       key: "contact",
      //       label: "Contact",
      //     },
      //   ],
      // },
    ],

    katqala: [
      {
        key: "filial",
        label: "Filiallar",
        icon: <GlobalOutlined />,
        children: [
          {
            key: "katqala",
            label: <Link to={"/"}>Kat qal'a</Link>,
            onClick: () => dispatch(setFilial("katqala")),
          },
        ],
      },

      role == "admin"
        ? {
            key: "transfer",
            icon: <ExportOutlined />,
            label: <Link to={"/transfer"}>Jo'natma</Link>,
            onClick: () => dispatch(setFilial("transfer")),
          }
        : null,

      {
        key: "inventory",
        label: "Inventarizatsiya",
        icon: <CheckSquareOutlined />,
        children: [
          {
            key: "inventory-katqala",
            label: <Link to={"/inventory"}>Kat qal'a</Link>,
            onClick: () => dispatch(setFilial("katqala")),
          },
        ],
      },
      // {
      //   type: "divider",
      // },
      {
        key: "mexanik",
        label: "Mexaniklar",
        icon: <ContainerOutlined />,
        children: [
          {
            key: "mexanik-katqala",
            label: <Link to={"/mexanik"}>Kat qal'a</Link>,
            onClick: () => dispatch(setFilial("katqala")),
          },
        ],
      },
    ],

    shovot: [
      {
        key: "filial",
        label: "Filiallar",
        icon: <GlobalOutlined />,
        children: [
          {
            key: "shovot",
            label: <Link to={"/"}>Shovot</Link>,
            onClick: () => dispatch(setFilial("shovot")),
          },
        ],
      },

      role == "admin"
        ? {
            key: "transfer",
            icon: <ExportOutlined />,
            label: <Link to={"/transfer"}>Jo'natma</Link>,
            onClick: () => dispatch(setFilial("transfer")),
          }
        : null,

      {
        key: "inventory",
        label: "Inventarizatsiya",
        icon: <CheckSquareOutlined />,
        children: [
          {
            key: "inventory-shovot",
            label: <Link to={"/inventory"}>Shovot</Link>,
            onClick: () => dispatch(setFilial("shovot")),
          },
        ],
      },
      // {
      //   type: "divider",
      // },
      {
        key: "mexanik",
        label: "Mexaniklar",
        icon: <ContainerOutlined />,
        children: [
          {
            key: "mexanik-shovot",
            label: <Link to={"/mexanik"}>Shovot</Link>,
            onClick: () => dispatch(setFilial("shovot")),
          },
        ],
      },
    ],

    urganch: [
      {
        key: "filial",
        label: "Filiallar",
        icon: <GlobalOutlined />,
        children: [
          {
            key: "urganch",
            label: <Link to={"/"}>Urganch</Link>,
            onClick: () => dispatch(setFilial("urganch")),
          },
        ],
      },

      role == "admin"
        ? {
            key: "transfer",
            icon: <ExportOutlined />,
            label: <Link to={"/transfer"}>Jo'natma</Link>,
            onClick: () => dispatch(setFilial("transfer")),
          }
        : null,

      {
        key: "inventory",
        label: "Inventarizatsiya",
        icon: <CheckSquareOutlined />,
        children: [
          {
            key: "inventory-urganch",
            label: <Link to={"/inventory"}>Urganch</Link>,
            onClick: () => dispatch(setFilial("urganch")),
          },
        ],
      },
      // {
      //   type: "divider",
      // },
      {
        key: "mexanik",
        label: "Mexaniklar",
        icon: <ContainerOutlined />,
        children: [
          {
            key: "mexanik-urganch",
            label: <Link to={"/mexanik"}>Urganch</Link>,
            onClick: () => dispatch(setFilial("urganch")),
          },
        ],
      },
    ],
  };

  const items = navLinks[location2];

  // const items = [
  //   {
  //     key: "filial",
  //     label: "Filiallar",
  //     icon: <GlobalOutlined />,
  //     children: [
  //       {
  //         key: "kat-qala",
  //         label: <Link to={"/"}>Kat qal'a</Link>,
  //         onClick: () => dispatch(setFilial("kat-qala")),
  //       },
  //       {
  //         key: "shovot",
  //         label: <Link to={"/"}>Shovot</Link>,
  //         onClick: () => dispatch(setFilial("shovot")),
  //       },
  //       {
  //         key: "urganch",
  //         label: <Link to={"/"}>Urganch</Link>,
  //         onClick: () => dispatch(setFilial("urganch")),
  //       },
  //     ],
  //   },

  //   {
  //     key: "inventory",
  //     label: "Inventarizatsiya",
  //     icon: <CheckSquareOutlined />,
  //     children: [
  //       {
  //         key: "inventory-kat-qala",
  //         label: <Link to={"/inventory"}>Kat qal'a</Link>,
  //         onClick: () => dispatch(setFilial("kat-qala")),
  //       },
  //       {
  //         key: "inventory-shovot",
  //         label: <Link to={"/inventory"}>Shovot</Link>,
  //         onClick: () => dispatch(setFilial("shovot")),
  //       },
  //       {
  //         key: "inventory-urganch",
  //         label: <Link to={"/inventory"}>Urganch</Link>,
  //         onClick: () => dispatch(setFilial("urganch")),
  //       },
  //     ],
  //   },
  //   // {
  //   //   type: "divider",
  //   // },
  //   {
  //     key: "mexanik",
  //     label: "Mexaniklar",
  //     icon: <ContainerOutlined />,
  //     children: [
  //       {
  //         key: "mexanik-kat-qala",
  //         label: <Link to={"/mexanik"}>Kat qal'a</Link>,
  //         onClick: () => dispatch(setFilial("kat-qala")),
  //       },
  //       {
  //         key: "mexanik-shovot",
  //         label: <Link to={"/mexanik"}>Shovot</Link>,
  //         onClick: () => dispatch(setFilial("shovot")),
  //       },
  //       {
  //         key: "mexanik-urganch",
  //         label: <Link to={"/mexanik"}>Urganch</Link>,
  //         onClick: () => dispatch(setFilial("urganch")),
  //       },
  //     ],
  //   },
  //   // {
  //   //   key: "grp",
  //   //   label: "Uztex Group",
  //   //   type: "group",
  //   //   children: [
  //   //     {
  //   //       key: "about",
  //   //       label: "About",
  //   //     },
  //   //     {
  //   //       key: "contact",
  //   //       label: "Contact",
  //   //     },
  //   //   ],
  //   // },
  // ];

  const onClick = (e) => {
    // dispatch(setFilial(e.key));
  };
  return (
    <div className="flex flex-col items-center">
      <Logo />
      <Menu
        onClick={onClick}
        style={{
          width: 200,
        }}
        defaultSelectedKeys={[
          `${
            location.pathname.slice(1) + (location.pathname === "/" ? "" : "-")
          }${location2 == "admin" ? "katqala" : location2}`,
        ]}
        defaultOpenKeys={[
          location.pathname === "/" ? "filial" : location.pathname.slice(1),
        ]}
        mode="inline"
        items={items}
      />
    </div>
  );
};
export default Nav4;
