// import { Logo } from "./Logo";
import React, { useState } from "react";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  CheckSquareOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import { Icons } from "./icons";
import { Logo } from "./Logo";
const items = [
  {
    key: "1",
    icon: (
      <div className="anticon anticon-desktop ant-menu-item-icon">
        <Icons.machine />
      </div>
    ),

    label: "Mashinalar",
  },
  {
    key: "2",
    icon: <CheckSquareOutlined />,
    label: "Inventarizatsiya",
  },
  {
    key: "3",
    icon: <ContainerOutlined />,
    label: "Mexaniklar",
  },
  // {
  //   key: "sub1",
  //   label: "Navigation One",
  //   icon: <MailOutlined />,
  //   children: [
  //     {
  //       key: "5",
  //       label: "Option 5",
  //     },
  //     {
  //       key: "6",
  //       label: "Option 6",
  //     },
  //     {
  //       key: "7",
  //       label: "Option 7",
  //     },
  //     {
  //       key: "8",
  //       label: "Option 8",
  //     },
  //   ],
  // },
  // {
  //   key: "sub2",
  //   label: "Navigation Two",
  //   icon: <AppstoreOutlined />,
  //   children: [
  //     {
  //       key: "9",
  //       label: "Option 9",
  //     },
  //     {
  //       key: "10",
  //       label: "Option 10",
  //     },
  //     {
  //       key: "sub3",
  //       label: "Submenu",
  //       children: [
  //         {
  //           key: "11",
  //           label: "Option 11",
  //         },
  //         {
  //           key: "12",
  //           label: "Option 12",
  //         },
  //       ],
  //     },
  //   ],
  // },
];

export function Nav() {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const [menuWidth, setMenuWidth] = useState(256);
  return (
    <div
      style={{
        width: 256,
      }}
    >
      <div className="flex items-center justify-center relative border-b min-h-[77px]">
        <Logo />
        <Button
          type="primary"
          onClick={toggleCollapsed}
          style={{
            marginBottom: 16,
          }}
          className="absolute right-0 top-2/4 -translate-y-1/2 translate-x-1/2"
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
      </div>
      <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="light"
        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
  );
}
