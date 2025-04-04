import { useState } from "react"

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
        const { name, value } = e.target;
        setRegisterData((registerData) => ({
            ...registerData,
            [name]: value
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
        setRegisterData(() => ({
            ...registerData,
            state: selectedState,
            district: '',
            taluk: ''
        }))
    };

    const handleDistrictSelect = (selectedDistrict) => {
        setRegisterData(() => ({
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
        <div className="registerContainer">
            <h1>Create an account</h1>
            <form autoComplete="on" onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" placeholder="Enter your name" value={registerData.name} onChange={handleChange} required />

                <label htmlFor="number">Phone Number:</label>
                <input type="number" name="number" placeholder="Enter your number" value={registerData.number} onChange={handleChange} required />

                <label htmlFor="password">Password:</label>
                <input type="password" name="password" placeholder="Enter your password" value={registerData.password} onChange={handleChange} required />

                <label htmlFor="state">State:</label>
                <select name="state" value={registerData.state} onChange={(e) => handleStateSelect(e.target.value)} required>
                    <option >Select State</option>
                    {Object.keys(districtData).map((st) => (
                        <option key={st} value={st}>{st}</option>
                    ))}
                </select>

                <label htmlFor="district">District:</label>
                <select name="district" value={registerData.district} onChange={(e) => handleDistrictSelect(e.target.value)} required>
                    <option >Select District</option>
                    {registerData.state && districtData[registerData.state]?.map((dis) => (
                        <option key={dis} value={dis}>{dis}</option>
                    ))}
                </select>

                <label htmlFor="taluk">Select Taluk:</label>
                <select name="taluk" value={registerData.taluk} onChange={handleChange} required>
                    <option>Select Taluk</option>
                    {registerData.district && talukData[registerData.district]?.map((tal) => (
                        <option key={tal} value={tal}>{tal}</option>
                    ))}
                </select>

                <label htmlFor="buttoon">Register Here</label>
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register