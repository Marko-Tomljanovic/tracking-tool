import React, { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, redirect } from "react-router-dom";

import Trackers from "./components/views/Trackers";
import Login from "./components/views/Login";
import History from "./components/views/History";
import Register from "./components/views/Register";
import Layout from "./layout/Layout";
import { useData } from "./components/useData";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function App() {
  const { activeTab }: { activeTab: any } = useData();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        console.log(uid);
        setIsAuthenticated(true);

        // ...
      } else {
        // User is signed out
        // ...
        console.log("User is signed out");
        setIsAuthenticated(false);
        if (!location.includes("register")) {
          navigate("/login");
        }
      }
    });
  }, []);

  useEffect(() => {
    console.log(activeTab);
  }, [activeTab]);
  return (
    <div>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

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
