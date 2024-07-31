// src/App.js
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import TeachableMachinePage from "./pages/TeachableMachinePage";
import MainPage from "./pages/MainPage/MainPage";
import FeedBackPage from "./pages/FeedBackPage";
import MyPage from "./pages/MyPage/MyPage";
import Subscribe from "./pages/MyPage/components/Subscribe";
import History from "./pages/MyPage/components/History";
import Cart from "./pages/Cart";
function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/feedback" element={<FeedBackPage />} />
      <Route path="/teachable-machine" element={<TeachableMachinePage />} />
      <Route path="/mypage" element={<MyPage />}>
        <Route path="subscribe" element={<Subscribe />} />
        <Route path="history" element={<History />} />
        <Route path="cart" element={<Cart />} />
      </Route>
    </Routes>
  );
}

export default App;
