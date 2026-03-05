import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import API from "../api/axios";

const Attendance = () => {
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});
  const [popup, setPopup] = useState(false);
  const [alreadyMarked, setAlreadyMarked] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  const today = new Date().toLocaleDateString("en-CA", {
    timeZone: "Asia/Kolkata",
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const date = now
        .toLocaleDateString("en-GB", { timeZone: "Asia/Kolkata" })
        .replace(/\//g, ":");

      const time = now.toLocaleTimeString("en-GB", {
        timeZone: "Asia/Kolkata",
        hour12: false,
      });

      const formatted = `${date} ${time}`;

      setCurrentTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  // Fetch attendance for today
  const fetchAttendance = async () => {
    try {
      const res = await API.get(`/attendance/by-date?date=${today}`);

      if (res.data) {
        setAlreadyMarked(true);
        const formatted = {};
        res.data.records.forEach((r) => {
          formatted[r.student._id] = r.status;
        });

        setAttendanceData(formatted);
      }
    } catch {
      console.log("No attendance for today");
    }
  };

  // Fetch students
  const fetchStudents = async () => {
    try {
      const res = await API.get("/students");
      setStudents(res.data);
      const initial = {};
      res.data.forEach((s) => {
        initial[s._id] = "Present";
      });
      setAttendanceData(initial);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchAttendance();
  }, []);

  const handleChange = (id, value) => {
    setAttendanceData({ ...attendanceData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/attendance/add", {
        date: today,
        records: attendanceData,
      });

      alert("Attendance Saved");
      fetchAttendance();
      setPopup(false);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save attendance");
    }
  };

  const presentCount = Object.values(attendanceData).filter(
    (v) => v === "Present",
  ).length;

  const navigate = useNavigate();

  return (
    <>
      <Header />

      {/* Overlay */}
      {popup && (
        <div
          onClick={() => setPopup(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        />
      )}

      <div className="flex justify-center px-4 my-10">
        <div className="bg-white max-w-225 w-full h-136 rounded-xl shadow-lg p-6">
          {/* Header Section */}
          <div className="flex justify-center">
            <div className="flex items-center gap-5 bg-gray-100 px-6 py-4 rounded-xl shadow-md w-full max-w-162.5 justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold">Mark Attendance</h2>

                <span
                  onClick={() =>
                    !alreadyMarked
                      ? setPopup(true)
                      : alert("Attendance already marked for today")
                  }
                  title={
                    alreadyMarked ? "Attendance already marked for today" : ""
                  }
                  className={`
                  text-2xl
                  border-4 border-black
                  w-12.5 h-12.5
                  flex items-center justify-center
                  rounded-full
                  cursor-pointer
                  transition
                  ${alreadyMarked ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 "}`}
                >
                  ✓
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate("/attendance-history")}
                  className="px-4 py-2
                bg-[#ffa500]
                text-white
                rounded-lg
                hover:bg-[#ffa273]
                transition
                cursor-pointer"
                >
                  View History
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="bg-[#ffa500] text-white px-4 py-2 rounded-lg hover:bg-[#ffa273] cursor-pointer transition"
                >
                  Back
                </button>
              </div>
            </div>
          </div>

          {/* Date */}
          <div className="mt-6 text-lg font-semibold text-center">
            Date: {currentTime}
          </div>

          {/* Count */}
          <div className="mt-2 font-semibold text-center">
            Present: {presentCount} / {students.length}
          </div>

          {/* List */}
          <div className="mt-4 max-h-80 overflow-y-auto max-w-100  mx-auto bg-gray-100 rounded-lg p-3">
            <div className="flex justify-between px-2 pb-2 font-bold border-b-4 border-black">
              <p>Name</p>
              <p>Status</p>
            </div>

            {students.map((student) => (
              <div
                key={student._id}
                className="flex justify-between px-2 py-2 transition border-b hover:bg-gray-200"
              >
                <p>{student.name}</p>

                <input
                  type="checkbox"
                  checked={attendanceData[student._id] === "Present"}
                  onChange={(e) =>
                    handleChange(
                      student._id,
                      e.target.checked ? "Present" : "Absent",
                    )
                  }
                  className="w-5 h-5 cursor-pointer accent-green-600"
                />
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
          w-100
          p-6
          shadow-2xl
          z-50
          transition duration-300
          ${popup ? "scale-100 opacity-100" : "scale-90 opacity-0 pointer-events-none"}
        `}
      >
        <h2 className="mb-4 text-lg font-semibold text-center">
          Confirm Attendance
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <p className="mb-6 text-center">
            Are you sure you want to submit attendance for today?
          </p>

          <div className="flex gap-6">
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
              onClick={() => setPopup(false)}
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

export default Attendance;
