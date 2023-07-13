import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { firestore } from "../../firebase.js";
import {
  collection,
  getDocs,
  updateDoc,
  query,
  where,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import "moment/locale/hr";

interface isRunningType {
  is: boolean;
  dataRow: any;
}

export const Trackers = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState<isRunningType>({
    is: false,
    dataRow: {},
  });
  const [data, setData] = useState<any>();
  const moment = require("moment");
  moment.locale("hr");

  useEffect(() => {
    getTrackers();
  }, [time]);

  useEffect(() => {
    if (isRunning.is) {
      setStopwatch(isRunning.dataRow);
    }
  }, [time, isRunning.is]);

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

  const setStopwatch = async (dataRow: any) => {
    try {
      const q = query(
        collection(firestore, "trackers"),
        where("key", "==", dataRow.key)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        updateDoc(doc.ref, {
          timeLogged: moment.utc(time * 1000).format("HH:mm:ss"),
        });
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const getTrackers = async () => {
    let tempData: any = [];
    const querySnapshot = await getDocs(collection(firestore, "trackers"));
    querySnapshot.forEach((doc) => {
      const dataRef = doc.data();
      tempData.push({
        timeLogged: dataRef.timeLogged,
        description: dataRef.description,
        key: dataRef.key,
      });
    });
    setData(tempData);
  };

  const updateNewRow = async () => {
    try {
      await addDoc(collection(firestore, "trackers"), {
        timeLogged: "00:00:00",
        description: "Bez opisa",
        key: Math.random().toString(36),
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const deleteRow = async (dataRow: any) => {
    try {
      const q = query(
        collection(firestore, "trackers"),
        where("key", "==", dataRow.key)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const stopRow = async (dataRow: any) => {
    console.log("dataRow", dataRow);

    try {
      const q = query(
        collection(firestore, "trackers"),
        where("key", "==", dataRow.key)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        updateDoc(doc.ref, {
          timeLogged: "00:00:00",
        });
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const editRow = async (dataRow: any) => {
    try {
      const q = query(
        collection(firestore, "trackers"),
        where("key", "==", dataRow.data.key)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        updateDoc(doc.ref, {
          description: dataRow.newData.description,
        });
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const resetAll = async (dataRow: any) => {
    try {
      const q = query(collection(firestore, "trackers"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        updateDoc(doc.ref, {
          timeLogged: "00:00:00",
        });
      });
      getTrackers();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handlePlay = (rowData: any) => {
    if (isRunning.is) {
      setIsRunning({ is: false, dataRow: rowData });
    } else {
      setIsRunning({ is: true, dataRow: rowData });
      const duration = moment.duration(rowData.timeLogged);
      const seconds = duration.asSeconds();
      setTime(seconds);
    }
  };

  const handleStop = (rowData: any) => {
    if (isRunning.is) {
      setIsRunning({ is: false, dataRow: rowData });
    }
    stopRow(rowData)
      .then(() => {
        getTrackers();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleEdit = (rowData: any) => {
    editRow(rowData)
      .then(() => {
        getTrackers();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleDelete = (rowData: any) => {
    setTime(0);
    deleteRow(rowData)
      .then(() => {
        getTrackers();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleNewTimer = () => {
    updateNewRow()
      .then(() => {
        getTrackers();
      })
      .catch((e) => {
        console.log(e);
      });
  };

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
              // marginRight: "20px",
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
              bodyStyle={{ textAlign: "center" }}
            ></Column>
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
