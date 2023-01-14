import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
} from "firebase/firestore";
import { firebaseApp } from "../firebase/firebase";

const db = getFirestore(firebaseApp);

export const getCurrentUserDataFromDb = (user) => async (dispatch) => {
  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    // in case of login  ->  read/update already present doc in 'users' collection with uid=user.uid
    const userData = docSnap.data();

    dispatch({
      type: "GET_CURRENT_USER_DATA",
      payload: userData,
    });
  } else {
    // in case of signup  ->  create new doc in collection 'users'
    // doc.data() will be undefined in this case
    const newUserDoc = {
      uid: user.uid,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      phoneNumber: user.phoneNumber,
    };

    const newChatDoc = {
      messages: [],
    };

    try {
      // creating new document inside 'users' collection
      await setDoc(doc(db, "users", user.uid), newUserDoc);

      // creating new document inside 'chats' collection
      await setDoc(doc(db, "chats", user.uid), newChatDoc);

      console.log("New User Created in DB");

      dispatch({
        type: "GET_CURRENT_USER_DATA",
        payload: user,
      });
    } catch (err) {
      console.log(err);
    }
  }
};

export const getAllUsersData = () => async (dispatch) => {
  const q = query(collection(db, "users"));

  const querySnapshot = await getDocs(q);

  let allUSerData = [];

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    allUSerData.push(doc.data());
  });

  dispatch({
    type: "GET_ALL_USERS_DATA",
    payload: allUSerData,
  });
};

export const getCurrentChats =
  (
    selectedUserUID,
    currentUserUID,
    curentUserAllSentChats,
    selectedUserAllSentChats
  ) =>
  async (dispatch) => {
    // temp. variable to store current chats
    let currentChats = { sent: [], received: [] };

    // filtering sent chats first according to receiver's uid
    curentUserAllSentChats.forEach((chat) => {
      if (chat.receivedBy_UID === selectedUserUID) {
        currentChats.sent.push(chat);
      }
    });

    // filtering selectedUserAllSentChats according to currentUserUID
    selectedUserAllSentChats &&
      selectedUserAllSentChats.forEach((chat) => {
        if (chat.receivedBy_UID === currentUserUID) {
          currentChats.received.push(chat);
        }
      });

    dispatch({
      type: "GET_CURRENT_MESSAGES",
      payload: currentChats,
    });
  };

export const uploadNewChatToDB =
  (newMessage, curentUserAllSentChats) => async (dispatch) => {
    const curentUserAllSentChats_copy = JSON.parse(
      JSON.stringify(curentUserAllSentChats)
    );
    curentUserAllSentChats_copy.push(newMessage);

    let newData = {
      messages: curentUserAllSentChats_copy,
    };

    try {
      await setDoc(doc(db, "chats", newMessage.sendBy_UID), newData);
      console.log("CHAT UPLOADED TO DB");

      dispatch({
        type: "CHANGE_CURRENT_MESSAGE_ON_SENT",
        payload: newMessage,
      });
    } catch (err) {
      console.log(err);
    }
  };
