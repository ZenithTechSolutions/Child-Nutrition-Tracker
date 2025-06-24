import React, { useEffect, useState } from 'react';
import "../styles/attendence.css";

const Attendance = () => {
  const [students, setStudents] = useState([]);
  const [attendanceStatus, setAttendanceStatus] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/student/all', {
        credentials: 'include',
      });
      const data = await response.json();
      setStudents(data);
      const initialStatus = {};
      data.forEach((student) => {
        initialStatus[student._id] = false;
      });
      setAttendanceStatus(initialStatus);
    } catch (err) {
      console.error('Failed to load students:', err);
    } finally {
      setLoading(false);
    }
  };

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
        await fetch(`http://localhost:5000/api/student/mark-attendance/${studentId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ present }),
        });
      }
      alert('Attendance marked successfully');
    } catch (error) {
      console.error('Error marking attendance:', error);
      alert('Failed to mark attendance');
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
            {students.map((student) => (
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
