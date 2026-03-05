import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    password: "",
    state: "",
    district: "",
    taluk: "",
  });
  
  const navigate = useNavigate();
  
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await API.post("/auth/register", formData);
      alert("Registration successful");
      navigate("/login");
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Registration failed! Try again a minute later or Contact admin",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleStateSelect = (value) => {
    setFormData({
      ...formData,
      state: value,
    });
  };

  const stateData = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  return (
    <div className="min-h-screen flex items-center justify-evenly bg-[beige] px-4">
      {/* Left Side */}
      <div className="flex-col items-center hidden text-center md:flex">
        <h1 className="text-4xl font-bold text-[#a52a2a]">
          Child Nutrition Tracker
        </h1>
        <p className="mt-2 text-gray-700">
          A System to track Child Nutrition in Anganwadis
        </p>
      </div>

      {/* Right Card */}
      <div className="w-100 bg-[#c9dcfc94] rounded-[15px] flex p-8 flex-col items-center justify-evenly text-center">
        <h3 className="text-xl font-semibold">CREATE ACCOUNT</h3>
        <p className="mb-4 text-sm text-gray-600">
          Please enter your details below
        </p>

        <form onSubmit={handleRegister} className="w-[320px]">
          {/* Name */}
          <div className="flex items-center bg-white p-2 rounded-[10px] mb-4 border border-gray-500">
            <div className="w-full pl-3 text-left">
              <label className="block text-xs text-gray-900">Name</label>
              <input
                required
                type="text"
                placeholder="Enter full name"
                className="w-full text-sm border-b border-gray-300 outline-none"
                pattern="[A-Za-z\s]{3,50}"
                title="Name should contain only letters and spaces (3–50 characters)"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
          </div>

          {/* Mobile */}
          <div className="flex items-center bg-white p-2 rounded-[10px] mb-4 border border-gray-500">
            <div className="w-full pl-3 text-left">
              <label className="block text-xs text-gray-900">
                Mobile Number
              </label>
              <input
                required
                type="tel"
                placeholder="Enter 10-digit mobile number"
                className="w-full text-sm border-b border-gray-300 outline-none"
                pattern="[0-9]{10}"
                maxLength={10}
                title="Mobile number must be exactly 10 digits"
                inputMode="numeric"
                value={formData.number}
                onChange={(e) =>
                  setFormData({ ...formData, number: e.target.value })
                }
              />
            </div>
          </div>

          {/* MPIN */}
          <div className="flex items-center bg-white p-2 rounded-[10px] mb-4 border border-gray-500">
            <div className="w-full pl-3 text-left">
              <label className="block text-xs text-gray-900">MPIN *</label>
              <input
                required
                type="password"
                placeholder="Enter 4-digit MPIN"
                className="w-full text-sm border-b border-gray-300 outline-none"
                pattern="[0-9]{4}"
                maxLength={4}
                title="MPIN must be exactly 4 digits"
                inputMode="numeric"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
          </div>

          {/* State */}
          <div className="flex items-center bg-white p-2 rounded-[10px] mb-4 border border-gray-500">
            <div className="w-full pl-3 text-left">
              <label className="block text-xs text-gray-900">State</label>
              <select
                id="state"
                value={formData.state}
                className="w-full text-xs border border-gray-300 rounded-sm outline-none"
                onChange={(e) => handleStateSelect(e.target.value)}
                required
              >
                <option>Select State</option>
                {stateData.map((st, index) => (
                  <option key={index} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* District */}
          <div className="flex items-center bg-white p-2 rounded-[10px] mb-4 border border-gray-500">
            <div className="w-full pl-3 text-left">
              <label className="block text-xs text-gray-900">District</label>
              <input
                required
                type="text"
                placeholder="Enter District"
                className="w-full text-sm border-b border-gray-300 outline-none"
                pattern="[A-Za-z\s]{2,50}"
                title="District should contain only letters"
                value={formData.district}
                onChange={(e) =>
                  setFormData({ ...formData, district: e.target.value })
                }
              />
            </div>
          </div>

          {/* Taluk */}
          <div className="flex items-center bg-white p-2 rounded-[10px] mb-4 border border-gray-500">
            <div className="w-full pl-3 text-left">
              <label className="block text-xs text-gray-900">Taluk</label>
              <input
                required
                type="text"
                placeholder="Enter Taluk"
                className="w-full text-sm border-b border-gray-300 outline-none"
                pattern="[A-Za-z\s]{2,50}"
                title="Taluk should contain only letters"
                value={formData.taluk}
                onChange={(e) =>
                  setFormData({ ...formData, taluk: e.target.value })
                }
              />
            </div>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="
              w-full
              bg-[#0047f9]
              hover:bg-[#07329c]
              text-white
              py-2
              rounded-[10px]
              transition
              hover:scale-105
              cursor-pointer
            "
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <p className="mt-4 text-sm text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-[#0047f9] font-semibold">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
