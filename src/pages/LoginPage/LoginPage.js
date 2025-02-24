import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Text } from "../../components/Text";
import "./Login.css";
import { Marquee } from "../../components/Marquee";
import styled from "styled-components";
import { VoiceLabelText } from "../../components/VoiceLableText";
import { ReactComponent as GoogleLoginSVG } from "../../assets/images/google-login.svg";
import { ReactComponent as GoogleLoginAfterSVG } from "../../assets/images/google-login-after.svg";
import { ReactComponent as GoogleSignup } from "../../assets/images/google-signup.svg";
import { Footer } from "../../components/Footer";
import { ScrollButton } from "../MainPage/components/ScrollButton";
import { EyeIcon } from "../MainPage/components/EyeIcon";
import { SpeechIcon } from "../MainPage/components/SpeechIcon";
import { ReactComponent as Changing_icon_1 } from "../../assets/images/changing_icon_1.svg";
import { ReactComponent as Changing_icon_2 } from "../../assets/images/changing_icon_2.svg";
import { ReactComponent as Changing_icon_3 } from "../../assets/images/changing_icon_3.svg";
import { ReactComponent as Changing_icon_4 } from "../../assets/images/changing_icon_4.svg";
import { ReactComponent as Changing_icon_5 } from "../../assets/images/changing_icon_5.svg";
import { ReactComponent as Changing_icon_6 } from "../../assets/images/changing_icon_6.svg";
import { ReactComponent as GoUpMessageSVG } from "../../assets/images/go-up-message.svg";
import { ReactComponent as WhiteArrowBeforeSVG } from "../../assets/images/white-arrow-before.svg";
import { ReactComponent as WhiteArrowAfterSVG } from "../../assets/images/white-arrow-after.svg";
import { useSetRecoilState } from "recoil";

const handleScroll = () => {
  window.scrollTo({
    top: 630,
    behavior: "smooth",
  });
};

const LoginContainer = styled.div`
  font-family: "Pretendard-Regular";
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  margin: 0 auto;
  background-color: #101010;
`;

const TextContainer = styled.div`
  margin-bottom: 51px;
  color: #101010;
  text-align: center;
  font-family: "PretendardVariable-Bold", sans-serif;
  font-size: 1rem;
  line-height: 150%;
  letter-spacing: -0.0110000000001em;
  font-weight: 700;
  position: flex;
  left: calc(50% - 154.5px);
`;


const StyledChanging_icon_1 = styled(Changing_icon_1)`
  width: auto;
  height: 150px;
`
const StyledChanging_icon_2 = styled(Changing_icon_2)`
  width: auto;
  height: 150px;
`
const StyledChanging_icon_3 = styled(Changing_icon_3)`
  width: auto;
  height: 150px;
`
const StyledChanging_icon_4 = styled(Changing_icon_4)`
  width: auto;
  height: 150px;
`
const StyledChanging_icon_5 = styled(Changing_icon_5)`
  width: auto;
  height: 150px;
`
const StyledChanging_icon_6 = styled(Changing_icon_6)`
  width: auto;
  height: 150px;
`

const IconWrapper = styled.div`
  position: relative;
  width: 35px; /* Adjust width as needed */
  height: 35px; /* Adjust height as needed */
  transition: margin-top 0.5s ease-in-out, margin-bottom 0.5s ease-in-out;
  margin-top: ${props => (props.isHovered ? '-15px' : '0')};
  margin-bottom: ${props => (props.isHovered ? '15px' : '0')};
  cursor:pointer;
`;

const WhiteArrowBefore = styled(WhiteArrowBeforeSVG)`
  position: absolute;
  width: 100%;
  height: 100%;
  transition: opacity 0.5s ease-in-out;
  opacity: ${props => (props.isHovered ? 0 : 1)};
`;

const WhiteArrowAfter = styled(WhiteArrowAfterSVG)`
  position: absolute;
  width: 100%;
  height: 100%;
  transition: opacity 0.5s ease-in-out;
  opacity: ${props => (props.isHovered ? 1 : 0)};
`;

const GoUpMessage = styled(GoUpMessageSVG)`
  margin-top: 16px;
  margin-bottom: 68px;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top :48px;
  padding-bottom:5px;
`;

const FlexContainer2 = styled.div`
  display: flex;
  align-items: center;
`;

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const ChangingIcon = () => {
  const icons = [<StyledChanging_icon_1 />, <StyledChanging_icon_2 />, <StyledChanging_icon_3 />, <StyledChanging_icon_4 />, <StyledChanging_icon_5 />, <StyledChanging_icon_6 />];
  const [currentIconIndex, setCurrentIconIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIconIndex(prevIndex => (prevIndex + 1) % icons.length);
    }, 500); // 0.5초 간격으로 아이콘 변경

    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 인터벌 정리
  }, []);

  return (
    <div>
      {icons[currentIconIndex]}
    </div>
  );
};

const LoginButton = styled.div`
  position: relative;
  width: 260px; /* Adjust width as needed */
  height: 55px;
  transition: margin-top 0.5s ease-in-out, margin-bottom 0.5s ease-in-out;
  cursor : pointer;
`;

const GoogleLogin = styled(GoogleLoginSVG)`
  position: absolute;
  width: 100%;
  height: 100%;
  transition: opacity 0.5s ease-in-out;
  opacity: ${props => (props.isHovered ? 0 : 1)};
`;


const GoogleLoginAfter = styled(GoogleLoginAfterSVG)`
  position: absolute;
  width: 100%;
  height: 100%;
  transition: opacity 0.5s ease-in-out;
  opacity: ${props => (props.isHovered ? 1 : 0)};
`;


function LoginPage() {
  const handleGoogleLogin = () => {
    window.location.href =
      "https://www.drinkguide.store/oauth2/authorization/google";
  };

  const [isHovered, setIsHovered] = useState(false);


  return (
    <>
      <LoginContainer paddingTop="129px">
        <VoiceLabelText />
        <Text color="#FFFFFF" fontSize="16px"  fontWeight="700" paddingTop="17.48px" paddingBottom="51px">
          언제 어디서나 손쉽게 음성으로 만나는 정확한 정보
        </Text>

        <Marquee paddingBottom="100px" />
        <Text color="#FFFFFF" fontSize="23px"  fontWeight="700" paddingBottom="25px">
          별도의 번거로운 회원가입 절차 없이 <br />
          구글 계정으로 만나보세요!
        </Text>

        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={scrollToTop}
        >
          <LoginButton isHovered={isHovered} onClick={() => {
            handleGoogleLogin();
          }}>
            <GoogleLogin isHovered={isHovered} />
            <GoogleLoginAfter isHovered={isHovered} />
          </LoginButton>
        </div>

        <Text
          color="#FFFFFF"
          fontSize="16px"
          paddingTop="103px"
          paddingBottom="25px"
          fontWeight="700"
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
          <Text color="#000000" fontSize="24px"  fontWeight="900" backgroundColor = "#FFFA87" paddingLeft = "3px" paddingRight="3px" paddingTop="0px" paddingBottom="0px">정확</Text>
          <Text color="#ffffff" fontSize="24px"  fontWeight="700" >하고&nbsp;</Text>
          <Text color="#000000" fontSize="24px"  fontWeight="900" backgroundColor = "#FFFA87" paddingLeft = "3px" paddingRight="3px">또박또박</Text>
          <Text color="#ffffff" fontSize="24px"  fontWeight="700" >하게</Text>
        </FlexContainer>
        <FlexContainer2>
          <Text color="#ffffff" fontSize="24px"  fontWeight="700" >그리고&nbsp;</Text>
          <Text color="#000000" fontSize="24px"  fontWeight="900" backgroundColor = "#FFFA87" paddingLeft = "3px" paddingRight="3px">손쉽게</Text>
          <Text color="#ffffff" fontSize="24px"  fontWeight="700" >!&nbsp;</Text>
        </FlexContainer2>
        {/* <div class="group-12">
          <span>
            <span class="div-span">정확</span>
            <span class="div-span4">하고 </span>
            <span class="div-span">또박또박</span>
            <span class="div-span2">
              하게
              <br />
              그리고&nbsp;
            </span>
            <span class="div-span">손쉽게</span>
            <span class="div-span4">&nbsp;!</span>
          </span>
        </div> */}
        <Text color="#FFFFFF" fontSize="16px"  paddingTop="55px">
          글자가 너무 작아서 잘 보이지 않는 크기로 적혀있거나,
          <br />
          빼곡하게 적혀 있어 눈에 잘 들어오지 않는 상품 정보를
          <br />
          정확하고 또박또박한 음성으로 손쉽게 알려드립니다.
        </Text>
        <Marquee paddingTop="145px" paddingBottom="137px"/>

        <ChangingIcon />

        <FlexContainer>
          <Text color="#000000" fontSize="24px"  fontWeight="900" backgroundColor = "#FFFA87" paddingLeft = "3px" paddingRight="3px" paddingTop="0px" paddingBottom="0px">바로바로</Text>
          <Text color="#ffffff" fontSize="24px"  fontWeight="700" >&nbsp;식별 가능한</Text>
        </FlexContainer>
        <FlexContainer2>
          <Text color="#000000" fontSize="24px"  fontWeight="900" backgroundColor = "#FFFA87" paddingLeft = "3px" paddingRight="3px">다양한 종류</Text>
          <Text color="#ffffff" fontSize="24px"  fontWeight="700" >의&nbsp;</Text>
          <Text color="#000000" fontSize="24px"  fontWeight="900" backgroundColor = "#FFFA87" paddingLeft = "3px" paddingRight="3px">상품</Text>
          <Text color="#ffffff" fontSize="24px"  fontWeight="700" >들</Text>
        </FlexContainer2>

        {/* <div class="group-12">
          <span>
            <span class="div-span">바로바로</span>
            <span class="div-span2">
              &nbsp;식별 가능한
              <br />
            </span>
            <span class="div-span3">다양한 종류</span>
            <span class="div-span4">의 </span>
            <span class="div-span5">상품</span>
            <span class="div-span6">들</span>
          </span>
        </div> */}

        <Text color="#FFFFFF" fontSize="16px" paddingTop = "55px">
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
      </LoginContainer>
      <Footer />
    </>
  );
}

export default LoginPage;
