import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC5u2yl81kt2pt0eZSalwkN1b9TZui423I",
  authDomain: "your-mark-85e8f.firebaseapp.com",
  projectId: "your-mark-85e8f",
  storageBucket: "your-mark-85e8f.firebasestorage.app",
  messagingSenderId: "343420659164",
  appId: "1:343420659164:web:e55f94db7b82c559bd9b19",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
auth.useDeviceLanguage();

export { auth };