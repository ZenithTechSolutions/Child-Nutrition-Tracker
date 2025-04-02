import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons"; // Import the phone icon

const Header = () => {
    return (
        <div className="header">
            <div className="navbar">
                <p>Micro, Small and Medium Enterprises</p>
                <div className="helpline">
                    <FontAwesomeIcon icon={faPhone} style={{ color: "#FFD43B" }} /> {/* Using the icon */}
                    <p>HelpLine : 14408</p>
                </div>
            </div>
        </div>
    );
};

export default Header;
