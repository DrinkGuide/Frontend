import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import LoginPage from "./pages/LoginPage/LoginPage";
import MainPage from "./pages/MainPage/MainPage";
import FeedBackPage from "./pages/FeedBackPage/FeedBackPage";
import MyPage from "./pages/MyPage/MyPage";
import ScanPage from "./pages/ScanPage";
import HistoryPage from "./pages/MyPage/components/HistoryPage";
import SubscribePage from "./pages/MyPage/components/SubscribePage";
import PaymentCheckoutPage from "./pages/MyPage/components/PaymentCheckoutPage";
import Success from "./pages/MyPage/components/Success";
import { Failure } from "./pages/MyPage/components/Failure";
import useAuth from "./hooks/useAuth";

function App() {
  // useAuth();
  return (
    <div>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/feedback" element={<FeedBackPage />} />
        <Route path="/scan" element={<ScanPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/subscribe" element={<SubscribePage />} />
        <Route path="/payments" element={<PaymentCheckoutPage />} />
        <Route path="/success" element={<Success />} />
        <Route path="/fail" element={<Failure />} />
      </Routes>
    </div>
  );
}

export default App;
