// src/App.js
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TeachableMachinePage from "./pages/TeachableMachinePage";
import MainPage from "./pages/MainPage";
import FeedBackPage from "./pages/FeedBackPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/feedback" element={<FeedBackPage />} />
      <Route path="/teachable-machine" element={<TeachableMachinePage />} />
    </Routes>
  );
}

export default App;
