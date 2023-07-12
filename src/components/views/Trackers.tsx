import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import firestore from "../../firebase.js";
import { collection, getDocs } from "firebase/firestore";
import "moment/locale/hr";
import { runInContext } from "vm";

export const Trackers = () => {
  useEffect(() => {
    getTrackers();
  }, []);

  const moment = require("moment"); // require
  moment.locale("hr");

  const getTrackers = async () => {
    let tempData: any = [];
    const querySnapshot = await getDocs(collection(firestore, "trackers"));
    querySnapshot.forEach((doc) => {
      const dataRef = doc.data();
      tempData.push({
        timeLogged: dataRef.timeLogged,
        description: dataRef.description,
      });
    });
    setData(tempData);
  };

  const actionTemplate = (rowData: any) => {
    return (
      <React.Fragment>
        <div
          style={{
            display: "flex",
            gap: "20px",
            float: "right",
          }}
        >
          <i
            className="pi pi-pause"
            style={{
              color: "#FF5722",
              fontSize: "14px",
              cursor: "pointer",
              borderRadius: "50%",
              border: "2px solid #FF5722",
              padding: "3.2px",
            }}
            onClick={() => console.log(rowData)}
          />
          <i
            className="pi pi-stop-circle"
            style={{
              color: "#5F6B8A",
              fontSize: "20px",
              cursor: "pointer",
            }}
            onClick={() => console.log(rowData)}
          />
          <i
            className="pi pi-pencil"
            style={{
              color: "#5F6B8A",
              fontSize: "20px",
              cursor: "pointer",
            }}
            onClick={() => console.log(rowData)}
          />
          <i
            className="pi pi-trash"
            style={{
              color: "#5F6B8A",
              fontSize: "20px",
              cursor: "pointer",
              marginRight: "20px",
            }}
            onClick={() => console.log(rowData)}
          />
        </div>
      </React.Fragment>
    );
  };
  const [data, setData] = useState<any>();

  return (
    <div style={{ margin: "5% 10% 0%" }}>
      <br />
      <div
        style={{
          fontSize: "24px",
          fontWeight: "700",
        }}
      >
        <p> Today ({moment().format("L")})</p>
      </div>
      <br /> <br />
      <div
        style={{
          textAlign: "right",
        }}
      >
        <Button
          label="Start new timer"
          icon="pi pi-stopwatch"
          style={{ backgroundColor: "#FF5722", border: "none" }}
        />
        <Button
          label="Stop all"
          icon="pi pi-stop-circle"
          style={{ backgroundColor: "#181846", border: "none" }}
        />
      </div>
      <br /> <br />
      <div>
        <div className="card">
          <DataTable
            value={data}
            paginator
            rows={5}
            tableStyle={{ minWidth: "50rem" }}
            paginatorClassName="custom-paginator"
          >
            <Column
              field="timeLogged"
              header="Time logged"
              style={{ width: "250px" }}
            ></Column>
            <Column field="description" header="Description"></Column>
            <Column
              header="Action"
              body={actionTemplate}
              style={{ width: "200px" }}
            ></Column>
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default Trackers;
