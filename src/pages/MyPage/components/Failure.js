import { useNavigate } from "react-router-dom";
export function Failure() {
  const navigate = useNavigate();
  return (
    <>
      <div>결제에 실패하셨습니다</div>
      <button
        onClick={() => {
          navigate("/subscribe");
        }}
      >
        결제창으로
      </button>
    </>
  );
}
