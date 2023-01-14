import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadNewChatToDB } from "../actions/userActions";
import attach from "../assets/images/attach.png";
import img from "../assets/images/img.png";
import { getCloudImgURI } from "../utils/cludinary";
import { currentTimeGenerator } from "../utils/dayjs";
const Input = () => {
  const dispatch = useDispatch();

  const currentUserData = useSelector(
    (state) => state.userReducer.currentUserData
  );
  const selectedUser = useSelector((state) => state.userReducer.selectedUser);
  const curentUserAllSentChats = useSelector(
    (state) => state.userReducer.curentUserAllSentChats
  );

  const [chatText, setChatText] = useState("");
  const [chatImage, setChatImage] = useState(null);
  const [chatImageURI, setChatImageURI] = useState(null);

  const chatUploader = () => {
    const newMessage = {
      sendBy_UID: currentUserData.uid,
      receivedBy_UID: selectedUser.uid,
      sendBy_avatar: currentUserData.avatar.secure_url,
      receivedBy_avatar: selectedUser.avatar.secure_url,
      chat: {
        chatText,
        chatImage: chatImageURI && chatImageURI,
      },
      timestamp: currentTimeGenerator(),
    };

    // console.log("NEW MESSAGE DATA: ", newMessage);

    // upload to db
    dispatch(uploadNewChatToDB(newMessage, curentUserAllSentChats));

    // clear data
    setChatText("");
    setChatImage(null);
    setChatImageURI(null);
  };

  const sendChatHandler = async (e) => {
    e.preventDefault();

    if (chatImage) {
      try {
        const cloudinaryRes = await getCloudImgURI(chatImage);

        const { asset_id, secure_url } = cloudinaryRes.data;
        setChatImageURI({ asset_id, secure_url });
      } catch (err) {
        console.log(err);
      }
    } else {
      chatText && chatUploader();
    }
  };

  useEffect(() => {
    chatImageURI && chatUploader();
  }, [chatImageURI]);

  return (
    <div className="inputdeg">
      <input
        type="text"
        placeholder="Type something..."
        value={chatText}
        onChange={(e) => setChatText(e.target.value)}
      />
      <div className="send">
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setChatImage(e.target.files[0])}
        />
        <label htmlFor="file">
          <img
            src={img}
            alt=""
            style={{
              cursor: "pointer",
            }}
          />
        </label>
        <button
          onClick={sendChatHandler}
          style={{
            cursor: "pointer",
          }}
        >
          send
        </button>
      </div>
    </div>
  );
};

export default Input;
