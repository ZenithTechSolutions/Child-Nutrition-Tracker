import { useState } from "react";
import "../styles/beneficiaries.css";
import Header from "./header";
const Beneficiaries = () => {
  const [add, setAdd] = useState(false);
  const handleAdd = () => {
    setAdd(true);
    console.log(add);
  };
  const count = 6;
  return (
    <>
      <div className="box">
        <div className="bene-container">
          <div className="bene-content">
            <div className="bene-add-student">
              <h2>Add Student Details</h2>
              <span onClick={handleAdd}>+</span>
              <div className="bene-stu-details">
                <form action="POST">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Your Name"
                    required
                  />
                  <div className="dates">
                    <div className="date-birth">
                      <label htmlFor="dob">Date of Birth:</label>
                      <input type="date" name="dob" required />
                    </div>
                    <div className="date-join">
                      <label htmlFor="doj">Date of Join:</label>
                      <input type="date" name="doj" required />
                    </div>
                  </div>
                  <div className="numbers">
                    <label htmlFor="age">Age:</label>
                    <input
                      type="number"
                      name="age"
                      placeholder="Enter Age"
                      required
                    />
                    <label htmlFor="height">Height:</label>
                    <input
                      type="number"
                      name="height"
                      placeholder="Enter Height"
                      required
                    />
                    <label htmlFor="weight">Weight:</label>
                    <input
                      type="number"
                      name="weight"
                      placeholder="Enter Weight"
                      required
                    />
                  </div>
                  <label htmlFor="address">Address:</label>
                  <textarea
                    type="text"
                    name="name"
                    placeholder="Enter Your Address"
                    required
                  />
                  <label htmlFor="contact">Contact:</label>
                  <input
                    type="tel"
                    name="contact"
                    placeholder="Enter Your Number"
                    required
                  />
                  <button type="submit">Submit</button>
                </form>
              </div>
            </div>
            <div className="bene-count">
              <h6>Total Children Count : {count}</h6>
            </div>
            <div className="bene-detail"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Beneficiaries;
