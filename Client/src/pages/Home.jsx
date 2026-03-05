import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

import beneficiaries from "../assets/Beneficiarie.png";
import attendance from "../assets/Attendance.png";
import food from "../assets/Food.png";
import measurement from "../assets/Measurement.png";
import receipt from "../assets/Receipt.png";

const Home = () => {
  const menu = [
    { img: beneficiaries, name: "Beneficiaries", link: "/students" },
    { img: attendance, name: "Attendance", link: "/attendance" },
    { img: food, name: "Food Tracking", link: "/food" },
    { img: measurement, name: "Measurement", link: "/measurements" },
    { img: receipt, name: "Receipts/Bills", link: "/bills" },
  ];

  return (
    <>
      <Header />

      <div className="flex flex-col items-center gap-8 py-10">
        {/* Heading */}
        <p className="text-[48px] font-medium text-[#a52a2a] text-center">
          Welcome to <span className="font-bold">Child Nutrition Tracker</span>
        </p>

        {/* Cards */}
        <div className="flex flex-wrap justify-center max-w-200 gap-y-12.5 gap-x-20">
          {menu.map((item, index) => (
            <div
              key={index}
              className="
                w-50
                h-60
                bg-white
                rounded-[20px]
                shadow-[2px_2px_4px_rgba(0,0,0,0.1)]
                flex
                flex-col
                items-center
                justify-center
                gap-5
                p-5
              "
            >
              {/* Image */}
              <img
                src={item.img}
                alt={item.name}
                className="object-contain w-30 h-30"
              />

              {/* Button */}
              <Link to={item.link}>
                <button
                  className="
                    w-30
                    h-10.5
                    bg-[#ffa500]
                    text-white
                    rounded-[10px]
                    border-2 border-transparent
                    transition-all duration-200
                    hover:bg-white
                    hover:border-[#ffa500]
                    hover:text-[#a52a2a]
                    cursor-pointer
                  "
                >
                  {item.name}
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
