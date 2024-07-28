import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

function MyPage() {
  const navigate = useNavigate();
  return (
    <div className="myPage-container">
      <h2>My Page</h2>
      <button
        className="subscribe-btn"
        onClick={() => {
          navigate("/mypage/subscribe");
        }}
      >
        구독 현황
      </button>
      <button
        className="history-btn"
        onClick={() => {
          navigate("/mypage/history");
        }}
      >
        구매 기록
      </button>
      <button
        className="history-btn"
        onClick={() => {
          navigate("/mypage/cart");
        }}
      >
        장바구니
      </button>
      <Outlet />
    </div>
  );
}

export default MyPage;
