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
import { Text } from "../../../components/Text";


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
  background-color: #f9e97c; /* 배경색 */
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
  width: 272px;
  height: 39px;
  color: #f9e97c;
  border: 2.5px solid #f9e97c;
  border-radius: 15px;
  margin-bottom: 11px;
  padding: 0 15px 0 23px;
  font-size: 16px;
  font-weight: bold;

  &:hover {
    cursor:pointer;
    background-color: #f9e97c;
    color: black;
    border-color: #f9e97c;
  }
`;

const SubscribeButton = styled.div`
  margin: 47px 0 68px 0;
  cursor: pointer;
  position: relative;
  width: 50px; /* SVG 너비에 맞춰서 설정 */
  height: 57px; /* SVG 높이에 맞춰서 설정 */
`;

const StyledSubscribeCancelBefore = styled(SubscribeCancelBefore)`
  opacity: 1;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 57px;
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
  height: 57px;
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
  width: 361px;
  position: relative;
`;

const PopupHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
  font-weight: 1000;
  flex-direction: column; /* 요소를 세로로 정렬 */
`;

const PopupText = styled.p`
  font-size: 14px;
  margin: 0;
`;

const PopupButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 95px); /* 3개의 동일한 너비의 컬럼 생성 */
  gap: 22px;
  justify-content: center;
  align-items: center;
  place-items: center;
  margin-top: 20px;
  gap :5px;
`;

const PopupButtons2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  place-items: center;
  margin-top: 10px;
`;

const StyledCloseButtonMiniBefore = styled(CloseButtonMiniBefore2)`
  width: 95px;
  height: 39px;
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
  padding-top:31px;
  padding-bottom :22px;
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
  // const accessToken =
  //   "eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6Miwicm9sZSI6IltsaW9uNi5Ecmlua0d1aWRlLmNvbW1vbi5vYXV0aC5DdXN0b21PQXV0aDJVc2VyJDFANzhiOTY0Y2ZdIiwiaWF0IjoxNzIyNzAyODM5LCJleHAiOjMzMjU4NzAyODM5fQ.9DT5uGdI2dby-zcc5TbJyWrh2qo94aAFr-1Ntd29UKE";

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
        <SubscribeTextBox fontSize="24px" fontColor="#ffffff" margin="129px 0 59px 0">
          내 멤버십 서비스 구독 현황
        </SubscribeTextBox>
     

        <SubscribeTextBox fontSize="16px" fontColor="#FFFA87" margin="5px 0">
          {subscribeTypeKorean}
        </SubscribeTextBox>
        <SubscribeTextBox2>월 {subscribePrice}원</SubscribeTextBox2>
        <SubscribeTextBox
          fontSize="16px"
          fontColor="#ffffff"
          margin="12px 0 0 0"
        >
          다음 결제 날짜 <br />
          {subscribeInfo.expirationDate}
        </SubscribeTextBox>
        <SubscribeTextBox fontSize="16px" fontColor="#ffffff" margin="58px 0 23px 0">
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
        <SubscribePlan
          onClick={handleDevelopClick}
          // onClick={() =>
          //   handleNavigateToPayments(
          //     15000,
          //     "[보이스 라벨] 음료 + 과자 + 가공식품 1개월 구독권"
          //   )
          // }
        >
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
<<<<<<< HEAD
            <Text color="#FFFFFF" fontSize="12px"  fontWeight="500" >
              지금 구독을 취소하더라도 <br /> 
              {subscribeInfo.expirationDate}까지는 서비스를 이용할 수 있습니다.
            </Text>
=======
            <PopupText>

              지금 구독을 취소하더라도 <br/>
              {subscribeInfo.expirationDate}까지는 서비스를 이용할 수 있습니다.

            </PopupText>
>>>>>>> 407f3936c6c139fea6127ae4730766bb444de80d
            <PopupButtons>
              <Button name={"닫기"} fontSize={"15px"} color={"#FFFA87"} width={"95px"} height = {"39px"} paddingBottom = {"31px"} onClick={handleClosePopup}  />
              <Button name={"구독취소"} fontSize={"15px"} color={"#FF5858"} width={"95px"} height = {"39px"} paddingBottom = {"31px"}  onClick={handleCancelSubscription}  />
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
            <PopupButtons2>
              <StyledCloseButtonMiniBefore onClick={handleCloseCancelPopup} />
            </PopupButtons2>
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
            <PopupButtons2>
              <CloseButtonMiniBefore onClick={handleCloseDevelopPopup} />
            </PopupButtons2>
          </Popup>
        </PopupOverlay>
      )}
      <Footer />
    </>
  );
};

export default SubscribePage;
