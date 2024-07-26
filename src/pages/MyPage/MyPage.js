import React from "react";
import { Link, Outlet } from "react-router-dom";

function MyPage() {
  return (
    <div className="myPage-container">
      <h2>My Page</h2>
      <button className="subscribe-btn">
        <Link to="/mypage/subscribe">구독 현황</Link>
      </button>
      <button className="history-btn">
        <Link to="/mypage/history">구매 기록</Link>
      </button>
      <Outlet/>
    </div>
  );
}

export default MyPage;
