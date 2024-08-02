import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { ReactComponent as MypageText } from "../../assets/images/mypage-text.svg";
import { ReactComponent as SubscribeOn } from "../../assets/images/subscribe-status.svg";
import { ReactComponent as SubscribeOff } from "../../assets/images/not-subscribe-status.svg";
import { ReactComponent as HistoryButton } from "../../assets/images/histoy-button.svg";
import { ReactComponent as SubscribeCheck } from "../../assets/images/subscribe-check.svg";
import { ReactComponent as Changing_icon_1 } from "../../assets/images/changing_icon_1.svg";
import { ReactComponent as Changing_icon_2 } from "../../assets/images/changing_icon_2.svg";
import { ReactComponent as Changing_icon_3 } from "../../assets/images/changing_icon_3.svg";
import { ReactComponent as Changing_icon_4 } from "../../assets/images/changing_icon_4.svg";
import { ReactComponent as Changing_icon_5 } from "../../assets/images/changing_icon_5.svg";
import { ReactComponent as Changing_icon_6 } from "../../assets/images/changing_icon_6.svg";
import { Button } from "../../components/Button";
import { Footer } from "../../components/Footer";
import "./MyPage.css";

const MyPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100vw;
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
`;

const SubscriptionStatus = styled.div`
  margin: 10px 0 40px 0;
`;

const PurchaseVerificationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const PurchaseVerificationItem = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${(props) => props.color || "#444"};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledMypageText = styled(MypageText)`
  width: 160px;
  margin: 70px 0;
`;

const PurchaseImageContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 15px;
  justify-content: center;
  align-items: center;
  background-color: #333;
  border-radius: 20px;
  padding: 20px;
  margin: 15px 0;
  width: 80%;
  place-items: center;
`;

const Circle = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid #444;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledSubscribeCheck = styled(SubscribeCheck)`
  margin: 40px 0 20px 0;
`;

const MyPage = () => {
  const navigate = useNavigate();
  const [subscribe, setSubscribe] = useState(false); // 기본값 false로 설정
  const [memberInfo, setMemberInfo] = useState({});

  const accessToken =
    "eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6Miwicm9sZSI6IltsaW9uNi5Ecmlua0d1aWRlLmNvbW1vbi5vYXV0aC5DdXN0b21PQXV0aDJVc2VyJDFANTViYzA3ZjVdIiwiaWF0IjoxNzIyNTkyODYzLCJleHAiOjMzMjU4NTkyODYzfQ.wFJFGaRh9e1lZU-yvPJzyl8IU1m03YnScbkD43SnA98";

  useEffect(() => {
    const fetchMemberInfoData = async () => {
      try {
        const response = await axios.get(
          "https://www.drinkguide.store/api/v1/members",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log(response.data.data);
        const memberData = response.data.data;
        setMemberInfo(memberData);
        if (
          memberData.subscribeType === "DRINK" ||
          memberData.subscribeType === "DRINK_SNACK"
        ) {
          setSubscribe(true);
        } else {
          setSubscribe(false);
        }
      } catch (error) {
        console.error("실패함", error);
      }
    };
    fetchMemberInfoData();
  }, []); // 닉네임 및 구독 정보 조회

  return (
    <>
      <MyPageContainer>
        <StyledMypageText />
        <MypageTextBox fontSize="24px" fontColor="#ffffff">
          안녕하세요, {memberInfo.nickname} 님!
        </MypageTextBox>
        <SubscriptionStatus>
          {!!subscribe ? <SubscribeOn /> : <SubscribeOff />}
        </SubscriptionStatus>
        <MypageTextBox fontSize="16px" fontColor="#ffffff" margin="100px 0">
          이번달 구매 인증
        </MypageTextBox>

        <PurchaseImageContainer>
          <Circle>
            <Changing_icon_1 />
          </Circle>
          <Circle>
            <Changing_icon_2 />
          </Circle>
          <Circle>
            <Changing_icon_3 />
          </Circle>
          <Circle>
            <Changing_icon_4 />
          </Circle>
          <Circle>
            <Changing_icon_5 />
          </Circle>
          <Circle>
            <Changing_icon_6 />
          </Circle>
          <Circle></Circle>
          <Circle></Circle>
          <Circle></Circle>
          <Circle></Circle>
        </PurchaseImageContainer>
        <MypageTextBox fontSize="16px" fontColor="#FFFA87">
          이번 달에는 구매 인증을 2회 했어요.
          <br />
          8회 더 인증 시 구독료 1,000원 할인 혜택이 있어요.
        </MypageTextBox>
        <StyledSubscribeCheck
          onClick={() => {
            navigate("/subscribe");
          }}
        />
        <HistoryButton
          onClick={() => {
            navigate("/history");
          }}
        />
      </MyPageContainer>
      <Footer />
    </>
  );
};

export default MyPage;
