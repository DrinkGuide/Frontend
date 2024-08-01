import { useNavigate } from "react-router-dom";
export function Success() {
  const navigate = useNavigate();
  return (
    <>
      <div>성공 ㅋㅋ</div>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        처음으로
      </button>
    </>
  );
}
