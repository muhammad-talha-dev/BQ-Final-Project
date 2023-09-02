import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCt9svEXwJttz-bPw1107S_vs6mIiqoOtg",
  authDomain: "bq-final-project-storage.firebaseapp.com",
  projectId: "bq-final-project-storage",
  storageBucket: "bq-final-project-storage.appspot.com",
  messagingSenderId: "632823861212",
  appId: "1:632823861212:web:bfac658951ba4330d0c919"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)