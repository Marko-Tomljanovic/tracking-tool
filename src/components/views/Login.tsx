import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";

export const Login = () => {
  return (
    <div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "55vh",
          border: "none",
          boxShadow: "none",
        }}
      >
        <Card
          style={{
            width: "400px",
            height: "370px",
            textAlign: "center",
            boxShadow: "none",
            backgroundColor: "#ECEDF5",
          }}
        >
          <div
            style={{
              marginTop: "15px",
              marginBottom: "35px",
              fontSize: "24px",
              fontWeight: "700",
            }}
          >
            Login
          </div>
          <div className="flex flex-wrap justify-content-center align-items-center gap-2">
            <InputText
              id="username"
              style={{ width: "330px" }}
              placeholder="Username"
              type="text"
            />
          </div>
          <br />
          <div className="flex flex-wrap justify-content-center align-items-center gap-2">
            <InputText
              id="password"
              style={{ width: "330px" }}
              placeholder="Password"
              type="password"
            />
          </div>
          <br />
          <br />
          <Button label="Login" style={{ width: "330px" }}></Button>
        </Card>
      </div>
      <div
        style={{
          marginTop: "-80px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          style={{
            width: "400px",
            height: "92px",
            // textAlign: "center",
            boxShadow: "none",
            backgroundColor: "#ECEDF5",
          }}
        >
          <i
            className="pi pi-user-plus"
            style={{
              fontSize: "4rem",
              marginLeft: "20px",
            }}
          ></i>
          <div style={{ textAlign: "center", marginTop: "-70px" }}>
            Need an account? <br />
            <a style={{ color: "#FF5722" }} href={"ads"}>
              Register here
            </a>
            <a></a>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
