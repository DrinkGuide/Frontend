import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import axios from "axios";
import "./Main.css";
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
import { SubscribeTypeAtom, getAccessTokenAtom } from "../../recoil/atom";
import { jwtDecode } from "jwt-decode"; // 올바른 명명된 임포트

const MainContainer = styled.div`
  font-family: "Pretendard-Regular";
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  margin: 0 auto;
  background-color: black;
`;

const handleScroll = () => {
  window.scrollTo({
    top: 710,
    behavior: "smooth",
  });
};

const handleScrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const IconWrapper = styled.div`
  position: relative;
  width: 35px; /* Adjust width as needed */
  height: 35px; /* Adjust height as needed */
  transition: margin-top 0.5s ease-in-out, margin-bottom 0.5s ease-in-out;
  margin-top: ${(props) => (props.isHovered ? "-20px" : "0")};
  margin-bottom: ${(props) => (props.isHovered ? "20px" : "0")};
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

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const MainPage = () => {
  const navigate = useNavigate();
  const [userSubscribeType, setUserSubscribeType] =
    useRecoilState(SubscribeTypeAtom);
  const [isSubscribe, setIsSubscribe] = useState(false);
  const [accessToken, setAccessToken] = useRecoilState(getAccessTokenAtom);
  const [isHovered, setIsHovered] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 로그인 후 accessToken을 localStorage에서 가져오기
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true); // 로그인 상태 업데이트
    } else {
      setIsLoggedIn(false); // 로그인 상태 업데이트
    }
  }, []);

  useEffect(() => {
    // accessToken이 업데이트되었을 때 데이터 페치
    if (accessToken) {
      const decodedAccessToken = jwtDecode(accessToken);
      console.log(decodedAccessToken);

      const fetchData = async () => {
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
          setUserSubscribeType(response.data.data.subscribeType);
          if (response.data.data.subscribeType === "DRINK") {
            setIsSubscribe(true);
          }
        } catch (error) {
          console.error("실패함", error);
        }
      };

      fetchData();
    }
  }, [accessToken, setUserSubscribeType]);

  //스크롤 버튼 활성화

  const handleButtonClick = (path) => {
    const token = localStorage.getItem("accessToken");
    console.log(token);
    if (token) {
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
        name="스캔"
        color="#FFFA87"
        onClick={() => handleButtonClick(isSubscribe ? "/scan" : "/subscribe")}
      />
      <Button
        name="피드백"
        color="#FFA858"
        onClick={() => handleButtonClick("/feedback")}
      />
      <Button
        name="마이페이지"
        color="#FF5858"
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

      <div className="group-12" id="scrollTarget">
        <div className="rectangle-33"></div>
        <div className="rectangle-34"></div>
        <div className="rectangle-35"></div>
        <div className="div">
          <span>
            <span className="div-span">정확</span>
            <span className="div-span2">하고 </span>
            <span className="div-span3">또박또박</span>
            <span className="div-span4">
              하게
              <br />
              그리고
            </span>
            <span className="div-span2"> </span>
            <span className="div-span5">손쉽게</span>
            <span className="div-span6">!</span>
          </span>
        </div>
      </div>

      <Text color="#FFFFFF" fontSize="14px" paddingTop="45px">
        글자가 너무 작아서 잘 보이지 않는 크기로 적혀있거나,
        <br />
        빼곡하게 적혀 있어 눈에 잘 들어오지 않는 상품 정보를
        <br />
        정확하고 또박또박한 음성으로 손쉽게 알려드립니다.
      </Text>
      <Marquee paddingTop="145px" paddingBottom="137px" />

      <ChangingIcon />

      <div class="group-12">
        <span>
          <span class="div-span">바로바로</span>
          <span class="div-span2">
            식별 가능한
            <br />
          </span>
          <span class="div-span3">다양한 종류</span>
          <span class="div-span4">의 </span>
          <span class="div-span5">상품</span>
          <span class="div-span6">들</span>
        </span>
      </div>

      <Text color="#FFFFFF" fontSize="14px" paddingTop="45px">
        과자와 음료수부터 가공식품, 과일, 채소, 생선류 등!
        <br />
        다양한 상품의 정보를 빠르게 알려드립니다.
      </Text>

      <Marquee paddingTop="137px" paddingBottom="68px" />

      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={scrollToTop}
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
