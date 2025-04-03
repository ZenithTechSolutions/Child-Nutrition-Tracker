<<<<<<< Updated upstream
import Header from "./header";
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
    { img: bill, name: "Recipts/Bills", link: "bill" },
  ];
  return (
    <>
      <Header />
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
=======
import Header from './header'
import Footer from './footer'
import beneficiaries from '../assets/supporting - Copy.png'
import attendance from '../assets/calendar.png'
import foodtracking from '../assets/nutrition-plan.png'
import measurement from '../assets/kpi.png'
import bill from '../assets/receipt.png'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import '../styles/home.css'
const Home=()=>{
    const navigate = useNavigate();
    return(
        <>
        <Header/>
        <div className="home-container">
            <p>Welcome to <span>Child Nutrition Tracker</span></p>
            <div className="home-main">
                <div className="home-card">
                    <img src={beneficiaries} />
                    <button className='home-card-btn' onClick={() => navigate('/benificiaries')}>Beneficiaries</button>
                </div>
                <div className="home-card">
                    <img src={attendance} />
                    <button className='home-card-btn'onClick={() => navigate('/attendance')}>Attendance</button>
                </div>
                <div className="home-card">
                    <img src={foodtracking} />
                    <button className='home-card-btn' onClick={() => navigate('/foodtracking')}>Food Tracking</button>
                </div>
                <div className="home-card">
                    <img src={measurement} />
                    <button className='home-card-btn' onClick={() => navigate('/measurement')}>Measurement</button>
                </div>
                <div className="home-card">
                    <img src={bill} />
                    <button className='home-card-btn' onClick={() => navigate('/bills')}>Recipts/Bills</button>
                </div>
>>>>>>> Stashed changes
            </div>
        ))}
        </div>
<<<<<<< Updated upstream
      </div>
      </div>
    </>
  );
};
export default Home;
=======
        <Footer />
        </>
    )
}
export default Home
>>>>>>> Stashed changes
