import React, { useState } from "react";
import { FaPhone } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import "../styles/login.css";

const Login = () => {
  const [login, setLogin] = useState(true);
  const [signIn, setSignIn] = useState(false);

  const handleLogin = () => {
    setLogin(true);
    setSignIn(false);
  };

  const handleSignIn = () => {
    setSignIn(true);
    setLogin(false);
  };

  return (
    <div className="login-container">
      <div className="login-leftside">
        <h1>POSHAN TRACKER</h1>
        <p>PM'S SCHEME</p>
      </div>

      <div className="login-rightside">
        <div className="rightside-container">
          <h3>WELCOME BACK</h3>
          <p>Please enter your details below</p>

          <div className="login-slider">
            <div className={`login-bg ${signIn ? "move-right" : ""}`}></div>

            <div className="login-btn-1" onClick={handleLogin}>
              <p>Login</p>
            </div>
            <div className="login-btn-2" onClick={handleSignIn}>
              <p>Sign In</p>
            </div>
          </div>

          <div className="form-container">
            {login ? (
              <>
                <div className="input-box">
                  <FaPhone className="icon" />
                  <div className="input-field">
                    <label>Mobile Number</label>
                    <input type="tel" placeholder="+91 XXXXXXXXXX" />
                  </div>
                </div>

                <div className="input-box">
                  <MdPassword className="icon" />
                  <div className="input-field">
                    <label>
                      MPIN <span className="required">*</span>
                    </label>
                    <input type="password" placeholder="----" />
                  </div>
                </div>

                <p className="forgot-link">Forgot MPIN?</p>
              </>
            ) : (
              <>
                <div className="input-box">
                  <FaPhone className="icon" />
                  <div className="input-field">
                    <label>Mobile Number</label>
                    <input type="tel" placeholder="Enter your number" />
                  </div>
                </div>

                <div className="input-box">
                  <MdPassword className="icon" />
                  <div className="input-field">
                    <label>
                      Password <span className="required">*</span>
                    </label>
                    <input type="password" placeholder="Enter password" />
                  </div>
                </div>

                <p className="forgot-link">Forgot Password?</p>
              </>
            )}
          </div>

          <p>
            Don't have an account? <a href="#">Sign In</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
