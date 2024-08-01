import { useNavigate } from "react-router-dom";
export function Failure() {
  const navigate = useNavigate();
  return (
    <>
      <div>실패 ㅜㅜ</div>
      <div>다시 시도하세용</div>
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
