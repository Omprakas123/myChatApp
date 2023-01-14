import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { firebaseApp } from "./firebase";

const auth = getAuth(firebaseApp);

export const signUpHandler = (email, psk) => {
  return createUserWithEmailAndPassword(auth, email, psk);
};
