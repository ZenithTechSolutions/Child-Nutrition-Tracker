import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
<<<<<<< Updated upstream
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import '../styles/header.css'
import { Link, useNavigate } from "react-router-dom";

const Header = ({ userName, setUserName }) => {

    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            const confirmLogout = window.confirm("Are you sure you want to logout?")
            if (!confirmLogout) return;

            const res = await axios.post('/auth/logout')
            alert(res.data.message || "Logout successful")
            setUserName(null)
            sessionStorage.removeItem('students')
            navigate('/login')
        } catch (error) {
            alert(res.data.message || "Logout failed");
            console.error("Logout failed:", error);
        }
    }

    return (
        <>
            <header className="header">
                <p id="header-title">Micro, Small and Medium Enterprises</p>
                <div className="header-profile">
                    <p><Link to="/">Home</Link></p>
                    <p><Link to={userName ? null : '/login'}>{userName ? "Hi, " + userName : "Login"}</Link></p>
                    {userName && <p onClick={handleLogout}>Logout</p>}
                    <FontAwesomeIcon icon={faCircleUser} style={{ color: "#fff", fontSize: "30px" }} />
                </div>
            </header>
        </>
    );
=======
import {faCircleUser,faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import "../styles/header.css";
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";

const Header = ({ userName }) => {
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const toggledropdown = () => {
    setDropdown(!dropdown);
  };

  const handleLogout = async () => {
    try {
      await axios.post("/auth/logout", {}, { withCredentials: true });
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="header">
        <p id="header-title">Micro, Small and Medium Enterprises</p>
        <div className="header-profile" ref={dropdownRef}>
          <p>
            <Link to="/">Home</Link>
          </p>
          <p>
            <Link to={userName ? null : "/login"}>
              {userName ? "Hi, " + userName : "Login"}
            </Link>
          </p>

          <button onClick={toggledropdown} className="profile-btn ">
            <FontAwesomeIcon
              icon={faCircleUser}
              style={{ color: "#fff", fontSize: "30px" }}
            />
          </button>

          {dropdown && (
            <div className="dropdown-menu">
              <button className="dropdown-item" onClick={handleLogout}>
                <FontAwesomeIcon
                  icon={faRightFromBracket}
                  style={{ color: "#ff4e6d", fontSize: "1rem" }}
                />
                Logout
              </button>
            </div>
          )}
        </div>
      </header>
    </>
  );
>>>>>>> Stashed changes
};

export default Header;