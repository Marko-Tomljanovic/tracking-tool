import React, { useEffect } from "react";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import devotLogo from "../devotLogo";
import { useData } from "../useData";

const MainNavigation = ({ children }: any) => {
  const { activeTab, setActiveTab } = useData();

  return (
    <div>
      <Menubar
        start={devotLogo}
        end={
          <React.Fragment>
            <Button
              label="Trackers"
              icon="pi pi-clock"
              className={`p-button-text button-tab ${
                activeTab === 0 ? "active-tab" : ""
              }`}
              onClick={() => setActiveTab(0)}
            />
            <Button
              label="History"
              icon="pi 
              pi-compass"
              className={`p-button-text button-tab ${
                activeTab === 1 ? "active-tab" : ""
              }`}
              onClick={() => setActiveTab(1)}
            />
            <Button
              label="Logout"
              icon="pi pi-power-off"
              className="p-button-text logout-button"
              onClick={() => setActiveTab(2)}
            />
          </React.Fragment>
        }
      />
    </div>
  );
};

export default MainNavigation;
