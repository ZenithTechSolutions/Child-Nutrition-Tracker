import Header from './header'
import beneficiaries from '../assets/supporting - Copy.png'
import attendance from '../assets/calendar.png'
import foodtracking from '../assets/nutrition-plan.png'
import measurement from '../assets/kpi.png'
import bill from '../assets/receipt.png'
import '../styles/home.css'
const Home=()=>{
    return(
        <>
        <Header/>
        <div className="home-container">
            <p>Welcome to <span>Child Nutrition Tracker</span></p>
            <div className="home-main">
                <div className="home-card">
                    <img src={beneficiaries} />
                    <button className='home-card-btn'>Beneficiaries</button>
                </div>
                <div className="home-card">
                    <img src={attendance} />
                    <button className='home-card-btn'>Attendance</button>
                </div>
                <div className="home-card">
                    <img src={foodtracking} />
                    <button className='home-card-btn'>Food Tracking</button>
                </div>
                <div className="home-card">
                    <img src={measurement} />
                    <button className='home-card-btn'>Measurement</button>
                </div>
                <div className="home-card">
                    <img src={bill} />
                    <button className='home-card-btn'>Recipts/Bills</button>
                </div>
            </div>

        </div>
        </>
    )
}
export default Home