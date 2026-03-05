import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Bills = () => {
  const [bills, setBills] = useState([]);
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      const res = await API.get("/bills");

      setBills(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Select receipt image");
      return;
    }

    try {
      setLoading(true);

      const base64 = await convertToBase64(file);

      await API.post("/bills/upload", {
        image: base64,
        description,
      });

      setFile(null);
      setDescription("");

      fetchBills();
    } catch (err) {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this receipt?");

    if (!confirmDelete) return;

    try {
      await API.delete(`/bills/${id}`);

      fetchBills();
    } catch (err) {
      alert("Delete failed");
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => resolve(reader.result);

      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div>
      <Header />
      <div className="max-w-4xl p-6 mx-auto h-136 m-10 bg-white shadow rounded-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Receipts / Bills</h2>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/bills-history")}
              className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 cursor-pointer transition"
            >
              Search by date
            </button>
            <button
              onClick={() => navigate("/")}
              className="bg-[#ffa500] text-white px-4 py-2 rounded-lg hover:bg-[#ffa273] cursor-pointer transition"
            >
              Back
            </button>
          </div>
        </div>

        {/* Upload Section */}

        <div className="flex flex-col gap-3 mb-6 md:flex-row">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full p-2 border rounded"
          />

          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
          />

          <button
            onClick={handleUpload}
            className="px-4 py-2 text-white bg-orange-500 rounded cursor-pointer hover:bg-orange-600 disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>

        {/* Bills List */}

        <div className="space-y-3 overflow-y-auto max-h-95">
          {bills.map((bill) => (
            <div
              key={bill._id}
              className="flex items-center justify-between p-3 bg-gray-100 rounded"
            >
              <div>
                <p className="font-medium">{bill.date}</p>

                <p className="text-sm text-gray-600">{bill.description}</p>
              </div>

              <div className="flex gap-3">
                <a href={bill.image} className="text-blue-600 cursor-pointer">
                  View
                </a>

                <button
                  onClick={() => handleDelete(bill._id)}
                  className="text-red-600 cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Bills;
