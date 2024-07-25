// src/App.js
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/LoginPage";
import TeachableMachine from "./pages/TeachableMachinePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/teachable-machine" element={<TeachableMachinePage />} />
      </Routes>
    </Router>
  );
}

export default App;
