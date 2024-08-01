import { Footer } from "../../../components/Footer";
import styled from "styled-components";

const HistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 808px;
  width: 393px;
  margin: 0 auto;
  background-color: black;
`;
const HistoryTextBox = styled.div`
    color: ${(props) => props.fontColor};
    text-align: center;
    font-size: ${(props) => props.fontSize};
    line-height: 150%;
    letter-spacing: -0.011000000000000001em;
    font-weight: 700;
    position: relative;
  }
`;
const HistoryPage = () => {
  return (
    <>
      <HistoryContainer>
        <HistoryTextBox fontSize="24px" fontColor="#ffffff">
          {" "}
          구매한 상품 이력
        </HistoryTextBox>
        <HistoryTextBox fontSize="16px" fontColor="#ffffff">
          {" "}
          이번달 구매 인증
        </HistoryTextBox>
        <HistoryTextBox fontSize="16px" fontColor="#FFFA87">
          이번 달에는 구매 인증을 2회 했어요.
          <br />
          8회 더 인증 시 구독료 1,000원 할인 혜택이 있어요.
        </HistoryTextBox>
        <HistoryTextBox fontSize="16px" fontColor="#ffffff">
          구매한 상품 히스토리
        </HistoryTextBox>
      </HistoryContainer>
      <Footer />
    </>
  );
};

export default HistoryPage;
