import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Chats from "./Chats.jsx";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = () => {
  const dispatch = useDispatch();

  const allUserData = useSelector((state) => state.userReducer.allUsersData);
  const currentUserData = useSelector(
    (state) => state.userReducer.currentUserData
  );

  const [otherUsers, setOtherUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (currentUserData) {
      let othUsers = [];
      const myUID = currentUserData.uid;
      allUserData &&
        allUserData.forEach((user, index) => {
          if (user.uid !== myUID) {
            othUsers.push(user);
          }
        });

      setOtherUsers(othUsers);
    }
  }, [allUserData, currentUserData]);

  useEffect(() => {
    // console.log("Selected user is: ", selectedUser);

    if (selectedUser) {
      dispatch({
        type: "SET_SELECTED_USER",
        payload: selectedUser,
      });
    }
  }, [selectedUser]);

  return (
    <div className="sidebar">
      {currentUserData && (
        <Navbar
          currentUserName={currentUserData.name}
          currentUserAvatar={currentUserData.avatar.secure_url}
        />
      )}
      {/* <Search /> */}

      {otherUsers &&
        otherUsers.map((user, index) => {
          return (
            <>
              <div key={index} onClick={() => setSelectedUser(user)}>
                <Chats user={user} />
              </div>
            </>
          );
        })}
    </div>
  );
};

export default Sidebar;
