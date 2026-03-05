import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import API from "../api/axios";

const FoodHistory = () => {
  const [date, setDate] = useState("");
  const [foodData, setFoodData] = useState(null);
  
  const navigate = useNavigate();
  
  const fetchFood = async () => {
    try {
      const res = await API.get(`/food/by-date?date=${date}`);

      if (!res.data) {
        alert("No food tracking found for this date");
        setFoodData(null);
        return;
      }

      setFoodData(res.data);
    } catch (err) {
      alert("No food tracking found for this date");
      setFoodData(null);
    }
  };

  return (
    <>
      <Header />

      <div className="flex justify-center px-4 my-10">
        <div className="w-full p-6 bg-white shadow-lg h-136 max-w-225 rounded-xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Food Tracking History</h2>

            <button
              onClick={() => navigate("/food")}
              className="bg-[#ffa500] text-white px-4 py-2 rounded-lg hover:bg-[#ffa273] cursor-pointer transition"
            >
              Back
            </button>
          </div>

          {/* Date Picker */}
          <div className="flex justify-center gap-4 mb-6">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="p-2 border rounded-md"
            />

            <button
              onClick={fetchFood}
              className="bg-[#ffa500] text-white px-4 py-2 rounded-lg hover:bg-[#ffa273] cursor-pointer transition"
            >
              Search
            </button>
          </div>

          {/* If Food Exists */}
          {foodData && (
            <>
              {/* Meals Display */}
              <div className="p-4 mb-6 bg-gray-100 rounded-lg mx-auto max-w-150 text-center">
                <p className="font-semibold">
                  Breakfast:{" "}
                  <span className="font-normal">
                    {foodData.meals.breakfast}
                  </span>
                </p>
                <p className="font-semibold">
                  Lunch:{" "}
                  <span className="font-normal">{foodData.meals.lunch}</span>
                </p>
                <p className="font-semibold">
                  Snacks:{" "}
                  <span className="font-normal">{foodData.meals.snacks}</span>
                </p>
              </div>

              {/* Student Table */}
              <div className="max-h-63 overflow-y-auto bg-gray-100 rounded-lg p-3 max-w-150 mx-auto">
                <div className="flex justify-between pb-2 font-bold border-b">
                  <p>Name</p>
                  <div className="flex gap-6">
                    <p>Breakfast</p>
                    <p>Lunch</p>
                    <p>Snacks</p>
                  </div>
                </div>

                {foodData.students.map((s, index) => (
                  <div
                    key={index}
                    className="flex justify-between py-2 border-b hover:bg-gray-200"
                  >
                    <p>{s.student.name}</p>

                    <div className="flex gap-10">
                      <p>{s.breakfast ? "✔" : "✘"}</p>
                      <p>{s.lunch ? "✔" : "✘"}</p>
                      <p>{s.snacks ? "✔" : "✘"}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default FoodHistory;
