import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as MypageText } from "../../assets/images/mypage-text.svg";
import { ReactComponent as SubscribeOn } from "../../assets/images/subscribe-status.svg";
import { ReactComponent as SubscribeOff } from "../../assets/images/not-subscribe-status.svg";
import { ReactComponent as HistoryButton } from "../../assets/images/histoy-button.svg";
import { ReactComponent as SubscribeCheck } from "../../assets/images/subscribe-check.svg";
import { Footer } from "../../components/Footer";
import "./MyPage.css";

const MyPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 852px;
  width: 393px;
  margin: 0 auto;
  background-color: black;
`;
const MypageTextBox = styled.div`
    color: ${(props) => props.fontColor};
    text-align: center;
    font-size: ${(props) => props.fontSize};
    line-height: 150%;
    letter-spacing: -0.011000000000000001em;
    font-weight: 700;
    position: relative;
  }
`;

const MyPage = () => {
  const navigate = useNavigate();
  const [subscribe, setSubscribe] = useState(false);

  return (
    <>
      <MyPageContainer>
        <MypageText />
        <MypageTextBox fontSize="24px" fontColor="#ffffff">
          안녕하세요, 홍길동 님!
        </MypageTextBox>
        {subscribe ? <SubscribeOn /> : <SubscribeOff />}
        <MypageTextBox fontSize="16px" fontColor="#ffffff">
          이번달 구매 인증
        </MypageTextBox>
        {/* <div className="rectangle-37">
          <div className="group-16">
            <div className="ellipse-5"></div>
            <div className="ellipse-10"></div>
            <div className="ellipse-6"></div>
            <div className="ellipse-11"></div>
            <div className="ellipse-7"></div>
            <div className="ellipse-12"></div>
            <div className="ellipse-8"></div>
            <div className="ellipse-13"></div>
            <div className="ellipse-9"></div>
            <div className="ellipse-14"></div>
          </div>
        </div> */}
        <MypageTextBox fontColor="#FFFA87">
          이번 달에는 구매 인증을 2회 했어요.
          <br />
          8회 더 인증 시 구독료 1,000원 할인 혜택이 있어요.
        </MypageTextBox>
        <SubscribeCheck />
        <HistoryButton />
      </MyPageContainer>
      <Footer />
    </>
  );
};

export default MyPage;
