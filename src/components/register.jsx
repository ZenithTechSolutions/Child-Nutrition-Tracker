import { useState } from "react"
import { Link } from 'react-router-dom'
import '../styles/register.css'

const Register = () => {
    const [registerData, setRegisterData] = useState({
        name: '',
        number: '',
        password: '',
        state: '',
        district: '',
        taluk: ''
    })

    const handleChange = (e) => {
        const { id, value } = e.target;
        setRegisterData((registerData) => ({
            ...registerData,
            [id]: value
        }))
    }

    const districtData = {
        "Andhra Pradesh": ["Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", "Nellore", "Prakasam", "Srikakulam", "Visakhapatnam", "Vizianagaram", "West Godavari", "YSR Kadapa"],
        "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem", "Tiruchirappalli", "Erode", "Tirunelveli", "Vellore", "Thoothukudi", "Dindigul"],
        "Karnataka": ["Bengaluru Urban", "Mysuru", "Belagavi", "Kalaburagi", "Mangaluru", "Shivamogga", "Davanagere", "Ballari", "Hubballi-Dharwad", "Tumakuru"],
        "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Aurangabad", "Solapur", "Kolhapur", "Amravati", "Sangli"]
    };

    const talukData = {
        "Chennai": ["Egmore", "Guindy", "Mylapore", "Tondiarpet", "Velachery"],
        "Coimbatore": ["Gandhipuram", "Peelamedu", "Singanallur", "RS Puram", "Sulur"],
        "Bengaluru Urban": ["Yelahanka", "KR Puram", "Jayanagar", "Rajajinagar", "Basavanagudi"],
        "Mumbai": ["Andheri", "Borivali", "Dadar", "Kurla", "Mulund"],
        "Pune": ["Haveli", "Shirur", "Daund", "Mulshi", "Bhor"]
    };

    const handleStateSelect = (selectedState) => {
        setRegisterData((registerData) => ({
            ...registerData,
            state: selectedState,
            district: '',
            taluk: ''
        }))
    };

    const handleDistrictSelect = (selectedDistrict) => {
        setRegisterData((registerData) => ({
            ...registerData,
            district: selectedDistrict,
            taluk: ''
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const newData = await fetch("https://child-nutrition-tracker-backend.onrender.com", {
                method: "POST",
                headers: {
                    "content-Type": 'application/json'
                },
                body: JSON.stringify(registerData)
            })
            const data = await newData.json();
            alert(data.Message)
        }
        catch (err) {
            console.log('error:', err)
            alert(err)
        }
    }

    return (
        <div className="Register-container">
            <div className="Register-left-container">
                <h1>Child Nutrition Tracker</h1>
                <p>A System to track Child Nutrition in Anganwadis</p>
            </div>
            <div className="Register-right-container">
                <h1>Create an account</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" placeholder="Enter your name" value={registerData.name} onChange={handleChange} required />

                    <label htmlFor="number">Phone Number:</label>
                    <input type="tel" id="number" placeholder="Enter your number" value={registerData.number} onChange={handleChange} pattern="[0-9]{10}" title="Phone number must be exactly 10 digits" required />

                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" placeholder="Enter your password" value={registerData.password} onChange={handleChange} required />

                    <label htmlFor="state">State:</label>
                    <select id="state" value={registerData.state} onChange={(e) => handleStateSelect(e.target.value)} required>
                        <option >Select State</option>
                        {Object.keys(districtData).map((st) => (
                            <option key={st} value={st}>{st}</option>
                        ))}
                    </select>

                    <label htmlFor="district">District:</label>
                    <select id="district" value={registerData.district} onChange={(e) => handleDistrictSelect(e.target.value)} required>
                        <option >Select District</option>
                        {registerData.state && districtData[registerData.state]?.map((dis) => (
                            <option key={dis} value={dis}>{dis}</option>
                        ))}
                    </select>

                    <label htmlFor="taluk">Select Taluk:</label>
                    <select id="taluk" value={registerData.taluk} onChange={handleChange} required>
                        <option>Select Taluk</option>
                        {registerData.district && talukData[registerData.district]?.map((tal) => (
                            <option key={tal} value={tal}>{tal}</option>
                        ))}
                    </select>

                    <button type="submit">Register</button>

                    <p>Already have a Account?<Link to='/login'> Login Here</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Register