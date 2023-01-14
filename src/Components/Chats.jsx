import React, { useEffect } from "react";

const Chats = ({ user }) => {
  return (
    <>
      <div className="chats">
        <div className="imgf">
          <img src={user.avatar.secure_url} alt="A" />
          <div className="userinfo">
            <span>{user.name}</span>
            <p>hello</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chats;
