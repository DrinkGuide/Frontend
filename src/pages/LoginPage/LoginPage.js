import React from "react";
import { useNavigate } from "react-router-dom";
import { Text } from "../../components/Text";
import "./Login.css";
import { Marquee } from "../../components/Marquee";
import styled from "styled-components";
import { VoiceLabelText } from "../../components/VoiceLableText";
import { ReactComponent as GoogleLogin } from "../../assets/images/google-login.svg";
import { ReactComponent as GoogleSignup } from "../../assets/images/google-signup.svg";
import { Footer } from "../../components/Footer";
import { ScrollButton } from "../MainPage/components/ScrollButton";
import { EyeIcon } from "../MainPage/components/EyeIcon";
import { SpeechIcon } from "../MainPage/components/SpeechIcon";
import { ReactComponent as Changing_icon_1 } from "../../assets/images/changing_icon_1.svg";

const handleScroll = () => {
  window.scrollTo({
    top: 745,
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
background-color: black;
`;

const TextContainer = styled.div`
  margin-bottom: 40px;
  color: #ffffff;
  text-align: center;
  font-family: "PretendardVariable-Bold", sans-serif;
  font-size: 1rem;
  line-height: 150%;
  letter-spacing: -0.0110000000001em;
  font-weight: 700;
  position: flex;
  left: calc(50% - 154.5px);
`;

const StyledGoogleLogin = styled(GoogleLogin)`
    
  width: 280px;
  height: 100px;
  cursor: pointer;
`;

const StyledChanging_icon_1 = styled(Changing_icon_1)`
  width: auto;
  height: 150px;
`

function LoginPage() {
  const handleGoogleLogin = () => {
    window.location.href =
      "https://www.drinkguide.store/oauth2/authorization/google";
  };

  return (
    <>
      <LoginContainer>
        <VoiceLabelText />
        <TextContainer>
          언제 어디서나 손쉽게 음성으로 만나는 정확한 정보
        </TextContainer>
        <Marquee paddingBottom="40px" />
        <Text color="#FFFFFF" fontSize="23px" marginTop="60px" fontWeight="700">
          별도의 번거로운 회원가입 절차 없이 <br />
          구글 계정으로 만나보세요!
        </Text>
        <StyledGoogleLogin
          onClick={() => {
            handleGoogleLogin();
          }}
        />
        <Text
          color="#FFFFFF"
          fontSize="16px"
          marginTop="60px"
          paddingBottom="25px"
        >
          보이스라벨은 어떤 서비스인가요?
        </Text>
        <ScrollButton onClick={handleScroll} />
        <Marquee paddingTop="60px" paddingBottom="100px" />
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

        <StyledChanging_icon_1 />

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

        <Text color="#FFFFFF" fontSize="14px">
          과자와 음료수부터 가공식품, 과일, 채소, 생선류 등!
          <br />
          다양한 상품의 정보를 빠르게 알려드립니다.
        </Text>

        <Marquee paddingTop="137px" paddingBottom="68px" />
        <Footer />
      </LoginContainer>

    </>
  );
}

export default LoginPage;
