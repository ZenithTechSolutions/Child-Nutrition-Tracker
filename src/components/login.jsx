import React, { useState } from "react";
import { FaPhone } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { Link } from "react-router-dom";
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
              <div className="input-box">
                <FaPhone className="icon" />
                <form>
                  <label>Mobile Number</label>
                  <input type="tel" placeholder={login ? "+91 XXXXXXXXXX" : "Enter your number"} />
                </form>
              </div>
  
              <div className="input-box">
                <MdPassword className="icon" />
                <form>
                  <label>
                    {login ? "MPIN" : "Generate MPIN"} <span className="required">*</span>
                  </label>
                  <input type="password" placeholder="_ _ _ _" />
                </form>
              </div>
  
              {login && <p className="forgot-link">Forgot MPIN?</p>}
              <button>{login ? "Login" : "Register"}</button>
            </div>
  
            <p>Don't have an account?<a href="#></a></p>
          </div>
        </div>
      </div>
    );
  };
export default Login;      