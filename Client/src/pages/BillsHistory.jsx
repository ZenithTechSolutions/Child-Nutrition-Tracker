import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

const BillsHistory = () => {
  const [bills, setBills] = useState([]);
  const [date, setDate] = useState("");

  const navigate = useNavigate();

  const fetchBills = async (dateValue) => {
    try {
      const res = await API.get("/bills");

      if (dateValue) {
        const filtered = res.data.filter((b) => b.date === dateValue);
        setBills(filtered);
      } else {
        setBills(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  return (
    <div>
      <Header />

      <div className="max-w-4xl mx-auto my-10 bg-white p-6 rounded-xl shadow min-h-136">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Bills History
          </h2>
          <button
            onClick={() => navigate("/bills")}
            className="bg-[#ffa500] text-white px-4 py-2 rounded-lg hover:bg-[#ffa273] cursor-pointer transition"
          >
            Back
          </button>
        </div>

        <div className="flex gap-3 mb-6">
          <input
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              fetchBills(e.target.value);
            }}
            className="border p-2 rounded"
          />
        </div>

        <div className="space-y-4 ">
          {bills.map((bill) => (
            <div
              key={bill._id}
              className="flex justify-between items-center bg-gray-100 p-3 rounded"
            >
              <div>
                <p className="font-medium">{bill.date}</p>

                <p className="text-sm text-gray-600">{bill.description}</p>
              </div>

              <a href={bill.image} target="_blank" className="text-blue-600">
                View Receipt
              </a>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BillsHistory;
