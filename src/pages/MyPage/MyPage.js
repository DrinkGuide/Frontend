import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { ReactComponent as MypageText } from "../../assets/images/mypage-text.svg";
import { ReactComponent as SubscribeOn } from "../../assets/images/subscribe-status.svg";
import { ReactComponent as SubscribeOff } from "../../assets/images/not-subscribe-status.svg";
import { ReactComponent as HistoryButton } from "../../assets/images/histoy-button.svg";
import { ReactComponent as HistoryButtonAfter } from "../../assets/images/history-button-after.svg";
import { ReactComponent as SubscribeCheck } from "../../assets/images/subscribe-check.svg";
import { ReactComponent as SubscribeCheckAfter } from "../../assets/images/subscribe-check-after.svg";
import { ReactComponent as Changing_icon_1 } from "../../assets/images/changing_icon_1.svg";
import { ReactComponent as Changing_icon_2 } from "../../assets/images/changing_icon_2.svg";
import { ReactComponent as Changing_icon_3 } from "../../assets/images/changing_icon_3.svg";
import { ReactComponent as Changing_icon_4 } from "../../assets/images/changing_icon_4.svg";
import { ReactComponent as Changing_icon_5 } from "../../assets/images/changing_icon_5.svg";
import { ReactComponent as Changing_icon_6 } from "../../assets/images/changing_icon_6.svg";
import { Button } from "../../components/Button";
import { Footer } from "../../components/Footer";
import "./MyPage.css";
import { jwtDecode } from "jwt-decode";
import { useRecoilValue } from "recoil";
import { getAccessTokenAtom } from "../../recoil/atom";
import { Text } from "../../components/Text";

const MyPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 852px;
  width: 100vw;
  margin: 0 auto;
  background-color: #101010;
  padding-bottom:68px;
`;

const MypageTextBox = styled.div`
  color: ${(props) => props.fontColor};
  text-align: center;
  font-size: ${(props) => props.fontSize};
  line-height: 150%;
  letter-spacing: -0.011000000000000001em;
  font-weight: 700;
  position: relative;
  padding-top:23px;
`;

const SubscriptionStatus = styled.div`
  // margin: 10px 0 40px 0;
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
  padding-top:129px;
`;

const PurchaseImageContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 1fr);

  justify-content: center;
  align-items: center;
  background-color: #333;
  border-radius: 20px;
  width: 361px;
  height :152px;
  place-items: center;
`;

const Circle = styled.div`
  width: 41px;
  height: 41px;
  border: 3px solid #444;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledSubscribeCheck = styled(SubscribeCheck)`
  margin: 40px 0 20px 0;
`;

const SubscribeCheckWrapper = styled.div`
  margin: 40px 0 20px 0;
  cursor: pointer;
  width: 50%; /* 필요에 따라 크기를 조정 */
  height: 40px; /* 필요에 따라 크기를 조정 */
  position: relative;
  display: flex;
  justify-content: center;
  & svg {
    position: absolute;
    transition: opacity 0.3s ease-in-out;
  }
  & .before {
    opacity: 1;
  }
  & .after {
    opacity: 0;
  }
  &:hover .before {
    opacity: 0;
  }
  &:hover .after {
    opacity: 1;
  }
`;

const HistoryButtonWrapper = styled.div`
  margin: 20px 0;
  cursor: pointer;
  width: 50%; /* 필요에 따라 크기를 조정 */
  height: 40px; /* 필요에 따라 크기를 조정 */
  position: relative;
  display: flex;
  justify-content: center;
  & svg {
    position: absolute;
    transition: opacity 0.3s ease-in-out;
  }
  & .before {
    opacity: 1;
  }
  & .after {
    opacity: 0;
  }
  &:hover .before {
    opacity: 0;
  }
  &:hover .after {
    opacity: 1;
  }
`;

const BackButton = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  cursor: pointer;
  color: white;
  font-size: 32px;
  z-index: 2; // 다른 요소들보다 위에 표시되도록 z-index 설정
`;

const MyPage = () => {
  const navigate = useNavigate();
  const [subscribe, setSubscribe] = useState(false); // 기본값 false로 설정
  const [memberInfo, setMemberInfo] = useState({});
  const [purchaseNum, setPurchaseNum] = useState();
  const [certify, setCertify] = useState([]);
  const [icons, setIcons] = useState([]);
  const accessToken = localStorage.getItem("accessToken");
  
  let memberId;
  if (accessToken) {
    const decodedaccessToken = jwtDecode(accessToken);
    memberId = decodedaccessToken.memberId;
    console.log(memberId);
  } else {
    navigate("");
  }

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

  useEffect(() => {
    const fetchPurchaseNumInfoData = async () => {
      try {
        const response = await axios.get(
          `https://www.drinkguide.store/api/v1/purchases/${memberId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setCertify(response.data.data);
        setPurchaseNum(response.data.data.length);
        addIconArray();
      } catch (error) {
        console.error("실패함", error);
      }
    };
    fetchPurchaseNumInfoData();
  }, []); // 구매

  useEffect(() => {
    addIconArray();
  }, [certify]);

  const addIconArray = () => {
    const newIcons = certify.map((item, index) => {
      if (item === "DRINK") return <Changing_icon_2 key={index} />;
      if (item === "SNACK") return <Changing_icon_1 key={index} />;
      return null;
    });
    setIcons(newIcons);
  };

  const handleBackClick = () => {
    navigate("/"); // 메인 페이지로 이동
  };

  return (
    <>
      <MyPageContainer>
        <BackButton onClick={handleBackClick}>
          {"<"}
        </BackButton>
        <StyledMypageText />
        <Text
          color="#FFFFFF"
          fontSize="24px"
          paddingTop="70px"
          paddingBottom="17px"
          fontWeight="700"
        >
          안녕하세요, {memberInfo.nickname} 님!
        </Text>
        <SubscriptionStatus>
          {!!subscribe ? <SubscribeOn /> : <SubscribeOff />}
        </SubscriptionStatus>
        <Text
          color="#FFFFFF"
          fontSize="16px"
          paddingTop="59px"
          paddingBottom="23px"
          fontWeight="700"
        >
          이번달 구매 인증
        </Text>

        <PurchaseImageContainer>
          {icons.map((icon, index) => (
            <Circle key={index}>{icon}</Circle>
          ))}
          {[...Array(10 - icons.length)].map((_, index) => (
            <Circle key={icons.length + index}></Circle>
          ))}
        </PurchaseImageContainer>

        <Text color="#FFFA87" fontSize="16px" fontWeight="700" paddingTop="23px">
          {purchaseNum !== 10 ? (
            <>
              이번 달에는 구매 인증을 {purchaseNum}회 했어요.
              <br />
              {10 - purchaseNum}회 더 인증 시 구독료 1,000원 할인 혜택이 있어요.
            </>
          ) : (
            "10회 인증이 완료되어 1000원 할인 혜택을 받을 수 있습니다"
          )}
        </Text>
        <SubscribeCheckWrapper
          onClick={() => {
            navigate("/subscribe");
          }}
        >
          <SubscribeCheck className="before" />
          <SubscribeCheckAfter className="after" />
        </SubscribeCheckWrapper>
        <HistoryButtonWrapper
          onClick={() => {
            navigate("/history");
          }}
        >
          <HistoryButton className="before" />
          <HistoryButtonAfter className="after" />
        </HistoryButtonWrapper>
      </MyPageContainer>
      <Footer />
    </>
  );
};

export default MyPage;
