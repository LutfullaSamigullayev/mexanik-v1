import {
  GlobalOutlined,
  CheckSquareOutlined,
  ContainerOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useDispatch } from "react-redux";
import { setFilial } from "../redux/slices/machineSlice";
import { Logo } from "./Logo";
import { Link, useLocation } from "react-router-dom";

const Nav4 = () => {
  const dispatch = useDispatch();

  const location = useLocation();

  const items = [
    {
      key: "filial",
      label: "Filiallar",
      icon: <GlobalOutlined />,
      children: [
        {
          key: "kat-qala",
          label: <Link to={"/"}>Kat qal'a</Link>,
          onClick: () => dispatch(setFilial("kat-qala")),
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
      key: "inventory",
      label: "Inventarizatsiya",
      icon: <CheckSquareOutlined />,
      children: [
        {
          key: "inventory-kat-qala",
          label: <Link to={"/inventory"}>Kat qal'a</Link>,
          onClick: () => dispatch(setFilial("kat-qala")),
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
      key: "mexaniklar",
      label: "Mexaniklar",
      icon: <ContainerOutlined />,
      children: [
        {
          key: "mexanik-kat-qala",
          label: <Link to={"/mexanik"}>Urganch</Link>,
          onClick: () => dispatch(setFilial("kat-qala")),
        },
        {
          key: "mexanik-shovot",
          label: <Link to={"/mexanik"}>Urganch</Link>,
          onClick: () => dispatch(setFilial("shovot")),
        },
        {
          key: "mexanik-urganch",
          label: <Link to={"/mexanik"}>Urganch</Link>,
          onClick: () => dispatch(setFilial("urganch")),
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
  ];

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
          }kat-qala`,
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
