import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/beneficiaries.css";

const Beneficiaries = () => {
  const [add, setAdd] = useState(false); // Open Add Students Menu
  const [record, setRecord] = useState([]); // To Store All Students Data

  // To Store NewStudent Data
  const [newStudent, setNewStudent] = useState({
    name: "",
    dob: "",
    doj: "",
    height: "",
    weight: "",
    fathersName: "",
    mothersName: "",
    address: "",
    contact: "",
  });

  useEffect(() => {
    const storedStudents = sessionStorage.getItem("students");

    if (storedStudents) {
      setRecord(JSON.parse(storedStudents));
    } else {
      const fetchAllStudents = async () => {
        try {
          const res = await axios.get("/student/all");
          setRecord(res.data);
          sessionStorage.setItem("students", JSON.stringify(res.data));
        } catch (err) {
          console.error("Failed to fetch students", err);
        }
      };

      fetchAllStudents();
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/student/add-student", newStudent);
      alert("Student added successfully");
      const res = await axios.get("/student/all");
      setRecord(res.data);
      sessionStorage.setItem("students", JSON.stringify(res.data));
      setAdd(false);
      setNewStudent({
        // reset form
        name: "",
        dob: "",
        doj: "",
        height: "",
        weight: "",
        fathersName: "",
        mothersName: "",
        address: "",
        contact: "",
      });
    } catch (error) {
      console.error("Error adding student:", error);
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
      <div
        className={`overlay ${add ? "overlay-active" : ""}`}
        onClick={() => setAdd(false)}
      ></div>

      <div className="box">
        <div className="bene-container">
          <div className="bene-content">
            <div className="bene-add-student">
              <h2>Add Student Details</h2>
              <span onClick={() => setAdd(true)}>+</span>
            </div>

            <div className="bene-count">
              <h6>Total Children Count: {record.length}</h6>
            </div>

            <div className="bene-list">
              <div className="bene-header">
                <p>Name</p>
                <p>Age</p>
              </div>
              {record.map((item, index) => (
                <div className="bene-detail" key={index}>
                  <p>{item.name}</p>
                  <p>{calculateAge(item.dob)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Animated Pop-up */}
      <div className={`popup ${add ? "popup-active" : ""}`}>
        <div className="popup-content">
          <h2>Student Details</h2>
          <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={newStudent.name}
              onChange={handleInputChange}
              placeholder="Enter child’s full name"
              pattern="[A-Za-z ]+"
              required
              onInvalid={(e) =>
                e.target.setCustomValidity("Please enter a valid name")
              }
              onInput={(e) => e.target.setCustomValidity("")}
            />

            <label>Date of Birth:</label>
            <input
              type="date"
              name="dob"
              value={newStudent.dob}
              onChange={ handleInputChange }
              required
              max={new Date().toISOString().split("T")[0]}
              onInvalid={(e) =>
                e.target.setCustomValidity(
                  "Please select a valid date of birth"
                )
              }
              onInput={(e) => e.target.setCustomValidity("")}
            />

            <label>Date of Join:</label>
            <input
              type="date"
              name="doj"
              value={newStudent.doj}
              onChange={handleInputChange}
              required
              max={new Date().toISOString().split("T")[0]}
              onInvalid={(e) =>
                e.target.setCustomValidity("Please select a valid joining date")
              }
              onInput={(e) => e.target.setCustomValidity("")}
            />

            <label>Height:</label>
            <input
              type="number"
              name="height"
              value={newStudent.height}
              onChange={handleInputChange}
              placeholder="Enter height in cm"
              min={0}
              required
              onInvalid={(e) =>
                e.target.setCustomValidity("Please enter a valid height")
              }
              onInput={(e) => e.target.setCustomValidity("")}
            />

            <label>Weight:</label>
            <input
              type="number"
              name="weight"
              value={newStudent.weight}
              onChange={handleInputChange}
              placeholder="Enter weight in kg"
              min={0}
              required
              onInvalid={(e) =>
                e.target.setCustomValidity("Please enter a valid weight")
              }
              onInput={(e) => e.target.setCustomValidity("")}
            />

            <label>Father's Name:</label>
            <input
              type="text"
              name="fathersName"
              value={newStudent.fathersName}
              onChange={handleInputChange}
              placeholder="Enter father’s full name"
              pattern="[A-Za-z]+"
              required
              onInvalid={(e) =>
                e.target.setCustomValidity(
                  "Father's name must contain only letters"
                )
              }
              onInput={(e) => e.target.setCustomValidity("")}
            />

            <label>Mother's Name:</label>
            <input
              type="text"
              name="mothersName"
              value={newStudent.mothersName}
              onChange={handleInputChange}
              placeholder="Enter mother’s full name"
              pattern="[A-Za-z]+"
              required
              onInvalid={(e) =>
                e.target.setCustomValidity(
                  "Mother's name must contain only letters"
                )
              }
              onInput={(e) => e.target.setCustomValidity("")}
            />

            <label>Address:</label>
            <textarea
              name="address"
              value={newStudent.address}
              onChange={handleInputChange}
              placeholder="Enter full address"
              required
              onInvalid={(e) =>
                e.target.setCustomValidity("Please enter an address")
              }
              onInput={(e) => e.target.setCustomValidity("")}
            />

            <label>Contact:</label>
            <input
              type="tel"
              name="contact"
              value={newStudent.contact}
              onChange={handleInputChange}
              pattern="[0-9]{10}"
              placeholder="10-digit number"
              maxLength={10}
              onInvalid={(e) =>
                e.target.setCustomValidity(
                  "Please enter a valid 10-digit number"
                )
              }
              onInput={(e) => e.target.setCustomValidity("")}
              required
            />

            <div className="popup-buttons">
              <button type="submit" className="submit-btn">
                Submit
              </button>
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setAdd(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Beneficiaries;
