import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import API from "../api/axios";
import {
  faCircleUser,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [userName, setUserName] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Fetch logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/auth/me");
        setUserName(res.data.name);
      } catch {
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // close dropdown outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="w-full h-14.5 px-6 flex items-center justify-end md:justify-between bg-linear-to-r from-[#ffbd45] to-[#ff4e6d] text-white sticky top-0 z-50">
      <p className="hidden font-medium tracking-wide md:block">
        Micro, Small and Medium Enterprises
      </p>

      <div className="relative flex items-center gap-6" ref={dropdownRef}>
        {location.pathname !== "/" && (
          <Link to="/" className="text-white">
            Home
          </Link>
        )}

        <p>{userName ? `Hi, ${userName}` : ""}</p>

        <button
          onClick={() => setDropdown(!dropdown)}
          className="bg-[#ff4e6d] hover:bg-[#ffbd45] p-1 rounded-full transition cursor-pointer "
        >
          <FontAwesomeIcon icon={faCircleUser} size="lg" />
        </button>

        {dropdown && (
          <div className="absolute right-0 bg-gray-100 rounded-md shadow-lg top-12 min-w-30">
            <button
              onClick={logout}
              className="w-full px-4 py-2 text-left flex items-center gap-2 text-[#ff4e6d] hover:bg-gray-300 text-sm cursor-pointer"
            >
              <FontAwesomeIcon icon={faRightFromBracket} />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
