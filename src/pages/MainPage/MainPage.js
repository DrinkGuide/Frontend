import React from "react";
import { useNavigate } from "react-router-dom";
import { Marquee } from "./components/Marquee";

function MainPage() {
  const navigate = useNavigate();
  return (
    <div className="main-container" style={{ background: "black" }}>
      <Marquee />
      <h2 style={{ color: "white" }}>Main</h2>
      <button
        onClick={() => {
          navigate("/login");
        }}
      >
        login
      </button>
      <button
        onClick={() => {
          navigate("/feedback");
        }}
      >
        feed back
      </button>
      <button
        onClick={() => {
          navigate("/teachable-machine");
        }}
      >
        scan
      </button>
      <button
        onClick={() => {
          navigate("/mypage");
        }}
      >
        My Page
      </button>
    </div>
  );
}

export default MainPage;
