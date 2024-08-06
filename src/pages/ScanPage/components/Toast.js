import { useEffect } from "react";
import styled from "styled-components";
import { getSpeech } from "../../../components/getSpeech";

const StyledToast = styled.div`
  position: fixed;
  bottom: 50%; /* Adjust as needed for vertical positioning */
  left: 50%;
  transform: translateX(-50%); /* Center horizontally */
  background-color: ${({ color }) =>
    color || "#101010"}; /* Use the color prop or default to black */
  color: #FF5858;
  font-size: 20px;
  font-weight :700;
  padding: 10px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  white-space: pre-line;
  text-align : center;
  z-index: 1000; /* Make sure it appears above other content */
`;
function Toast({ setToast, text }) {
  useEffect(() => {
    getSpeech(text);
    const timer = setTimeout(() => {
      setToast(false);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, [setToast]);

  return (
    <>
      <StyledToast>{text}</StyledToast>
    </>
  );
}

export default Toast;
