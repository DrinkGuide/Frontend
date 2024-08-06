import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { VoiceLabelText } from "../../components/VoiceLableText";
import { Marquee } from "../../components/Marquee";
import { Button } from "../../components/Button";
import { Text } from "../../components/Text";
import { EyeIcon } from "./components/EyeIcon";
import { SpeechIcon } from "./components/SpeechIcon";
import { Footer } from "../../components/Footer";
import { ScrollButton } from "./components/ScrollButton";
import { ReactComponent as Changing_icon_1 } from "../../assets/images/changing_icon_1.svg";
import { ReactComponent as Changing_icon_2 } from "../../assets/images/changing_icon_2.svg";
import { ReactComponent as Changing_icon_3 } from "../../assets/images/changing_icon_3.svg";
import { ReactComponent as Changing_icon_4 } from "../../assets/images/changing_icon_4.svg";
import { ReactComponent as Changing_icon_5 } from "../../assets/images/changing_icon_5.svg";
import { ReactComponent as Changing_icon_6 } from "../../assets/images/changing_icon_6.svg";
import { ReactComponent as GoUpMessageSVG } from "../../assets/images/go-up-message.svg";
import { ReactComponent as WhiteArrowBeforeSVG } from "../../assets/images/white-arrow-before.svg";
import { ReactComponent as WhiteArrowAfterSVG } from "../../assets/images/white-arrow-after.svg";
import { SubscribeTypeAtom } from "../../recoil/atom";
import { useRecoilState } from "recoil";
import { jwtDecode } from "jwt-decode";

const MainContainer = styled.div`
  font: "Pretendard-Regular";
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  margin: 0 auto;
  background-color: #101010;
`;

const handleScroll = () => {
  window.scrollTo({ top: 710, behavior: "smooth" });
};

const handleScrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const IconWrapper = styled.div`
  position: relative;
  width: 35px;
  height: 35px;
  transition: margin-top 0.5s ease-in-out, margin-bottom 0.5s ease-in-out;
  margin-top: ${(props) => (props.isHovered ? "-20px" : "0")};
  margin-bottom: ${(props) => (props.isHovered ? "20px" : "0")};
  cursor: pointer;
`;

const WhiteArrowBefore = styled(WhiteArrowBeforeSVG)`
  position: absolute;
  width: 100%;
  height: 100%;
  transition: opacity 0.5s ease-in-out;
  opacity: ${(props) => (props.isHovered ? 0 : 1)};
`;

const WhiteArrowAfter = styled(WhiteArrowAfterSVG)`
  position: absolute;
  width: 100%;
  height: 100%;
  transition: opacity 0.5s ease-in-out;
  opacity: ${(props) => (props.isHovered ? 1 : 0)};
`;

const GoUpMessage = styled(GoUpMessageSVG)`
  margin-top: 10px;
  margin-bottom: 70px;
`;

const StyledChanging_icon_1 = styled(Changing_icon_1)`
  width: auto;
  height: 150px;
`;
const StyledChanging_icon_2 = styled(Changing_icon_2)`
  width: auto;
  height: 150px;
`;
const StyledChanging_icon_3 = styled(Changing_icon_3)`
  width: auto;
  height: 150px;
`;
const StyledChanging_icon_4 = styled(Changing_icon_4)`
  width: auto;
  height: 150px;
`;
const StyledChanging_icon_5 = styled(Changing_icon_5)`
  width: auto;
  height: 150px;
`;
const StyledChanging_icon_6 = styled(Changing_icon_6)`
  width: auto;
  height: 150px;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 48px;
  padding-bottom: 5px;
`;

const FlexContainer2 = styled.div`
  display: flex;
  align-items: center;
`;

const ChangingIcon = () => {
  const icons = [
    <StyledChanging_icon_1 />,
    <StyledChanging_icon_2 />,
    <StyledChanging_icon_3 />,
    <StyledChanging_icon_4 />,
    <StyledChanging_icon_5 />,
    <StyledChanging_icon_6 />,
  ];
  const [currentIconIndex, setCurrentIconIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIconIndex((prevIndex) => (prevIndex + 1) % icons.length);
    }, 500); // 0.5초 간격으로 아이콘 변경

    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 인터벌 정리
  }, []);

  return <div>{icons[currentIconIndex]}</div>;
};

const MainPage = () => {
  const navigate = useNavigate();
  const [userSubscribeType, setUserSubscribeType] =
    useRecoilState(SubscribeTypeAtom);
  const [isSubscribe, setIsSubscribe] = useState(false);
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken") || ""
  );
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAccessToken(token);
    } else {
      setAccessToken("");
    }
  }, []);

  useEffect(() => {
    if (accessToken) {
      console.log("Access Token:", accessToken);
      const decodedAccessToken = jwtDecode(accessToken);
      console.log(decodedAccessToken);

      const fetchData = async () => {
        try {
          const response = await axios.get(
            "https://www.drinkguide.store/api/v1/members/subscribe",
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          );
          console.log(response.data.data);
          setUserSubscribeType(response.data.data.subscribeType);

          const subscribeType = response.data.data.subscribeType;
          if (["DRINK", "TRIAL", "DRINK_SNACK"].includes(subscribeType)) {
            setIsSubscribe(true);
          }
        } catch (error) {
          console.error("API 호출 실패", error);
        }
      };

      fetchData();
    }
  }, [accessToken, setUserSubscribeType]);

  const handleButtonClick = (path) => {
    if (accessToken) {
      navigate(path);
    } else {
      navigate("/signin");
    }
  };
  return (
    <MainContainer paddingTop="129px">
      <VoiceLabelText />
      <Text color="#FFFFFF" fontSize="16px" paddingTop="17.48px">
        언제 어디서나 손쉽게 음성으로 만나는 정확한 정보
      </Text>
      <Marquee paddingTop="51px" paddingBottom="63.78px" />
      <Button
        name="상품 스캔"
        color="#FFFA87"
        width="214px"
        height="57px"
        marginBottom="25px"
        fontSize="24px"
        onClick={() => handleButtonClick(isSubscribe ? "/scan" : "/subscribe")}
      />
      <Button
        name="피드백"
        color="#FFA858"
        width="214px"
        height="57px"
        marginBottom="25px"
        fontSize="24px"
        onClick={() => handleButtonClick("/feedback")}
      />
      <Button
        name="마이페이지"
        color="#FF5858"
        width="214px"
        height="57px"
        fontSize="24px"
        marginBottom="25px"
        onClick={() => handleButtonClick("/mypage")}
      />
      <Text
        color="#FFFFFF"
        fontSize="16px"
        paddingTop="40px"
        paddingBottom="25px"
      >
        보이스라벨은 어떤 서비스인가요?
      </Text>
      <ScrollButton onClick={handleScroll} />
      <Marquee paddingTop="65px" paddingBottom="145px" />

      <span>
        <EyeIcon />
        <SpeechIcon />
      </span>

      <FlexContainer>
        <Text
          color="#000000"
          fontSize="24px"
          fontWeight="900"
          backgroundColor="#FFFA87"
          paddingLeft="3px"
          paddingRight="3px"
          paddingTop="0px"
          paddingBottom="0px"
        >
          정확
        </Text>
        <Text color="#ffffff" fontSize="24px" fontWeight="700">
          하고&nbsp;
        </Text>
        <Text
          color="#000000"
          fontSize="24px"
          fontWeight="900"
          backgroundColor="#FFFA87"
          paddingLeft="3px"
          paddingRight="3px"
        >
          또박또박
        </Text>
        <Text color="#ffffff" fontSize="24px" fontWeight="700">
          하게
        </Text>
      </FlexContainer>
      <FlexContainer2>
        <Text color="#ffffff" fontSize="24px" fontWeight="700">
          그리고&nbsp;
        </Text>
        <Text
          color="#000000"
          fontSize="24px"
          fontWeight="900"
          backgroundColor="#FFFA87"
          paddingLeft="3px"
          paddingRight="3px"
        >
          손쉽게
        </Text>
        <Text color="#ffffff" fontSize="24px" fontWeight="700">
          !&nbsp;
        </Text>
      </FlexContainer2>

      <Text color="#FFFFFF" fontSize="14px" paddingTop="55px">
        글자가 너무 작아서 잘 보이지 않는 크기로 적혀있거나,
        <br />
        빼곡하게 적혀 있어 눈에 잘 들어오지 않는 상품 정보를
        <br />
        정확하고 또박또박한 음성으로 손쉽게 알려드립니다.
      </Text>
      <Marquee paddingTop="145px" paddingBottom="137px" />

      <ChangingIcon />

      <FlexContainer>
        <Text
          color="#000000"
          fontSize="24px"
          fontWeight="900"
          backgroundColor="#FFFA87"
          paddingLeft="3px"
          paddingRight="3px"
          paddingTop="0px"
          paddingBottom="0px"
        >
          바로바로
        </Text>
        <Text color="#ffffff" fontSize="24px" fontWeight="700">
          &nbsp;식별 가능한
        </Text>
      </FlexContainer>
      <FlexContainer2>
        <Text
          color="#000000"
          fontSize="24px"
          fontWeight="900"
          backgroundColor="#FFFA87"
          paddingLeft="3px"
          paddingRight="3px"
        >
          다양한 종류
        </Text>
        <Text color="#ffffff" fontSize="24px" fontWeight="700">
          의&nbsp;
        </Text>
        <Text
          color="#000000"
          fontSize="24px"
          fontWeight="900"
          backgroundColor="#FFFA87"
          paddingLeft="3px"
          paddingRight="3px"
        >
          상품
        </Text>
        <Text color="#ffffff" fontSize="24px" fontWeight="700">
          들
        </Text>
      </FlexContainer2>

      <Text color="#FFFFFF" fontSize="14px" paddingTop="55px">
        과자와 음료수부터 가공식품, 과일, 채소, 생선류 등!
        <br />
        다양한 상품의 정보를 빠르게 알려드립니다.
      </Text>

      <Marquee paddingTop="137px" paddingBottom="68px" />

      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleScrollToTop}
      >
        <IconWrapper isHovered={isHovered}>
          <WhiteArrowBefore isHovered={isHovered} />
          <WhiteArrowAfter isHovered={isHovered} />
        </IconWrapper>
      </div>
      <GoUpMessage />
      <Footer />
    </MainContainer>
  );
};

export default MainPage;
