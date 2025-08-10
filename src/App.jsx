import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Members from "./Members";
import Expense from "./Expense";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>خانه</div>} />
        <Route path="/Members" element={<Members />} />
        <Route path ="/Expense" element ={<Expense />} />
      </Routes>
    </Router>
  );
}
