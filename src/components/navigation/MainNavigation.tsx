import React, { useRef } from "react";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import devotLogo from "../../assets/devotLogo";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { Toast } from "primereact/toast";

const MainNavigation = ({ children }: any) => {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const toast = useRef<Toast>(null);
  const auth = getAuth();

  const hanndleLogout = () => {
    signOut(auth)
      .then(() => {
        showInfo();
        navigate("/login");
      })
      .catch((error) => {
        alert(error);
      });
  };
  const showInfo = () => {
    toast.current?.show({
      severity: "info",
      summary: "Info",
      detail: "You have been successfully logged out",
      life: 4050,
    });
  };

  const end = !(
    location.includes("login") || location.includes("register")
  ) && (
    <React.Fragment>
      <Button
        label="Trackers"
        icon="pi pi-clock"
        className={`p-button-text button-tab ${
          location.includes("trackers") ? "active-tab" : ""
        }`}
        onClick={() => {
          navigate("trackers");
        }}
      />
      <Button
        label="History"
        icon="pi 
        pi-compass"
        className={`p-button-text button-tab ${
          location.includes("history") ? "active-tab" : ""
        }`}
        onClick={() => {
          navigate("history");
        }}
      />
      <Button
        label="Logout"
        icon="pi pi-power-off"
        className="p-button-text logout-button"
        onClick={() => {
          hanndleLogout();
        }}
      />
    </React.Fragment>
  );
  return (
    <div>
      <Toast ref={toast} position="bottom-left" />
      <Menubar start={devotLogo} end={end} />
    </div>
  );
};

export default MainNavigation;
