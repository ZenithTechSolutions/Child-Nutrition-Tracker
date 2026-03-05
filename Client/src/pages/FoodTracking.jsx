import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import API from "../api/axios";

const FoodTracking = () => {
  const [attendance, setAttendance] = useState(null);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [popup, setPopup] = useState(false);
  const [presentStudents, setPresentStudents] = useState([]);

  const navigate = useNavigate();

  const today = new Date().toLocaleDateString("en-CA", {
    timeZone: "Asia/Kolkata",
  });

  const breakfastCombos = [
    "Idli + Sambar",
    "Dosa + Coconut Chutney",
    "Ven Pongal + Sambar",
    "Rava Upma + Banana",
    "Ragi Porridge + Milk",
    "Mini Idli + Sambar",
    "Vegetable Semiya Upma + Milk",
    "Aval (Poha) Upma + Groundnuts",
    "Adai + Jaggery",
    "Vegetable Uthappam + Coconut Chutney",
    "Others",
  ];

  const lunchCombos = [
    "Sambar Rice + Beans Poriyal",
    "Curd Rice + Carrot",
    "Tomato Rice + Boiled Egg",
    "Lemon Rice + Peanut Sundal",
    "Vegetable Khichdi + Curd",
    "Rasam Rice + Potato Fry",
    "Spinach (Keerai) Rice + Dal",
    "Vegetable Biryani + Onion Raita",
    "Dal Rice + Ghee",
    "Curd Rice + Cucumber",
    "Others",
  ];

  const snackCombos = [
    "Sundal + Banana",
    "Boiled Corn + Milk",
    "Vegetable Sandwich + Milk",
    "Mini Dosa + Chutney",
    "Kuzhi Paniyaram + Chutney",
    "Ragi Laddu + Milk",
    "Boiled Groundnuts + Banana",
    "Vegetable Cutlet + Tomato Sauce",
    "Sweet Aval + Milk",
    "Fruit Salad + Milk",
    "Others",
  ];

  const [meals, setMeals] = useState({
    breakfast: "",
    lunch: "",
    snacks: "",
  });

  const [manualFood, setManualFood] = useState({
    breakfast: "",
    lunch: "",
    snacks: "",
  });

  const [studentMeals, setStudentMeals] = useState([]);

  // 🔎 Check attendance + food on load
  useEffect(() => {
    checkAttendance();
  }, []);

  const checkAttendance = async () => {
    try {
      const res = await API.get(`/attendance/by-date?date=${today}`);

      if (!res.data) return;

      setAttendance(res.data);

      const present = res.data.records
        .filter((r) => r.status === "Present")
        .map((r) => r.student);

      setPresentStudents(present);

      // Default all checkboxes true
      const defaultStudents = present.map((s) => ({
        student: s._id,
        name: s.name,
        breakfast: true,
        lunch: true,
        snacks: true,
      }));

      setStudentMeals(defaultStudents);

      checkFoodSubmitted();
    } catch {
      setAttendance(null);
    }
  };

  const checkFoodSubmitted = async () => {
    try {
      const res = await API.get(`/food/by-date?date=${today}`);

      if (res.data) {
        setAlreadySubmitted(true);
      }
    } catch {
      setAlreadySubmitted(false);
    }
  };

  const handleCheckbox = (index, mealType) => {
    const updated = [...studentMeals];
    updated[index][mealType] = !updated[index][mealType];
    setStudentMeals(updated);
  };

  const handleSubmit = async () => {
    try {
      const finalMeals = {
        breakfast:
          meals.breakfast === "Others" ? manualFood.breakfast : meals.breakfast,
        lunch: meals.lunch === "Others" ? manualFood.lunch : meals.lunch,
        snacks: meals.snacks === "Others" ? manualFood.snacks : meals.snacks,
      };

      await API.post("/food/add", {
        meals: finalMeals,
        students: studentMeals,
      });

      alert("Food submitted successfully");
      setPopup(false);
      setAlreadySubmitted(true);
    } catch (err) {
      alert("Enter all meal details before submitting");
    }
  };

  return (
    <>
      <Header />

      <div className="flex justify-center px-4 my-10">
        <div className="w-full p-6 bg-white shadow-lg h-136 max-w-225 rounded-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Food Tracking</h2>

            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate("/food-history")}
                className="bg-[#ffa500] text-white px-4 py-2 rounded-lg hover:bg-[#ffa273] cursor-pointer transition"
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

          {/* 🚫 If attendance not marked */}
          {!attendance && (
            <div className="p-6 text-center bg-red-100 rounded-lg">
              <p className="mb-4 font-semibold">
                Please mark attendance first.
              </p>
              <button
                onClick={() => navigate("/attendance")}
                className="bg-[#ffa500] text-white px-4 py-2 rounded-lg hover:bg-[#ffa273] cursor-pointer transition"
              >
                Go to Attendance
              </button>
            </div>
          )}

          {/* 🔒 If already submitted */}
          {alreadySubmitted && attendance && (
            <div className="p-6 text-center bg-green-100 rounded-lg">
              <p className="font-semibold">Food already submitted for today.</p>
            </div>
          )}

          {/* 🍽 Show form */}
          {!alreadySubmitted && attendance && (
            <>
              {/* Meal Dropdowns */}
              <div className="grid gap-4 mb-6 md:grid-cols-3">
                {["breakfast", "lunch", "snacks"].map((type) => (
                  <div key={type}>
                    <label className="block mb-1 font-semibold capitalize">
                      {type}
                    </label>
                    <select
                      className="w-full p-2 border rounded cursor-pointer "
                      value={meals[type]}
                      onChange={(e) =>
                        setMeals({ ...meals, [type]: e.target.value })
                      }
                    >
                      <option value="">Select</option>
                      {(type === "breakfast"
                        ? breakfastCombos
                        : type === "lunch"
                          ? lunchCombos
                          : snackCombos
                      ).map((item, i) => (
                        <option key={i} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>

                    {meals[type] === "Others" && (
                      <input
                        type="text"
                        placeholder="Enter food name"
                        className="w-full p-2 mt-2 border rounded"
                        onChange={(e) =>
                          setManualFood({
                            ...manualFood,
                            [type]: e.target.value,
                          })
                        }
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Student List */}
              <div className="p-3 mb-6 overflow-y-auto bg-gray-100 rounded-lg max-h-74">
                <div className="flex justify-between pb-2 font-bold border-b">
                  <p>Name</p>
                  <div className="flex gap-6">
                    <p>Breakfast</p>
                    <p>Lunch</p>
                    <p>Snacks</p>
                  </div>
                </div>

                {studentMeals.map((s, index) => (
                  <div
                    key={index}
                    className="flex justify-between py-2 border-b"
                  >
                    <p>{s.name}</p>
                    <div className="flex gap-10">
                      {["breakfast", "lunch", "snacks"].map((meal) => (
                        <input
                          key={meal}
                          type="checkbox"
                          checked={s[meal]}
                          onChange={() => handleCheckbox(index, meal)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <button
                  onClick={() => setPopup(true)}
                  className="bg-[#ffa500] text-white px-6 py-2 rounded-lg hover:bg-[#ffa273] cursor-pointer transition"
                >
                  Submit
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Confirm Popup */}
      {popup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="p-6 text-center bg-white rounded-lg shadow-lg">
            <p className="mb-4 font-semibold">
              Confirm food tracking for today?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleSubmit}
                className="bg-[#ffa500] text-white px-4 py-2 rounded-lg cursor-pointer transition"
              >
                Confirm
              </button>
              <button
                onClick={() => setPopup(false)}
                className="px-4 py-2 text-white transition bg-gray-500 rounded-lg cursor-pointer"
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

export default FoodTracking;
