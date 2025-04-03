import React from 'react'
import Login from './components/login'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Beneficiaries from './components/beneficiaries';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/beneficiaries" element={<Beneficiaries />} />
      </Routes>
    </>
  )
}

export default App