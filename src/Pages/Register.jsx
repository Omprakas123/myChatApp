import React, { useEffect, useState } from "react";
import photo from "../assets/images/my.jpg";
import { Link } from "react-router-dom";
import { signUpHandler } from "../firebase/signupHandler";
import { getCloudImgURI } from "../utils/cludinary";
import { useDispatch } from "react-redux";
import { getCurrentUserDataFromDb } from "../actions/userActions";

const Register = () => {
  const dispatch = useDispatch();

  const [err, seterr] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [emailInp, setEmailInp] = useState("");
  const [psk, setPsk] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarCloudinaryUri, setAvatarCloudinaryUri] = useState(null);

  useEffect(() => {
    const finalUploader = async () => {
      try {
        const signUpRes = await signUpHandler(emailInp, psk);
        // console.log("signUpRes: ", signUpRes);

        const { uid, email, phoneNumber } = signUpRes.user;

        const user = {
          uid: uid,
          name: displayName,
          email: email,
          avatar: avatarCloudinaryUri,
          phoneNumber: phoneNumber ? phoneNumber : "",
        };

        // console.log("Final User Sata: ", user);

        dispatch(getCurrentUserDataFromDb(user));

        seterr(false);
        setDisplayName(null);
        setEmailInp(null);
        setPsk(null);
        setAvatar(null);
        setAvatarCloudinaryUri(null);
      } catch (err) {
        console.log(err);
        seterr(true);
      }
    };

    avatarCloudinaryUri && finalUploader();
  }, [avatarCloudinaryUri]);

  const handle = async (e) => {
    e.preventDefault();

    if (avatar) {
      try {
        const cloudRes = await getCloudImgURI(avatar);
        // console.log("cloudRes:", cloudRes);

        const { asset_id, secure_url } = cloudRes.data;

        setAvatarCloudinaryUri({ asset_id, secure_url });
      } catch (err) {
        console.log("Cloudinary Upload failed with error: ", err);
        seterr(true);
      }
    }
  };

  return (
    <>
      <div className="formContainer">
        <div className="formWrapper">
          <span className="logo">Welcome to The New Chat App</span>
          <span className="title">Create an Account</span>

          <div className="ckr">
            <img src={photo} alt="" />
            <label htmlFor="pg">
              <i className="fa-solid fa-camera"></i>{" "}
            </label>
          </div>

          <form onSubmit={handle}>
            <input
              type="text"
              placeholder="Name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={emailInp}
              onChange={(e) => setEmailInp(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={psk}
              onChange={(e) => setPsk(e.target.value)}
            />
            <input
              required
              style={{ display: "none" }}
              type="file"
              accept="image/*"
              id="pg"
              onChange={(e) => {
                const imgFile = e.target.files[0];

                setAvatar(imgFile);
              }}
            />
            <button type="submit">Sign Up</button>

            {err && <span>Something went wrong </span>}
          </form>
          <p>
            Already have an account? <Link to="/login">Log in </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
