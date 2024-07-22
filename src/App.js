// src/App.js
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import TeachableMachine from "./pages/TeachableMachine";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/teachable-machine" element={<TeachableMachine />} />
      </Routes>
    </Router>
  );
}

export default App;
