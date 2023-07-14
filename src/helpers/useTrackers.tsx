import { useEffect, useState } from "react";
import "moment/locale/hr";
import { firestore } from "..//firebase.js";
import {
  editRow,
  stopRow,
  updateNewRow,
  deleteRow,
  setStopwatch,
} from "../api/TrackersApi";
import { collection, getDocs, updateDoc, query } from "firebase/firestore";
import { isRunningType } from "../components/types/TrackersTypes.js";

export const useTrackers = () => {
  const [data, setData] = useState<any>();
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState<isRunningType>({
    is: false,
    dataRow: {},
  });
  const moment = require("moment");
  moment.locale("hr");

  useEffect(() => {
    if (isRunning.is) {
      setStopwatch(isRunning.dataRow, time);
    }
  }, [time, isRunning.is]);

  const getTrackers = async () => {
    let tempData: any = [];
    const querySnapshot = await getDocs(collection(firestore, "trackers"));
    querySnapshot.forEach((doc) => {
      const dataRef = doc.data();
      tempData.push({
        timeLogged: dataRef.timeLogged,
        description: dataRef.description,
        date: dataRef.date,
        key: dataRef.key,
      });
    });
    setData(tempData);
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

  const resetAll = async () => {
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

  return {
    data,
    getTrackers,
    resetAll,
    handlePlay,
    isRunning,
    setIsRunning,
    time,
    setTime,
    handleEdit,
    handleNewTimer,
    handleDelete,
    handleStop,
  } as const;
};
