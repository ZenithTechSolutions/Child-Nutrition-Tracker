import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons"; 
import '../styles/header.css'

const Header = () => {
    return (
        <div className="header">
                <p>Micro, Small and Medium Enterprises</p>
                <div className="helpline">
                    <FontAwesomeIcon icon={faPhone} style={{ color: "#fff" }} />
                    <p>HelpLine : 14408</p>
            </div>
        </div>
    );
};

export default Header;
