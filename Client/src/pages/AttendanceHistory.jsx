import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import API from "../api/axios";

const AttendanceHistory = () => {
  const [date, setDate] = useState("");
  const [records, setRecords] = useState([]);

  const navigate = useNavigate();

  const fetchAttendance = async () => {
    try {
      const res = await API.get(`/attendance/by-date?date=${date}`);

      if (res.data) {
        setRecords(res.data.records);
      } else {
        alert("No attendance found for this date");
        setRecords([]);
      }
    } catch {
      alert("No attendance found for this date");
      setRecords([]);
    }
  };

  return (
    <>
      <Header />

      <div className="flex justify-center px-4 my-10">
        <div className="w-full h-136 p-6 bg-white shadow-lg max-w-225 rounded-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Attendance History</h2>
            <button
              onClick={() => navigate("/attendance")}
              className="bg-[#ffa500] text-white px-4 py-2 rounded-lg hover:bg-[#ffa273] cursor-pointer transition"
            >
              Back
            </button>
          </div>

          <div className="flex justify-center gap-4 mb-6">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="p-2 border rounded-md"
            />

            <button
              onClick={fetchAttendance}
              className="
                bg-[#ffa500]
                text-white
                px-4 py-2
                rounded-lg
                hover:bg-[#ffa273]
                transition
                cursor-pointer
              "
            >
              Search
            </button>
          </div>

          <div className="p-3 max-w-100 mx-auto overflow-y-auto bg-gray-100 rounded-lg max-h-95">
            <div className="flex justify-between px-2 pb-2 font-bold border-b-4 border-black">
              <p>Name</p>
              <p>Status</p>
            </div>

            {records.map((r, index) => (
              <div
                key={index}
                className="flex justify-between px-2 py-2 border-b hover:bg-gray-200"
              >
                <p>{r.student.name}</p>
                <p>{r.status}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AttendanceHistory;
