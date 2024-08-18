import {
  GlobalOutlined,
  CheckSquareOutlined,
  ContainerOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useDispatch } from "react-redux";
import { setFilial } from "../redux/slices/machineSlice";
import { Logo } from "./Logo";

const Nav4 = () => {
  const dispatch = useDispatch();

  const items = [
    {
      key: "filial",
      label: "Filiallar",
      icon: <GlobalOutlined />,
      children: [
        {
          key: "kat-qala",
          label: "Kat qal'a",
          value: "kat-qala",

          // label: <Link to={"/"}>Hammasi</Link>,
          onClick: () => dispatch(setFilial("kat-qala")),
        },
        {
          key: "shovot",
          label: "Shovot",
          onClick: () => dispatch(setFilial("shovot")),
        },
        {
          key: "urganch",
          label: "Urganch",
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
          label: "Kat qal'a",
          onClick: () => dispatch(setFilial("kat-qala")),
        },
        {
          key: "inventory-shovot",
          label: "Shovot",
          onClick: () => dispatch(setFilial("shovot")),
        },
        {
          key: "inventory-urganch",
          label: "Urganch",
          onClick: () => dispatch(setFilial("urganch")),
        },
      ],
    },
    // {
    //   type: "divider",
    // },
    {
      key: "mehaniklar",
      label: "Mexaniklar",
      icon: <ContainerOutlined />,
      children: [
        {
          key: "mehanik-kat-qala",
          label: "Kat-qala",
        },
        {
          key: "mehanik-shovot",
          label: "Shovot",
        },
        {
          key: "mehanik-urganch",
          label: "Urganch",
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
        defaultSelectedKeys={["kat-qala"]}
        defaultOpenKeys={["filial"]}
        mode="inline"
        items={items}
      />
    </div>
  );
};
export default Nav4;
