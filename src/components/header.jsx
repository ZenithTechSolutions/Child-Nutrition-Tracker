import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons"; 

const Header = () => {
    return (
        <div className="header">
            <div className="navbar">
                <p>Micro, Small and Medium Enterprises</p>
                <div className="helpline">
                    <FontAwesomeIcon icon={faPhone} style={{ color: "#FFD43B" }} />
                    <p>HelpLine : 14408</p>
                </div>
            </div>
        </div>
    );
};

export default Header;
