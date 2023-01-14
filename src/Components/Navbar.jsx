import React from "react";
import { useDispatch } from "react-redux";

const Navbar = ({ currentUserName, currentUserAvatar }) => {
  const dispatch = useDispatch();

  return (
    <div className="navbar">
      <span className="logo">Online Chat</span>
      <div className="user">
        <img src={currentUserAvatar} alt="Me" />
        <span>{currentUserName}</span>
        <button
          onClick={(e) => {
            dispatch({
              type: "LOGOUT",
            });
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
