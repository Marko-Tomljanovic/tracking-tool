import React, { useState, useEffect } from "react";
import { TabMenu } from "primereact/tabmenu";
import { TabPanel } from "primereact/tabview";
import { Menubar } from "primereact/menubar";

import { Button } from "primereact/button";

const MainNavigation = ({ children }: any) => {
  useEffect(() => {}, []);

  const [marko, setMarko] = useState([
    {
      label: "Trackers",
      icon: "pi pi-fw pi-clock",
      command: (event: any) => {
        console.log(event);
      },
    },
    {
      label: "History",
      icon: "pi pi-fw pi-compass",
      command: (event: any) => {
        console.log(event);
      },
    },
    {
      label: "LogOut",
      icon: "pi pi-fw pi-power-off",
      command: (event: any) => {
        console.log(event);
      },
    },
  ]);
  const [activeItem, setActiveItem] = useState(null);
  const end = <p>p</p>;
  const onItemClick = (event: any, item: any) => {
    setActiveItem(item);
  };
  return (
    <Menubar
      model={marko}
      onClick={() => onItemClick}
      className="custom-menubar marko"
      start={<h1>Logo</h1>}
    >
      {marko.map((item, index) => (
        <span
          key={index}
          className={`p-menuitem-text ${activeItem === item ? "active" : ""}`}
        >
          {item.label}
        </span>
      ))}
    </Menubar>
  );
};

export default MainNavigation;
