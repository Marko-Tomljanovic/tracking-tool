import React, { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Trackers from "./components/views/Trackers";
import Login from "./components/views/Login";
import History from "./components/views/History";
import Register from "./components/views/Register";
import Layout from "./layout/Layout";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setIsAuthenticated(true);
        if (location.includes("login") || location.includes("register")) {
          navigate("/trackers");
        }
      } else {
        console.log("User is signed out");
        setIsAuthenticated(false);
        if (!location.includes("register") || location === "/") {
          navigate("/login");
        }
      }
    });
  }, []);

  return (
    <div>
      <Layout>
        <Routes>
          {!isAuthenticated ? (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </>
          ) : null}
          {isAuthenticated ? (
            <>
              <Route path="/trackers" element={<Trackers />} />
              <Route path="/history" element={<History />} />
            </>
          ) : null}
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
