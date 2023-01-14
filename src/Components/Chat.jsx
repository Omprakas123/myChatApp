import React from "react";
import add from "../assets/images/add.png";
import cam from "../assets/images/cam.png";
import more from "../assets/images/more.png";
import Messages from "./Messages";
import Input from "./Input.jsx";
import { useSelector } from "react-redux";
const Chat = () => {
  const selectedUser = useSelector((state) => state.userReducer.selectedUser);

  return (
    <div className="chat">
      <div className="chatinfo">
        <span>{selectedUser && selectedUser.name}</span>
        <div className="chaticon">
          <img src={cam} alt="" />
          <img src={add} alt="" />
          <img src={more} alt="" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
