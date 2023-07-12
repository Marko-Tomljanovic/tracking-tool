import React, { useEffect } from "react";
import "./App.css";
import Trackers from "./components/views/Trackers";
import Layout from "./layout/Layout";
import { useData } from "./components/useData";

function App() {
  const { activeTab }: { activeTab: any } = useData();

  useEffect(() => {
    console.log(activeTab);
  }, [activeTab]);
  return (
    <div>
      <Layout>
        <Trackers />
      </Layout>
    </div>
  );
}

export default App;
