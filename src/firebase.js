import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCf6IhcBeIr_PcRospMHIMw43wgOrG8kbw",
  authDomain: "cimas-healthathon.firebaseapp.com",
  projectId: "cimas-healthathon",
  storageBucket: "cimas-healthathon.appspot.com",
  messagingSenderId: "999820248423",
  appId: "1:999820248423:web:59526eeac878da418edbc2",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
