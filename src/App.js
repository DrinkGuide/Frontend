// src/App.js
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import TeachableMachinePage from "./pages/TeachableMachinePage";
import MainPage from "./pages/MainPage/MainPage";
import FeedBackPage from "./pages/FeedBackPage/FeedBackPage";
import MyPage from "./pages/MyPage/MyPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/feedback" element={<FeedBackPage />} />
      <Route path="/teachable-machine" element={<TeachableMachinePage />} />
      <Route path="/mypage" element={<MyPage />}></Route>
    </Routes>
  );
}

export default App;
