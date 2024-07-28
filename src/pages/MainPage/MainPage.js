import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Marquee } from "./components/Marquee";

function MainPage() {
  const navigate = useNavigate();
  const [light, setLight] = useState(true); //Recoil로 전역변수 처리해야 됨

  const handleScreenMode = () => {
    {
      setLight((prev) => !prev);
    }
  };

  return (
    <div
      className="main-container"
      style={{ background: light ? "white" : "black" }}
    >
      <Marquee />
      <h2 style={{ color: light ? "black" : "white" }}>Main</h2>
      <div className="button-group">
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
      <button className="light-dark-btn" onClick={handleScreenMode}>
        {light ? "밝게" : "어둡게"}
      </button>
    </div>
  );
}

export default MainPage;
