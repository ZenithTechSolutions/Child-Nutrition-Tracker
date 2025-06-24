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
    age: "",
    height: "",
    weight: "",
    father: "",
    mother: "",
    address: "",
    contact: "",
  });

  useEffect(() => {
    const fetchAllStudents = async () => {
      try {
        const res = await axios.get("/student/all");
        setRecord(res.data);
      } catch (err) {
        console.error("Failed to fetch students", err);
      }
    };

    fetchAllStudents();
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/student/add-student', newStudent);
      alert("Student added successfully");
      const res = await axios.get("/student/all");
      setRecord(res.data);
      setAdd(false);
      setStudent({ // reset form
        name: "",
        dob: "",
        doj: "",
        age: "",
        height: "",
        weight: "",
        father: "",
        mother: "",
        address: "",
        contact: "",
      })
    } catch (error) {
      console.error("Error adding student:", error);
    }
  }

  return (
    <>
      <div className={`overlay ${add ? "overlay-active" : ""}`} onClick={() => setAdd(false)}></div>

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
              {record.map((item, index) => (
                <div className="bene-detail" key={index}>
                  <p>{item.name}</p>
                  <p>{item.age}</p>
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
              required
            />

            <label>Date of Birth:</label>
            <input type="date" name="dob" value={newStudent.dob} onChange={handleInputChange} required />

            <label>Date of Join:</label>
            <input type="date" name="doj" value={newStudent.doj} onChange={handleInputChange} required max={new Date().toISOString().split("T")[0]} />

            <label>Age:</label>
            <input type="number" name="age" value={newStudent.age} onChange={handleInputChange} required />

            <label>Height:</label>
            <input type="number" name="height" value={newStudent.height} onChange={handleInputChange} required />

            <label>Weight:</label>
            <input type="number" name="weight" value={newStudent.weight} onChange={handleInputChange} required />

            <label>Father's Name:</label>
            <input type="text" name="father" value={newStudent.father} onChange={handleInputChange} required />

            <label>Mother's Name:</label>
            <input type="text" name="mother" value={newStudent.mother} onChange={handleInputChange} required />

            <label>Address:</label>
            <textarea name="address" value={newStudent.address} onChange={handleInputChange} required />

            <label>Contact:</label>
            <input type="tel" name="contact" value={newStudent.contact} onChange={handleInputChange} required />

            <div className="popup-buttons">
              <button type="submit" className="submit-btn">Submit</button>
              <button type="button" className="cancel-btn" onClick={() => setAdd(false)}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Beneficiaries;