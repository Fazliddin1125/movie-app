import { initializeApp, getApp, getApps } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCp_umRyxS-FRBo1qYp5Dk13nCzdPLtN_4",
  authDomain: "bf-movie-app.firebaseapp.com",
  projectId: "bf-movie-app",
  storageBucket: "bf-movie-app.appspot.com",
  messagingSenderId: "62484907599",
  appId: "1:62484907599:web:0954165a38efc4fdb18c3a"
};

const app =  !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore();
const auth = getAuth();
export default app;
export {db, auth};