import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import React, { useState, useEffect } from "react";
import '../styles/header.css'
import { Link } from "react-router-dom";

const Header = () => {
    const [userName, setUserName] = useState(null);
    
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get('/auth/getUser', {
                    withCredentials: true // Send cookie
                });
                setUserName("Welcome " + res.data.name);
            } catch (err) {
                console.log("User not logged in or token invalid");
                setUserName(null);
            }
        };

        fetchUser();
    }, []);

    return (
        <>
            <header className="header">
                <p id="header-title">Micro, Small and Medium Enterprises</p>
                <div className="header-profile">
                    <p><Link to="/">Home</Link></p>
                    <p><Link to="/login">{userName ? userName : "Login" }</Link></p>
                    <FontAwesomeIcon icon={faCircleUser} style={{ color: "#fff", fontSize: "30px" }} />
                </div>
            </header>
        </>
    );
};

export default Header;
