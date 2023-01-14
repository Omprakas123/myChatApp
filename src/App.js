import React, { useEffect } from "react";
import Register from "./Pages/Register";
import "./style.scss";
import { BrowserRouter as Routers, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import { useDispatch, useSelector } from "react-redux";
import PasswordReset from "./Pages/PasswordReset";
import { getAllUsersData, getCurrentChats } from "./actions/userActions";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { firebaseApp } from "./firebase/firebase";
import { currentTimeGenerator } from "./utils/dayjs";

const db = getFirestore(firebaseApp);

const App = () => {
  const dispatch = useDispatch();
  const currentUserData = useSelector(
    (state) => state.userReducer.currentUserData
  );
  const selectedUser = useSelector((state) => state.userReducer.selectedUser);
  const curentUserAllSentChats = useSelector(
    (state) => state.userReducer.curentUserAllSentChats
  );

  setInterval(() => {
    const currTime = currentTimeGenerator();
    dispatch({
      type: "SET_CURRENT_TIME",
      payload: currTime,
    });
  }, 1000);

  const unsub = (currentUserData) =>
    onSnapshot(doc(db, "chats", currentUserData.uid), (doc) => {
      const data = doc.data();
      const { messages } = data;

      dispatch({
        type: "GET_ALL_CURRENT_USER_CHATS",
        payload: messages,
      });
    });

  const unsub2 = (selectedUser, curentUserAllSentChats) =>
    onSnapshot(doc(db, "chats", selectedUser.uid), (doc) => {
      const data = doc.data();
      const { messages } = data;

      dispatch(
        getCurrentChats(
          selectedUser.uid,
          currentUserData.uid,
          curentUserAllSentChats,
          messages
        )
      );
    });

  useEffect(() => {
    currentUserData && dispatch(getAllUsersData());

    // fetching all current user chats in real-time
    currentUserData && unsub(currentUserData);

    return () => {
      currentUserData && unsub(currentUserData);
    };
  }, [currentUserData]);

  useEffect(() => {
    // fetching all selected user chats in real-time
    selectedUser && unsub2(selectedUser, curentUserAllSentChats);

    return () => {
      selectedUser && unsub2(selectedUser, curentUserAllSentChats);
    };
  }, [selectedUser]);

  useEffect(() => {
    return () => {
      selectedUser && unsub2(selectedUser, curentUserAllSentChats);
      currentUserData && unsub(currentUserData);
    };
  }, []);

  return (
    <>
      <Routers>
        <Routes>
          {currentUserData ? (
            <>
              <Route path="/" element={<Home />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/password-reset" element={<PasswordReset />} />
            </>
          )}
        </Routes>
      </Routers>
    </>
  );
};

export default App;
