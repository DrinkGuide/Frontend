// src/App.js
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import LoginPage from "./pages/LoginPage/LoginPage";
import TeachableMachinePage from "./pages/TeachableMachinePage";
import MainPage from "./pages/MainPage/MainPage";
import FeedBackPage from "./pages/FeedBackPage/FeedBackPage";
import MyPage from "./pages/MyPage/MyPage";
import HistoryPage from "./pages/MyPage/components/HistoryPage";
import SubscribePage from "./pages/MyPage/components/SubscribePage";
import PaymentCheckoutPage from "./pages/MyPage/components/PaymentCheckoutPage";
import Success from './pages/MyPage/components/Success';
function App() {
  return (
    <div>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/feedback" element={<FeedBackPage />} />
        <Route path="/teachable-machine" element={<TeachableMachinePage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/subscribe" element={<SubscribePage />} />
        <Route path="/payments" element={<PaymentCheckoutPage />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </div>
  );
}

export default App;
