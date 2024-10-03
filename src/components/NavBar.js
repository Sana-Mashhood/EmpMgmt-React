import React, { useState } from "react";
import { Menu, Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";

const items = [
  {
    label: <a href="/">Axios Practice</a>,
    key: "axiosPractice",
  },
  {
    label: <a href="/dumdums">Dummy Data</a>,
    key: "dummyData",
  },
  {
    label: "Employee Management",
    key: "EmpMgmt",
    children: [
      {
        label: "Employee List",
        children: [
          {
            label: <a href="/displayData">View Employee Data</a>,
            key: "displaydata",
          },
          {
            label: <a href="/inputForm">Add New Employee</a>,
            key: "newemployee",
          },
        ],
      },
    ],
  },
];

const NavBar = () => {
  const [current, setCurrent] = useState("axiosPractice");
  const [visible, setVisible] = useState(false);

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const closeDrawer = () => {
    setVisible(false);
  };

  return (
    <>
      <div>
        <Button
          className="burger-menu"
          icon={<MenuOutlined />}
          onClick={showDrawer}
        />

        <Drawer
          title="Menu"
          placement="left"
          onClose={closeDrawer}
          visible={visible}
        >
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="vertical"
            items={items}
          />
        </Drawer>

        <div className="navbar-full">
          <div className="full-menu">
            <Menu
              onClick={onClick}
              selectedKeys={[current]}
              mode="horizontal"
              items={items}
            />
          </div>
        </div>
      </div>

    </>
  );
};

export default NavBar;
