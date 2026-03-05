import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import API from "../api/axios";

const Students = () => {
  const [add, setAdd] = useState(false);
  const [record, setRecord] = useState([]);

  const navigate = useNavigate();

  const [newStudent, setNewStudent] = useState({
    name: "",
    dob: "",
    doj: "",
    fathersName: "",
    mothersName: "",
    address: "",
    contact: "",
  });

  const fetchStudents = async () => {
    try {
      const res = await API.get("/students");
      setRecord(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/students", newStudent);
      fetchStudents();
      setAdd(false);
      setNewStudent({
        name: "",
        dob: "",
        doj: "",
        fathersName: "",
        mothersName: "",
        address: "",
        contact: "",
      });
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  return (
    <>
      <Header />

      {/* Overlay */}
      {add && (
        <div
          onClick={() => setAdd(false)}
          className="fixed inset-0 z-40 transition bg-black/40 backdrop-blur-sm"
        />
      )}

      <div className="flex justify-center px-4 my-10">
        <div className="bg-white max-w-225 w-full h-136 rounded-xl shadow-lg p-6 relative">
          {/* Add Student Section */}
          <div className="flex justify-center">
            <div className="flex items-center gap-2 bg-gray-100 px-6 py-4 rounded-xl shadow-md w-full max-w-162.5 justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold">Add Student</h2>

                <span
                  onClick={() => setAdd(true)}
                  className="
                  text-2xl
                  border-4 border-black
                  w-12.5 h-12.5
                  flex items-center justify-center
                  rounded-full
                  cursor-pointer
                  transition
                  hover:bg-black hover:text-white
                "
                >
                  +
                </span>
              </div>
              <button
                onClick={() => navigate("/")}
                className="bg-[#ffa500] text-white px-4 py-2 rounded-lg hover:bg-[#ffa273] cursor-pointer transition"
              >
                Back
              </button>
            </div>
          </div>

          {/* Count */}
          <div className="mt-6 text-lg font-semibold text-center">
            Total student count: {record.length}
          </div>

          {/* List */}
          <div className="mt-4 mx-auto max-h-87.5 max-w-100 overflow-y-auto bg-gray-100 rounded-lg p-3">
            {/* Header Row */}
            <div className="flex justify-between px-2 pb-2 font-bold border-b-4 border-black">
              <p>Name</p>
              <p>Age</p>
            </div>

            {record.map((item, index) => (
              <div
                key={index}
                className="flex justify-between px-2 py-2 transition border-b hover:bg-gray-200"
              >
                <p>{item.name}</p>
                <p>{calculateAge(item.dob)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popup */}
      <div
        className={`
          fixed top-1/2 left-1/2
          -translate-x-1/2 -translate-y-1/2
          bg-white
          w-125 max-h-[80vh]
          overflow-y-auto
          p-6
          shadow-2xl
          z-50
          transition
          duration-300
          ${add ? "scale-100 opacity-100" : "scale-90 opacity-0 pointer-events-none"}
        `}
      >
        <h2 className="mb-4 text-xl font-semibold text-center">
          Student Details
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col">
          {[
            {
              label: "Name",
              name: "name",
              type: "text",
              placeholder: "Enter full name",
              pattern: "[A-Za-z\s]{3,50}",
              title:
                "Name should contain only letters and spaces (3–50 characters)",
            },
            { label: "Date of Birth", name: "dob", type: "date" },
            { label: "Date of Join", name: "doj", type: "date" },
            {
              label: "Father's Name",
              name: "fathersName",
              type: "text",
              placeholder: "Enter father's name",
              pattern: "[A-Za-z\s]{3,50}",
              title: "Father's name should contain only letters and spaces",
            },
            {
              label: "Mother's Name",
              name: "mothersName",
              type: "text",
              placeholder: "Enter mother's name",
              pattern: "[A-Za-z\s]{3,50}",
              title: "Mother's name should contain only letters and spaces",
            },
            {
              label: "Contact",
              name: "contact",
              type: "tel",
              placeholder: "Enter contact number",
              pattern: "[0-9]{10}",
              title: "Contact number should be exactly 10 digits",
            },
          ].map((field) => (
            <div key={field.name} className="mt-3">
              <label className="text-sm font-bold text-gray-700">
                {field.label}:
              </label>
              <input
                type={field.type}
                name={field.name}
                required
                value={newStudent[field.name]}
                placeholder={field.placeholder}
                pattern={field.pattern}
                title={field.title}
                onChange={handleChange}
                className="w-full p-2 mt-1 border rounded-md"
              />
            </div>
          ))}

          {/* Address */}
          <div className="mt-3">
            <label className="text-sm font-bold text-gray-700">Address:</label>
            <textarea
              name="address"
              required
              value={newStudent.address}
              onChange={handleChange}
              placeholder="Enter permanent address"
              className="w-full h-20 p-2 mt-1 border rounded-md resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-6 mt-5">
            <button
              type="submit"
              className="
                bg-[#ff8300]
                hover:bg-[#e67300]
                text-white
                px-5 py-2
                rounded-lg
                w-25
                transition
                cursor-pointer
              "
            >
              Submit
            </button>

            <button
              type="button"
              onClick={() => setAdd(false)}
              className="
                bg-[#723535]
                hover:bg-[#5b2b2b]
                text-white
                px-5 py-2
                rounded-lg
                w-25
                transition
                cursor-pointer
              "
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default Students;
