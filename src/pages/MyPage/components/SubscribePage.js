import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { ReactComponent as SubscribeCancelBefore } from "../../../assets/images/subscribe-cancel-before.svg";
import { ReactComponent as SubscribeCancelAfter } from "../../../assets/images/subscribe-cancel-after.svg";
import { ReactComponent as SubscribeCancelMiniBefore } from "../../../assets/images/subscribe-cancel-mini-before.svg";
import { ReactComponent as SubscribeCancelMiniAfter } from "../../../assets/images/subscribe-cancel-mini-after.svg";
import { ReactComponent as CloseButtonMiniBefore } from "../../../assets/images/close-button-mini-before.svg";
import { ReactComponent as CloseButtonMiniAfter } from "../../../assets/images/close-button-mini-after.svg";
import { ReactComponent as ExclamationMark } from "../../../assets/images/Exclamation_mark.svg";
import { ReactComponent as ExclamationMark2 } from "../../../assets/images/Exclamation_mark2.svg";
import { ReactComponent as CancelComplete } from "../../../assets/images/cancel_complete.svg";
import { ReactComponent as CloseButtonMiniBefore2 } from "../../../assets/images/close-button-mini-before2.svg";
import PaymentCheckoutPage from "./PaymentCheckoutPage";
import { useRecoilValue } from "recoil";
import { getAccessTokenAtom } from "../../../recoil/atom";
import { Button } from "../../../components/Button";
import { Footer } from "../../../components/Footer";

/*
해야할 것들

1. 구독 취소를 누를 때, 호버 반영 - 완료
2. 구독 취소를 누르면 "정말 구독을 취소하시겠어요" 팝업창 구현 - 완료
*/

const SubscirbeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  margin: ${(props) => props.margin || "70px"};
`;

const SubscribeTextBox2 = styled.div`
  background-color: ${(props) =>
    props.backgroundColor || "#f9e97c"}; /* 배경색 */
  color: black;
  text-align: center;
  font-size: 40px;
  font-weight: 700;
  padding: 4px 8px;
`;

const SubscribePlan = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 55%;
  color: #f9e97c;
  border: 2.5px solid #f9e97c;
  border-radius: 15px;
  margin-bottom: 10px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;

  &:hover {
    cursor: pointer;
    background-color: #f9e97c;
    color: black;
    border-color: #f9e97c;
  }
`;

const SubscribeButton = styled.div`
  margin: 50px 0 150px 0;
  cursor: pointer;
  position: relative;
  width: 50px; /* SVG 너비에 맞춰서 설정 */
  height: 50px; /* SVG 높이에 맞춰서 설정 */
`;

const StyledSubscribeCancelBefore = styled(SubscribeCancelBefore)`
  opacity: 1;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 100px;
  transition: opacity 0.5s ease; /* 서서히 사라지는 효과 */

  ${SubscribeButton}:hover & {
    opacity: 0; /* 마우스를 올리면 사라짐 */
  }
`;

const StyledSubscribeCancelAfter = styled(SubscribeCancelAfter)`
  opacity: 0;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 100px;
  transition: opacity 0.5s ease; /* 서서히 나타나는 효과 */

  ${SubscribeButton}:hover & {
    opacity: 1; /* 마우스를 올리면 나타남 */
  }
`;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Popup = styled.div`
  background: #2d2d2d;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  color: white;
  width: 300px;
  position: relative;
`;

const PopupHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  font-weight: 1000;
  flex-direction: column; /* 요소를 세로로 정렬 */
`;

const PopupText = styled.p`
  font-size: 14px;
  margin: 10px 0;
`;

const PopupButtons = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const StyledCloseButtonMiniBefore = styled(CloseButtonMiniBefore2)`
  width: 90px;
  height: 50px;
  cursor: pointer;
`;

const StyledCloseButtonMiniAfter = styled(CloseButtonMiniAfter)`
  width: 50px;
  height: 30px;
  cursor: pointer;
`;

const StyledExclamationMark = styled(ExclamationMark)`
  width: 40px;
  height: 40px;
  margin-bottom: 15px;
`;

const StyledExclamationMark2 = styled(ExclamationMark2)`
  width: 40px;
  height: 40px;
  margin-bottom: 15px;
`;

const StyledCancelComplete = styled(CancelComplete)`
  width: 50px;
  height: 50px;
  margin-bottom: 15px;
  cursor: pointer;
`;

const SubscribePage = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isCancelPopupVisible, setCancelPopupVisible] = useState(false);
  const [isDevelopPopupVisible, setDevelopPopupVisible] = useState(false);
  const [subscribeInfo, setSubscribeInfo] = useState([]);
  const [subscribeTypeKorean, setSubscribeTypeKorean] = useState("음료");
  const [subscribePrice, setSubscribePrice] = useState(3000);
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  const handleCancelClick = () => {
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  const handleCancelSubscription = () => {
    setPopupVisible(false);
    setCancelPopupVisible(true);
  };

  const handleCloseCancelPopup = () => {
    setCancelPopupVisible(false);
  };

  const handleDevelopClick = () => {
    setDevelopPopupVisible(true);
  };

  const handleCloseDevelopPopup = () => {
    setDevelopPopupVisible(false);
  };

  useEffect(() => {
    const fetchsubScribeData = async () => {
      try {
        const response = await axios.get(
          "https://www.drinkguide.store/api/v1/members/subscribe",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log(response.data.data);
        setSubscribeInfo(response.data.data);
        if (subscribeInfo.subscribeType === "DRINK") {
          setSubscribeTypeKorean("음료");
          setSubscribePrice(3000);
        } else if (subscribeInfo.subscribeType === "DRINK_SNACK") {
          setSubscribeTypeKorean("음료+과자");
          setSubscribePrice(7000);
        }
      } catch (error) {
        console.error("실패함", error);
      }
    };
    fetchsubScribeData();
  }, []); // 구독현황 조회

  const handleNavigateToPayments = (price, type) => {
    navigate("/payments", { state: { price, type } });
    <PaymentCheckoutPage />;
  };

  return (
    <>
      <SubscirbeContainer>
        <SubscribeTextBox fontSize="24px" fontColor="#ffffff" margin="70px 0">
          내 멤버십 서비스 구독 현황
        </SubscribeTextBox>

        <SubscribeTextBox
          fontSize="20px"
          fontColor={
            subscribeInfo.subscribeType === "TRIAL" ? "#5D9EFF" : "FFFA87"
          }
          margin="5px 0"
        >
          {subscribeInfo.subscribeType === "TRIAL"
            ? "신선식품 포함 모든 기능"
            : subscribeTypeKorean}
        </SubscribeTextBox>
        <SubscribeTextBox2
          backgroundColor={
            subscribeInfo.subscribeType === "TRIAL" ? "#5D9EFF" : "FFFA87"
          }
        >
          {subscribeInfo.subscribeType === "TRIAL"
            ? "일주일 무료"
            : `월 ${subscribePrice}원`}
        </SubscribeTextBox2>
        <SubscribeTextBox
          fontSize="16px"
          fontColor="#ffffff"
          margin="10px 0 30px 0"
        >
          다음 결제 날짜 <br />
          {subscribeInfo.expirationDate}
        </SubscribeTextBox>
        <SubscribeTextBox fontSize="16px" fontColor="#ffffff" margin="20px 0">
          구독 플랜
        </SubscribeTextBox>
        <SubscribePlan
          onClick={() =>
            handleNavigateToPayments(3000, "[보이스 라벨] 음료 1개월 구독권")
          }
        >
          <span>음료</span>
          <span>3,000원</span>
        </SubscribePlan>
        <SubscribePlan
          onClick={() =>
            handleNavigateToPayments(
              7000,
              "[보이스 라벨] 음료 + 과자 1개월 구독권"
            )
          }
        >
          <span>음료 + 과자</span>
          <span>7,000원</span>
        </SubscribePlan>
        <SubscribePlan onClick={handleDevelopClick}>
          <span>음료 + 과자 + 가공식품</span>
          <span>15,000원</span>
        </SubscribePlan>
        <SubscribePlan onClick={handleDevelopClick}>
          <span>신선식품 포함 모든 기능</span>
          <span>28,000원</span>
        </SubscribePlan>
        <SubscribeButton onClick={handleCancelClick}>
          <StyledSubscribeCancelBefore />
          <StyledSubscribeCancelAfter />
        </SubscribeButton>
      </SubscirbeContainer>
      {isPopupVisible && (
        <PopupOverlay>
          <Popup>
            <PopupHeader>
              <StyledExclamationMark />
              정말 구독을 취소하시겠어요?
            </PopupHeader>
            <PopupText>
              지금 구독을 취소하더라도 {subscribeInfo.expirationDate}까지는
              서비스를 이용할 수 있습니다.
            </PopupText>
            <PopupButtons>
              <CloseButtonMiniBefore onClick={handleClosePopup} />
              <SubscribeCancelMiniBefore onClick={handleCancelSubscription} />
            </PopupButtons>
          </Popup>
        </PopupOverlay>
      )}
      {isCancelPopupVisible && (
        <PopupOverlay>
          <Popup>
            <PopupHeader>
              <StyledCancelComplete />
              <div margin="30px 0">서비스 플랜 구독이 취소 되었습니다.</div>
            </PopupHeader>
            <PopupButtons>
              <StyledCloseButtonMiniBefore onClick={handleCloseCancelPopup} />
            </PopupButtons>
          </Popup>
        </PopupOverlay>
      )}
      {isDevelopPopupVisible && (
        <PopupOverlay>
          <Popup>
            <PopupHeader>
              <StyledExclamationMark2 />
              현재 준비중인 서비스입니다. <br />
              조금만 더 기다려주세요!
            </PopupHeader>
            <PopupButtons>
              <CloseButtonMiniBefore onClick={handleCloseDevelopPopup} />
            </PopupButtons>
          </Popup>
        </PopupOverlay>
      )}
      <Footer />
    </>
  );
};

export default SubscribePage;
