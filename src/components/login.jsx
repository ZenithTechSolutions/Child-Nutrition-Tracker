import { FaPhone } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { Link } from 'react-router-dom'
import "../styles/login.css";

const Login = () => {

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
              <form>
                <label>Mobile Number</label>
                <input type="tel" placeholder="+91 XXXXXXXXXX" />
              </form>
            </div>

            <div className="input-box">
              <MdPassword className="icon" />
              <form>
                <label>
                  MPIN<span className="required">*</span>
                </label>
                <input type="password" placeholder="_ _ _ _" />
              </form>
            </div>

            <p className="forgot-link">Forgot MPIN?</p>

            <Link to="/">
              <button>Login</button>
            </Link>
          </div>
          <p>Don't Have An Account? <a href="#">Register</a> </p>
        </div>
      </div>
    </div>
  );
};
export default Login;