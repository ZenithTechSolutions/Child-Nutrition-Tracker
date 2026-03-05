import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import API from "../api/axios";

const Measurements = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState({});
  const [history, setHistory] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [manualStudent, setManualStudent] = useState(null);
  const [manualHeight, setManualHeight] = useState("");
  const [manualWeight, setManualWeight] = useState("");

  const navigate = useNavigate();

  // LOAD STUDENTS
  const loadStudents = async () => {
    try {
      const res = await API.get("/students");
      setStudents(res.data);
    } catch (err) {
      console.error("Failed to fetch students", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  // FETCH FROM SENSOR
  const handleFetchMeasurements = async (studentId) => {
    setFetching((prev) => ({
      ...prev,
      [studentId]: true,
    }));

    try {
      setUploading(true);

      await API.post(`/measurements/update-measurements/${studentId}`);
      alert("Measurement updated from sensor");
      await loadStudents();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to fetch measurements");
    } finally {
      setFetching((prev) => ({
        ...prev,
        [studentId]: false,
      }));

      setUploading(false);
    }
  };

  // MANUAL SAVE
  const handleManualSave = async () => {
    if (!manualHeight && !manualWeight) {
      alert("Enter height or weight");
      return;
    }

    try {
      setUploading(true);

      await API.post(`/measurements/update-measurements/manual/${manualStudent._id}`, {
        height: manualHeight ? manualHeight : 0,
        weight: manualWeight ? manualWeight : 0,
      });

      setManualStudent(null);
      setManualHeight("");
      setManualWeight("");

      await loadStudents();
      alert("Measurement updated manually");
    } catch (err) {
      alert("Manual entry failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Header />

      <div className="flex justify-center px-4 my-10">
        <div className="w-full p-6 bg-white shadow-lg max-w-225 rounded-xl">
          {/* TITLE */}

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Student Measurements</h2>

            <button
              onClick={() => navigate("/")}
              className="bg-[#ffa500] text-white px-4 py-2 rounded-lg hover:bg-[#ffa273] transition cursor-pointer"
            >
              Back
            </button>
          </div>

          {/* TABLE */}

          {loading ? (
            <p className="text-center">Loading students...</p>
          ) : (
            <div className="p-3 overflow-y-auto bg-gray-100 rounded-lg max-h-100 min-w-100">
              {/* HEADER */}

              <div className="flex justify-between pb-2 font-bold border-b">
                <p>Name</p>
                <p>Height</p>
                <p>Weight</p>
                <p>Actions</p>
              </div>

              {students.map((student) => {
                const latest =
                  student.measurements?.[student.measurements.length - 1] || {};

                return (
                  <div
                    key={student._id}
                    className="flex items-center justify-between py-3 border-b hover:bg-gray-200"
                  >
                    <p>{student.name}</p>

                    <p>{latest.height || "—"} cm</p>

                    <p>{latest.weight || "—"} kg</p>

                    <div className="flex gap-2">
                      {/* FETCH */}

                      <button
                        onClick={() => handleFetchMeasurements(student._id)}
                        disabled={uploading}
                        className="bg-[#ffa500] text-white px-3 py-1 rounded-lg hover:bg-[#ffa273] cursor-pointer transition"
                      >
                        {fetching[student._id] ? "Fetching..." : "Fetch"}
                      </button>

                      {/* MANUAL */}

                      <button
                        onClick={() => setManualStudent(student)}
                        className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 cursor-pointer transition"
                      >
                        Manual
                      </button>

                      {/* HISTORY */}

                      <button
                        onClick={() => setHistory(student)}
                        className="bg-gray-600 text-white px-3 py-1 rounded-lg hover:bg-gray-700 cursor-pointer transition"
                      >
                        History
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* HISTORY MODAL */}

      {history && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-125 max-h-[80vh] overflow-y-auto">
            <h2 className="mb-4 text-xl font-bold text-center">
              {history.name} Measurement History
            </h2>

            {history.measurements?.length ? (
              <div className="p-3 bg-gray-100 rounded-lg">
                <div className="flex justify-between pb-2 font-bold border-b">
                  <p>Date</p>
                  <p>Height</p>
                  <p>Weight</p>
                </div>

                {history.measurements
                  .slice()
                  .reverse()
                  .map((m, i) => (
                    <div key={i} className="flex justify-between py-2 border-b">
                      <p>{m.date}</p>
                      <p>{m.height} cm</p>
                      <p>{m.weight} kg</p>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-center">No measurement history</p>
            )}

            <div className="mt-4 text-center">
              <button
                onClick={() => setHistory(null)}
                className="bg-[#ffa500] text-white px-4 py-2 rounded-lg hover:bg-[#ffa273]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MANUAL ENTRY MODAL */}

      {manualStudent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-bold text-center mb-4">
              Manual Measurement
            </h2>

            <p className="text-center font-medium mb-4">{manualStudent.name}</p>

            <div className="flex flex-col gap-3">
              <input
                type="number"
                placeholder="Height (cm)"
                value={manualHeight}
                onChange={(e) => setManualHeight(e.target.value)}
                className="border p-2 rounded"
              />

              <input
                type="number"
                placeholder="Weight (kg)"
                value={manualWeight}
                onChange={(e) => setManualWeight(e.target.value)}
                className="border p-2 rounded"
              />
            </div>

            <div className="flex justify-center gap-4 mt-5">
              <button
                onClick={handleManualSave}
                className="bg-[#ffa500] text-white px-4 py-2 rounded-lg hover:bg-[#ffa273] cursor-pointer transition"
              >
                Save
              </button>

              <button
                onClick={() => setManualStudent(null)}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 cursor-pointer transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Measurements;
