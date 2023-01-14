import { createReducer } from "@reduxjs/toolkit";

const initialStates = {
  currentTime: "",
  currentUserData: null,
  allUsersData: null,
  curentUserAllSentChats: [],
  currentMessages: null,
  selectedUser: null,
};

const userReducer = createReducer(initialStates, {
  LOGOUT: (state, actions) => {
    state.currentUserData = null;
  },
  SET_CURRENT_TIME: (state, actions) => {
    state.currentTime = actions.payload;
  },
  GET_CURRENT_USER_DATA: (state, actions) => {
    state.currentUserData = actions.payload;
  },

  GET_ALL_USERS_DATA: (state, actions) => {
    state.allUsersData = actions.payload;
  },

  SET_SELECTED_USER: (state, actions) => {
    state.selectedUser = actions.payload;
  },

  GET_ALL_CURRENT_USER_CHATS: (state, actions) => {
    state.curentUserAllSentChats = actions.payload;
  },

  GET_CURRENT_MESSAGES: (state, actions) => {
    state.currentMessages = actions.payload;
  },
  CHANGE_CURRENT_MESSAGE_ON_SENT: (state, actions) => {
    state.currentMessages.sent = [
      ...state.currentMessages.sent,
      actions.payload,
    ];
  },
});

export default userReducer;
