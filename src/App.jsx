import React from 'react'
import Login from './components/login'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App