import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Message from "./Message";
const Messages = () => {
  const currentMessages = useSelector(
    (state) => state.userReducer.currentMessages
  );

  const [messagesToDisplay, setMessagesToDisplay] = useState(null);

  useEffect(() => {
    if (currentMessages) {
      let allMessages = [];
      currentMessages.sent.forEach((message) => {
        const {
          receivedBy_UID,
          sendBy_UID,
          chat,
          timestamp,
          receivedBy_avatar,
          sendBy_avatar,
        } = message;

        allMessages.push({
          sendBy_avatar,
          receivedBy_avatar,
          receivedBy_UID,
          sendBy_UID,
          chat,
          timestamp,
          msg_type: "sent",
        });
      });

      currentMessages.received.forEach((message) => {
        const {
          receivedBy_UID,
          sendBy_UID,
          chat,
          timestamp,
          receivedBy_avatar,
          sendBy_avatar,
        } = message;
        allMessages.push({
          receivedBy_UID,
          sendBy_avatar,
          receivedBy_avatar,
          sendBy_UID,
          chat,
          timestamp,
          msg_type: "received",
        });
      });

      allMessages.sort((msg1, msg2) => {
        return dayjs(msg1.timestamp).diff(dayjs(msg2.timestamp));
      });

      // console.log("SORTED MSG: ", allMessages);
      setMessagesToDisplay(allMessages);
    }
  }, [currentMessages]);

  const messagesRef = useRef();

  useEffect(() => {
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  });

  return (
    <div className="messages" ref={messagesRef}>
      {messagesToDisplay &&
        messagesToDisplay.map((msg, index) => {
          return (
            <>
              <Message key={index} messageData={msg} />
            </>
          );
        })}
    </div>
  );
};

export default Messages;
