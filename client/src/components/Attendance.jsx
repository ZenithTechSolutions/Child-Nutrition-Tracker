import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/attendence.css";

const Attendance = () => {
  const [attendanceStatus, setAttendanceStatus] = useState({});
  const [loading, setLoading] = useState(true);
  const [record, setRecord] = useState([]);

  useEffect(() => {
    const fetchAllStudents = async () => {
      try {
        const res = await axios.get("/student/all");
        setRecord(res.data);
         const initialAttendance = {};
      res.data.forEach((student) => {
        initialAttendance[student._id] = false;
      });
      setAttendanceStatus(initialAttendance);
      } catch (err) {
        console.error("Failed to fetch students", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllStudents();
  }, []);

  const handleCheckboxChange = (studentId) => {
    setAttendanceStatus((prev) => ({
      ...prev,
      [studentId]: !prev[studentId],
    }));
  };

  const submitAttendance = async () => {
    try {
      for (const studentId of Object.keys(attendanceStatus)) {
        const present = attendanceStatus[studentId];

        await axios.post(`/student/mark-attendance/${studentId}`,
          { present },
          { withCredentials: true }
        );
      }

      alert("Attendance marked successfully");
    } catch (error) {
      console.error("Error marking attendance:", error);
      alert("Failed to mark attendance");
    }
  };

  return (
    <div className="attendance-container">
      <h2>Mark Attendance</h2>
      {loading ? (
        <p>Loading students...</p>
      ) : (
        <form className="attendance-form" onSubmit={(e) => e.preventDefault()}>
          <ul className="student-list">
            {record.map((student) => (
              <li key={student._id} className="student-item">
                <label>
                  <input
                    type="checkbox"
                    checked={attendanceStatus[student._id] || false}
                    onChange={() => handleCheckboxChange(student._id)}
                  />
                  {student.name}
                </label>
              </li>
            ))}
          </ul>
          <button className="submit-btn" onClick={submitAttendance}>
            Submit Attendance
          </button>
        </form>
      )}
    </div>
  );
};

export default Attendance;
