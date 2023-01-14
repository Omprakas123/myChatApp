import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import { getCurrentUserDataFromDb } from "../actions/userActions";
import { emailLoginHandler } from "../firebase/loginHandler";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [psk, setPsk] = useState("");

  const handler = (e) => {
    e.preventDefault();

    emailLoginHandler(email, psk)
      .then((res) => {
        // console.log(res);
        dispatch(getCurrentUserDataFromDb(res.user));

        setEmail(null);
        setPsk(null);

        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Log In Now</span>
        <span className="tym">Please login to continue using our app</span>

        <form onSubmit={handler}>
          <input
            required
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            required
            type="password"
            placeholder="Password"
            value={psk}
            onChange={(e) => setPsk(e.target.value)}
          />

          <p>
            <Link to={"/password-reset"}>Forgot Password</Link>
          </p>
          <button type="submit">Log In</button>
        </form>
        <p>
          You don't have an account? <Link to="/">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
