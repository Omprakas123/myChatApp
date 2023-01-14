import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_URI_API_KEY,
  authDomain: process.env.REACT_APP_URI_AUTH_DOMAIN,
  projectId: "chat-7fe8f",
  storageBucket: process.env.REACT_APP_URI_STORAGE_BUCKET,
  messagingSenderId: "684792670713",
  appId: process.env.REACT_APP_URI_APP_ID,
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
