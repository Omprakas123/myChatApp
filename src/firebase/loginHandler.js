import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseApp } from "./firebase";

const auth = getAuth(firebaseApp);

export const emailLoginHandler = (email, psk) => {
  return signInWithEmailAndPassword(auth, email, psk);
};

export const resetPasswordHandler = (email) => {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log("Password reset mail sent");
    })
    .catch((err) => {
      const errorCode = err.code;
      const errorMessage = err.message;

      console.log("errorCode: ", errorCode);
      console.log("errorMessage: ", errorMessage);
    });
};
