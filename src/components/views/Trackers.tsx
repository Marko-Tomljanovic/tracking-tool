import React, { useEffect } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import "moment/locale/hr";
import { useTrackers } from "../../helpers/useTrackers";

export const Trackers = () => {
  const {
    data,
    getTrackers,
    resetAll,
    handlePlay,
    isRunning,
    time,
    setTime,
    handleEdit,
    handleNewTimer,
    handleDelete,
    handleStop,
  } = useTrackers();
  const moment = require("moment");
  moment.locale("hr");

  useEffect(() => {
    getTrackers();
  }, [time]);

  useEffect(() => {
    let intervalId: any;

    if (isRunning.is) {
      intervalId = setInterval(() => {
        setTime((prevTime: any) => prevTime + 1);
      }, 1000);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning.is]);

  const actionTemplate = (rowData: any) => {
    const isSelectedRow = rowData.key === isRunning.dataRow.key;
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
            className={
              isRunning.is && isSelectedRow ? "pi pi-pause" : "pi pi-play"
            }
            style={{
              color: "#FF5722",
              fontSize: "15px",
              cursor: "pointer",
              borderRadius: "50%",
              border: "1.6px solid #FF5722",
              padding: "3.2px",
            }}
            onClick={() => handlePlay(rowData)}
          />
          <i
            className="pi pi-stop-circle"
            style={{
              color: "#5F6B8A",
              fontSize: "20px",
              cursor: "pointer",
            }}
            onClick={() => handleStop(rowData)}
          />

          <i
            className="pi pi-trash"
            style={{
              color: "#5F6B8A",
              fontSize: "20px",
              cursor: "pointer",
            }}
            onClick={() => handleDelete(rowData)}
          />
        </div>
      </React.Fragment>
    );
  };

  const textEditor = (options: any) => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };

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
          style={{
            backgroundColor: "#FF5722",
            border: "none",
            marginRight: "20px",
          }}
          onClick={handleNewTimer}
        />
        <Button
          label="Stop all"
          icon="pi pi-stop-circle"
          style={{ backgroundColor: "#181846", border: "none" }}
          onClick={resetAll}
        />
      </div>
      <br /> <br />
      <div>
        <div className="card">
          <DataTable
            value={data}
            dataKey="id"
            paginator
            rows={5}
            // showGridlines
            tableStyle={{ minWidth: "50rem" }}
            editMode="row"
            onRowEditComplete={handleEdit}
            paginatorClassName="custom-paginator"
          >
            <Column
              field="timeLogged"
              header="Time logged"
              style={{ width: "250px" }}
            ></Column>
            <Column
              field="description"
              header="Description"
              editor={(options) => textEditor(options)}
            ></Column>

            <Column
              rowEditor
              headerStyle={{}}
              bodyStyle={{ textAlign: "right" }}
            ></Column>
            <Column
              header="Action"
              body={actionTemplate}
              style={{ width: "120px" }}
            ></Column>
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default Trackers;
