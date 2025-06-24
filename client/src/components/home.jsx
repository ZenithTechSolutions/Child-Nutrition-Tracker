import Footer from "./footer";
import beneficiaries from "../assets/supporting - Copy.png";
import attendance from "../assets/calendar.png";
import foodtracking from "../assets/nutrition-plan.png";
import measurement from "../assets/kpi.png";
import bill from "../assets/receipt.png";
import { Link } from "react-router-dom";
import "../styles/home.css";

const Home = () => {

  const menu = [
    { img: beneficiaries, name: "Beneficiaries", link: "beneficiaries" },
    { img: attendance, name: "Attendance", link: "attendance" },
    { img: foodtracking, name: "Food Tracking", link: "foodtracking" },
    { img: measurement, name: "Measurement", link: "measurement" },
    { img: bill, name: "Recipts/Bills", link: "bills" },
  ];

  return (
    <>
      <div className="box">
        <div className="home-container">
          <p>
            Welcome to <span>Child Nutrition Tracker</span>
          </p>
          <div className="home-main">
            {menu.map((item, index) => (
              <div key={index} className="home-card">
                <img src={item.img} alt={item.name} />
                <Link to={`/${item.link}`}>
                  <button className="home-card-btn">{item.name}</button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;