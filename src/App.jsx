import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Members from "./Members";
import Expense from "./Expense";
import Summery from "./Summery";
import Reckoning from "./reckoning";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>خانه</div>} />
        <Route path="/Members" element={<Members />} />
        <Route path ="/Expense" element ={<Expense />} />
        <Route path="/Summery" element={< Summery/>} />
        <Route path="/Reckoning" element = {< Reckoning />} />
      </Routes>
    </Router>
  );
}
