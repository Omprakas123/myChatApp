import React, { useState } from "react";

import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { resetPasswordHandler } from "../firebase/loginHandler";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const handler = (e) => {
    e.preventDefault();

    email && resetPasswordHandler(email);

    setEmail("");
  };

  return (
    <>
      <div className="formContainer">
        <div className="formWrapper">
          <div className="fgt-hdr">
            <Link to={"/login"}>
              <button className="fgt-hdr-btn">
                <IoMdArrowBack />
              </button>
            </Link>
            <span className="logo">Password Reset</span>
          </div>

          <form onSubmit={handler}>
            <input
              required
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button type="submit">Get Password Reset Link</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PasswordReset;
