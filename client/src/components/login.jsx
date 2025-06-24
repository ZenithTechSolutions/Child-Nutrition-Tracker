import { FaPhone } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import "../styles/login.css";
import { useState } from "react";
import axios from "axios";

const Login = ({ setUserName }) => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    number: "",
    password: ""
  });

  const handleLogin = async () => {
    try {
      const response = await axios.post("/auth/login", loginData);
      alert(response.data.message);

      navigate('/');
      const res = await axios.get("/auth/getUser", {
        withCredentials: true
      });
      setUserName(res.data.name);
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-leftside">
        <h1>Child Nutrition Tracker</h1>
        <p>A System to track Child Nutrition in Anganwadis</p>
      </div>

      <div className="login-rightside">
        <div className="rightside-container">
          <h3>WELCOME BACK</h3>
          <p>Please enter your details below</p>

          <div className="login-btn">
            <p>Login</p>
          </div>

          <div className="form-container">

            <div className="input-box">
              <FaPhone className="icon" />
              <form className="loginForm" onSubmit={(e) => e.preventDefault()}>
                <label>Mobile Number</label>
                <input
                  type="tel"
                  placeholder="+91 XXXXXXXXXX"
                  value={loginData.number}
                  onChange={(e) =>
                    setLoginData({ ...loginData, number: e.target.value })
                  }
                  pattern="[0-9]{10}"
                  required
                />
              </form>
            </div>

            <div className="input-box">
              <MdPassword className="icon" />
              <form className="loginForm" onSubmit={(e) => e.preventDefault()}>
                <label>
                  MPIN<span className="required">*</span>
                </label>
                <input
                  type="password"
                  placeholder="_ _ _ _"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                  pattern="\d{4}"
                  minLength={4}
                  maxLength={4}
                  inputMode="numeric"
                  required
                />
              </form>
            </div>

            <p className="forgot-link">Forgot MPIN?</p>

            <button onClick={handleLogin}>Login</button>

            <p>Don't Have An Account? <Link to='/register'>Register</Link> </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;