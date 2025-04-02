import React from 'react'
import Login from './components/login'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  )
}

export default App