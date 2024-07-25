import React from "react";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const navigate = useNavigate();
  return (
    <div className="main-container">
      <h2>Main</h2>
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
    </div>
  );
}

export default MainPage;
