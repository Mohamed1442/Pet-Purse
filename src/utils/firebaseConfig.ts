import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCbP_LLSrbBFj3eAIXzwSjQbOBEkFz4Tjk",
  authDomain: "pet-purse.firebaseapp.com",
  databaseURL: "https://pet-purse-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "pet-purse",
  storageBucket: "pet-purse.appspot.com",
  messagingSenderId: "102581423363",
  appId: "1:102581423363:web:38f31937b009abccd86d36"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);