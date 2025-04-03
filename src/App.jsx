import React, { useState } from 'react'
import Login from './components/login'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Beneficiaries from './components/beneficiaries';
import Header from './components/header';

const App = () => {
  const [login,setLogin]=useState(false);
  const [text,setText]=useState("");

  return (
    <>
    <Header login={login} text={text} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setLogin={setLogin} setText={setText} />} />
        <Route path="/beneficiaries" element={<Beneficiaries />} />
      </Routes>
    </>
  )
}

export default App