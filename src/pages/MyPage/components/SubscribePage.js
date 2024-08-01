import styled from "styled-components";
import { ReactComponent as SubscribeCancel } from "../../../assets/images/subscribe-cancel.svg";
import { Footer } from "../../../components/Footer";

const SubscirbeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh; /* 화면 높이 맞춤 */
  width: 100vw; /* 화면 너비 맞춤 */
  margin: 0 auto;
  background-color: black;
`;

const SubscribeTextBox = styled.div`
  background-color: ${(props) => props.backColor || "black"};
  color: ${(props) => props.fontColor || "white"};
  text-align: center;
  font-size: ${(props) => props.fontSize};
  line-height: 150%;
  letter-spacing: -0.011em;
  font-weight: 700;
  position: relative;
  margin: ${(props) => props.margin || "0"};
`;

const SubscribeTextBox2 = styled.div`
  background-color: #F9E97C; /* 배경색 */
  color: "black";
  text-align: center;
  font-size: 40px;
  font-weight: 700;
  font-color: black;
  padding: 4px 8px;
`;

const SubscribePlan = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 55%;
  color: #F9E97C;
  border: 2.5px solid #F9E97C;
  border-radius: 15px;
  margin-bottom: 10px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
`;

const SubscribeButton = styled.div`
  margin: 50px 0 0 0;
`

const SubscribePage = () => {
  return (
    <>
      <SubscirbeContainer>
        <SubscribeTextBox fontSize="24px" fontColor="#ffffff" margin="70px 0">
          내 멤버십 서비스 구독 현황
        </SubscribeTextBox>
        <SubscribeTextBox fontSize="20px" fontColor="#ffff00" margin="5px 0">
          음료
        </SubscribeTextBox>
        <SubscribeTextBox2>
          월 3,000원
        </SubscribeTextBox2>
        <SubscribeTextBox fontSize="16px" fontColor="#ffffff" margin="10px 0 30px 0">
          다음 결제 날짜 <br />
          2024년 01월 01일
        </SubscribeTextBox>
        <SubscribeTextBox fontSize="16px" fontColor="#ffffff" margin="20px 0">
          구독 플랜
        </SubscribeTextBox>
        <SubscribePlan>
          <span>음료</span>
          <span>3,000원</span>
        </SubscribePlan>
        <SubscribePlan>
          <span>음료 + 과자</span>
          <span>7,000원</span>
        </SubscribePlan>
        <SubscribePlan>
          <span>음료 + 과자 + 가공식품</span>
          <span>15,000원</span>
        </SubscribePlan>
        <SubscribePlan>
          <span>신선식품 포함 모든 기능</span>
          <span>28,000원</span>
        </SubscribePlan>
        <SubscribeButton>
          <SubscribeCancel />
        </SubscribeButton>
      </SubscirbeContainer>
      <Footer />
    </>
  );
};

export default SubscribePage;
