import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export const Trackers = () => {
  const actionTemplate = (rowData: any) => {
    return (
      <React.Fragment>
        <Button
          icon=""
          className="p-button-rounded p-button-success"
          onClick={() => console.log(rowData)}
        />
        <Button
          icon=""
          className="p-button-rounded p-button-danger"
          onClick={() => console.log(rowData)}
        />
      </React.Fragment>
    );
  };
  const [data, setData] = useState([
    {
      timeLogged: "453456453",
      description: "Marko dad ad ada d",
      action: "asd",
    },
  ]);
  return (
    <div style={{ margin: "0% 10%" }}>
      <br />
      <div
        style={{
          fontSize: "24px",
          fontFamily: "Nunito Sans",
          fontWeight: "700",
        }}
      >
        <p> Today (1.1.2011)</p>
      </div>
      <br /> <br />
      <div
        style={{
          textAlign: "right",
        }}
      >
        <Button label="Submit" icon="pi pi-check" />
        <Button label="Submit" icon="pi pi-check" />
      </div>
      <br /> <br />
      <div>
        <div className="card">
          <DataTable value={data} tableStyle={{ minWidth: "50rem" }}>
            <Column field="timeLogged" header="Time logged"></Column>
            <Column field="description" header="Description"></Column>
            <Column header="Action" body={actionTemplate}></Column>
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default Trackers;
