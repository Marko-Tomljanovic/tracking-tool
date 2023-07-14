import React, { useState, useRef } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Toast } from "primereact/toast";

export const Register = () => {
  const [email, setEmail] = useState<any>("");
  const [password, setPassword] = useState<any>("");
  const [rePassword, setRePassword] = useState<any>("");
  const auth = getAuth();
  const toast = useRef<Toast>(null);

  const handleSubmit = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        showInfo();
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  };
  const showInfo = () => {
    toast.current?.show({
      severity: "success",
      summary: "Success",
      detail: "Message Content",
      life: 4000,
    });
  };

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
            height: "400px",
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
            Register
          </div>
          <div className="flex flex-wrap justify-content-center align-items-center gap-2">
            <InputText
              id="email"
              value={email}
              style={{ width: "330px" }}
              placeholder="Email"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <br />
          <div className="flex flex-wrap justify-content-center align-items-center gap-2">
            <InputText
              id="password"
              value={password}
              style={{ width: "330px" }}
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <br />
          <div className="flex flex-wrap justify-content-center align-items-center gap-2">
            <InputText
              id="Password"
              value={rePassword}
              style={{ width: "330px" }}
              placeholder="Repeat Password"
              type="password"
              onChange={(e) => setRePassword(e.target.value)}
            />
          </div>

          <br />
          <br />
          <Button
            label="Register"
            style={{ width: "330px" }}
            onClick={handleSubmit}
          ></Button>
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
          <div style={{ textAlign: "right", marginTop: "-70px" }}>
            You already have an account? <br />
            <a style={{ color: "#FF5722" }} href={"/login"}>
              Back to Login
            </a>
            <a></a>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Register;
