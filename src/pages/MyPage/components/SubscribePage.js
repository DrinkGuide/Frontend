import styled from "styled-components";
import { ReactComponent as SubscribeCancel } from "../../../assets/images/subscribe-cancel.svg";
import { Footer } from "../../../components/Footer";
const SubscirbeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 808px;
  width: 393px;
  margin: 0 auto;
  background-color: black;
`;

const SubscribeTextBox = styled.div`
    background-color : ${(props) => props.backColor}; 
    color: ${(props) => props.fontColor};
    text-align: center;
    font-size: ${(props) => props.fontSize};
    line-height: 150%;
    letter-spacing: -0.011000000000000001em;
    font-weight: 700;
    position: relative;
  }
`;

const SubscribePage = () => {
  return (
    <>
      <SubscirbeContainer>
        <SubscribeTextBox fontSize="24px" fontColor="#ffffff">
          내 멤버십 서비스 구독 현황
        </SubscribeTextBox>
        <SubscribeTextBox fontSize="16px" fontColor="#5d9eff">
          신선식품 포함 모든 기능
        </SubscribeTextBox>
        <SubscribeTextBox
          fontSize="40px"
          fontColor="#101010"
          backColor="#5d9eff"
        >
          일주일 무료
        </SubscribeTextBox>
        <SubscribeTextBox fontSize="16px" fontColor="#ffffff">
          다음 결제 날짜 <br />
          2024년 01월 01일
        </SubscribeTextBox>
        <SubscribeTextBox fontSize="16px" fontColor="#ffffff">
          구독 플랜
        </SubscribeTextBox>
        <SubscribeCancel />
      </SubscirbeContainer>
      <Footer />
    </>
  );
};

export default SubscribePage;
