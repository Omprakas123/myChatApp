import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Message = ({ messageData }) => {
  const currentTime = useSelector((state) => state.userReducer.currentTime);
  const [relativeTime, setRelativeTime] = useState("");

  useEffect(() => {
    setRelativeTime(moment(messageData.timestamp).from(currentTime));
  }, [currentTime]);

  return (
    <>
      <div
        className={`message ${messageData.msg_type === "sent" ? "owner" : ""}`}
      >
        <div className="messageinfo">
          <img src={messageData.sendBy_avatar} alt="A" />
          <span>{relativeTime}</span>
        </div>
        <div className="messagecontant">
          {messageData.chat.chatImage && (
            <img src={messageData.chat.chatImage.secure_url} alt="IMG" />
          )}

          <p>{messageData.chat.chatText}</p>
        </div>
      </div>
    </>
  );
};

export default Message;
