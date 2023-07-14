import React from "react";
import MainNavigation from "../components/navigation/MainNavigation";

const Layout = ({ children }: any) => {
  return (
    <React.Fragment>
      <div>
        <MainNavigation />
      </div>
      <main>{children}</main>
    </React.Fragment>
  );
};

export default Layout;
