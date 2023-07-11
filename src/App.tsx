import React from "react";
import "./App.css";
import { Button } from "primereact/button";
import Layout from "./layout/Layout";

function App() {
  return (
    <div className="App">
      <Layout>
        <div>
          <Button label="marko" />
        </div>
      </Layout>
    </div>
  );
}

export default App;
