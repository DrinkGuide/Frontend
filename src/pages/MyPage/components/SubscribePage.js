import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as SubscribeCancelBefore } from '../../../assets/images/subscribe-cancel-before.svg';
import { ReactComponent as SubscribeCancelAfter } from '../../../assets/images/subscribe-cancel-after.svg';
import { ReactComponent as SubscribeCancelMiniBefore } from '../../../assets/images/subscribe-cancel-mini-before.svg';
import { ReactComponent as SubscribeCancelMiniAfter } from '../../../assets/images/subscribe-cancel-mini-after.svg';
import { ReactComponent as CloseButtonMiniBefore } from '../../../assets/images/close-button-mini-before.svg';
import { ReactComponent as CloseButtonMiniAfter } from '../../../assets/images/close-button-mini-after.svg';
import { ReactComponent as ExclamationMark } from '../../../assets/images/Exclamation_mark.svg';
import { ReactComponent as CancelComplete } from '../../../assets/images/cancel_complete.svg';
import { Footer } from '../../../components/Footer';

/*
해야할 것들

1. 구독 취소를 누를 때, 호버 반영 - 완료
2. 구독 취소를 누르면 "정말 구독을 취소하시겠어요" 팝업창 구현 - 완료
*/

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
  margin: ${(props) => props.margin || "70px"};
`;

const SubscribeTextBox2 = styled.div`
  background-color: #F9E97C; /* 배경색 */
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

const StyledCloseButtonMiniBefore = styled(CloseButtonMiniBefore)`
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

const StyledCancelComplete = styled(CancelComplete)`
  width: 50px;
  height: 50px;
  margin-bottom: 15px;
  cursor: pointer;
`;

const SubscribePage = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isCancelPopupVisible, setCancelPopupVisible] = useState(false);

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
            <PopupText>지금 구독을 취소하더라도 2024년 01월 31일까지는 서비스를 이용할 수 있습니다.</PopupText>
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
      <Footer />
    </>
  );
};

export default SubscribePage;
