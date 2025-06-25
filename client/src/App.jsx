import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from "react-router-dom"
import axios from 'axios'
import Header from './components/header'
import Home from "./components/home"
import Login from './components/login'
import Beneficiaries from './components/beneficiaries'
import Register from './components/register'
import Attendance from './components/Attendance'
import Bills from './components/Bills'

const App = () => {
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("auth/getUser");
        setUserName(res.data.name);

        const studentres = await axios.get("/student/all");
        sessionStorage.setItem("students", JSON.stringify(studentres.data));
      } catch (err) {
        setUserName(null);
        navigate('/login');
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <Header userName={userName} setUserName={setUserName} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUserName={setUserName} />} />
        <Route path="/beneficiaries" element={<Beneficiaries />} />
        <Route path="/register" element={<Register />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/bills" element={<Bills />} />
      </Routes>
    </>
  )
}

export default App