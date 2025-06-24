import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from './components/header'
import Home from "./components/home"
import Login from './components/login'
import Beneficiaries from './components/beneficiaries'
import Register from './components/register'
import Bills from './components/bills'
import Attendence from './components/Attendence'

const App = () => {
  const [login, setLogin] = useState(false)
  const [text, setText] = useState("")

  return (
    <>
      <Header login={login} text={text} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/beneficiaries" element={<Beneficiaries />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/bills" element = {<Bills/>} />
      </Routes>
    </>
  )
}

export default App