import { useState, useEffect } from "react";
import "../styles/beneficiaries.css";

const Beneficiaries = () => {
  const [add, setAdd] = useState(false); // Open Add Students Menu

  // To Store User Data
  const [data, setData] = useState({
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

  const [record, setRecord] = useState(() => {
    const savedRecords = localStorage.getItem("students");
    return savedRecords ? JSON.parse(savedRecords) : [];
  });

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(record));
  }, [record]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (Object.values(data).some((field) => !field.trim())) {
      alert("All fields are required.");
      return;
    }

    setRecord([...record, data]);
    setData({
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

    setAdd(false);
  };

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
          <h2>Add Student</h2>
          <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <input 
              type="text" 
              name="name" 
              value={data.name} 
              onChange={handleInputChange} 
              required 
            /> 

            <label>Date of Birth:</label>
            <input type="date" name="dob" value={data.dob} onChange={handleInputChange} required />

            <label>Date of Join:</label>
            <input type="date" name="doj" value={data.doj} onChange={handleInputChange} required max={new Date().toISOString().split("T")[0]} />

            <label>Age:</label>
            <input type="number" name="age" value={data.age} onChange={handleInputChange} required />

            <label>Height:</label>
            <input type="number" name="height" value={data.height} onChange={handleInputChange} required />

            <label>Weight:</label>
            <input type="number" name="weight" value={data.weight} onChange={handleInputChange} required />

            <label>Father's Name:</label>
            <input type="text" name="father" value={data.father} onChange={handleInputChange} required />

            <label>Mother's Name:</label>
            <input type="text" name="mother" value={data.mother} onChange={handleInputChange} required />

            <label>Address:</label>
            <textarea name="address" value={data.address} onChange={handleInputChange} required />

            <label>Contact:</label>
            <input type="tel" name="contact" value={data.contact} onChange={handleInputChange} required />

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
