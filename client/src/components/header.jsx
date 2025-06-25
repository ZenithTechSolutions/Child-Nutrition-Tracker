import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
};

export default Header;