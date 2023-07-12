import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDn5otDTF6ib12yIZHPJixZgitMduU9YiI",
  authDomain: "tracking-tool-f0653.firebaseapp.com",
  projectId: "tracking-tool-f0653",
  storageBucket: "tracking-tool-f0653.appspot.com",
  messagingSenderId: "1071647821101",
  appId: "1:1071647821101:web:446cbce87399d7427917a4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export default firestore;
