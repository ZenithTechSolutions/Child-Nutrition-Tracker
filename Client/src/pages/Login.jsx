import { FaPhone } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    number: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await API.post("/auth/login", loginData);
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Login failed! Try again a minute later or Contact admin",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-evenly bg-[beige] px-4">
      {/* Left */}
      <div className="flex-col items-center hidden text-center md:flex">
        <h1 className="text-4xl font-bold text-[#a52a2a]">
          Child Nutrition Tracker
        </h1>
        <p className="mt-2 text-gray-700">
          A System to track Child Nutrition in Anganwadis
        </p>
      </div>

      {/* Card */}
      <div className="w-100 h-137.5 bg-[#c9dcfc94] rounded-2xl p-8 flex flex-col items-center justify-evenly text-center">
        <h3 className="text-xl font-semibold">WELCOME BACK</h3>
        <p className="text-sm text-gray-600">Please enter your details below</p>

        <form onSubmit={handleLogin} className="w-[320px]">
          {/* Mobile */}
          <div className="flex items-center p-2 mb-4 bg-white border border-gray-500 rounded-lg">
            <FaPhone className="pr-3 ml-3 text-3xl text-gray-900 border-r" />
            <div className="w-full pl-3 text-left">
              <label className="block text-xs text-gray-900">
                Mobile Number
              </label>
              <input
                required
                type="tel"
                className="w-full text-sm outline-none"
                placeholder="Enter 10-digit mobile number"
                pattern="[0-9]{10}"
                maxLength={10}
                title="Mobile number must be exactly 10 digits"
                value={loginData.number}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setLoginData({ ...loginData, number: value });
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex items-center p-2 mb-4 bg-white border border-gray-500 rounded-lg">
            <MdPassword className="pr-3 ml-3 text-3xl text-gray-900 border-r" />
            <div className="w-full pl-3 text-left">
              <label className="block text-xs text-gray-900">MPIN *</label>
              <input
                required
                type="password"
                className="w-full text-sm outline-none"
                placeholder="Enter 4-digit MPIN"
                pattern="[0-9]{4}"
                maxLength={4}
                title="MPIN must be exactly 4 digits"
                value={loginData.password}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setLoginData({ ...loginData, password: value });
                }}
              />
            </div>
          </div>

          <p
            className="mb-3 text-sm text-right text-[#0047f9] cursor-pointer hover:scale-105 transition"
            onClick={() => {
              alert("Contact admin for MPIN change!");
            }}
          >
            Forgot MPIN?
          </p>

          <button
            className="w-full bg-[#0047f9] hover:bg-[#07329c] text-white py-2 rounded-lg transition hover:scale-105 cursor-pointer"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="mt-4 text-sm text-center ">
            Don't Have An Account?{" "}
            <Link
              to="/register"
              className="text-[#0047f9] font-semibold"
            >
              Register now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
