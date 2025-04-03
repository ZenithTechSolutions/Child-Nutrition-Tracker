import { useState } from "react";
import "../styles/beneficiaries.css";
const Beneficiaries = () => {
  const [add, setAdd] = useState(false); //Open Add Students Menu
  //To Store User Data
  const [data, setData] = useState({
    name: "",
    dob: "",
    doj: "",
    age: "",
    height: "",
    weight: "",
    address: "",
    contact: "",
  });
  const [record, setRecord] = useState([]); //To Add New Data

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault(); 
  
    if (Object.values(data).some((field) => !field || field.trim() === "")) {
      alert("All fields are required.");
      return;
    }
  
    setRecord([...record, data]); // Store form data in array
    setData({
      name: "",
      dob: "",
      doj: "",
      age: "",
      height: "",
      weight: "",
      address: "",
      contact: "",
    }); // Reset form
    setAdd(false)
  };
  
  const handleAdd = () => {
    setAdd(!add);
  };
  return (
    <>
      <div className="box">
        <div className="bene-container">
          <div className="bene-content">
            <div className="bene-add-student">
              <h2>Add Student Details</h2>
              <span onClick={handleAdd}>+</span>
              <div
                className={`${
                  add ? "bene-stu-details" : "bene-stu-details-hidden"
                }`}
              >
                <form action="POST" onSubmit={handleSubmit}>
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={data.name}
                    placeholder="Enter Your Name"
                    onChange={handleInputChange}
                    required
                  />
                  <div className="dates">
                    <div className="date-birth">
                      <label htmlFor="dob">Date of Birth:</label>
                      <input
                        type="date"
                        name="dob"
                        value={data.dob}
                        required
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="date-join">
                      <label htmlFor="doj">Date of Join:</label>
                      <input
                        type="date"
                        name="doj"
                        value={data.doj}
                        required
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="numbers">
                    <label htmlFor="age">Age:</label>
                    <input
                      type="number"
                      name="age"
                      value={data.age}
                      placeholder="Enter Age"
                      onChange={handleInputChange}
                      required
                    />
                    <label htmlFor="height">Height:</label>
                    <input
                      type="number"
                      name="height"
                      value={data.height}
                      placeholder="Enter Height"
                      onChange={handleInputChange}
                      required
                    />
                    <label htmlFor="weight">Weight:</label>
                    <input
                      type="number"
                      name="weight"
                      value={data.weight}
                      placeholder="Enter Weight"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <label htmlFor="address">Address:</label>
                  <textarea
                    type="text"
                    name="address"
                    value={data.address}
                    placeholder="Enter Your Address"
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="contact">Contact:</label>
                  <input
                    type="tel"
                    name="contact"
                    value={data.contact}
                    placeholder="Enter Your Number"
                    onChange={handleInputChange}
                    required
                  />
                  <div className="bene-stu-details-btn">
                    <input type="submit" className="submit" value="Submit"/>
                    <input
                      type="button"
                      className="cancel"
                      value="Cancel"
                      onClick={handleAdd}
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className="bene-count">
              <h6>Total Children Count : {record.length}</h6>
            </div>
            <div className="bene-list">
              {record.map((item,index)=>(
                <div className="bene-detail" key={index}>
                  <p>{item.name}</p>
                  <p>{item.age}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Beneficiaries;
