import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC1TpQtnLaUBgBV82V5VLmzyiXsyN4X1zw",
  authDomain: "marissa-adrian-wedding.firebaseapp.com",
  databaseURL: "https://marissa-adrian-wedding-default-rtdb.firebaseio.com",
  projectId: "marissa-adrian-wedding",
  storageBucket: "marissa-adrian-wedding.appspot.com",
  messagingSenderId: "133146195923",
  appId: "1:133146195923:web:c086de320050b253f06126",
  measurementId: "G-ZS48B252MS",
};

export const app = initializeApp(firebaseConfig);
