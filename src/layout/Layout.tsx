import React, { useState, useEffect } from "react";
import MainNavigation from "../components/navigation/MainNavigation";

const Layout = ({ children }: any) => {
  //   useEffect(() => {
  //     axiosInstancePortal
  //       .get("/info")
  //       .then((result) => {
  //         setPortalVerzija(result.data.verzija);
  //       })
  //       .catch(() => {});
  //   }, []);

  return (
    <React.Fragment>
      <div>
        <MainNavigation />
        {/* <Sides/>
            <Backdrop/> */}
      </div>
      <main>{children}</main>
    </React.Fragment>
  );
};

export default Layout;
