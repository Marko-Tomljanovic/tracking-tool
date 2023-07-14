import { firestore } from "..//firebase.js";
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

const moment = require("moment");
moment.locale("hr");
export const editRow = async (dataRow: any) => {
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

export const stopRow = async (dataRow: any) => {
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

export const deleteRow = async (dataRow: any) => {
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

export const updateNewRow = async () => {
  try {
    await addDoc(collection(firestore, "trackers"), {
      timeLogged: "00:00:00",
      description: "Bez opisa",
      date: moment().format("L"),
      key: Math.random().toString(36),
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const setStopwatch = async (dataRow: any, time: any) => {
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
