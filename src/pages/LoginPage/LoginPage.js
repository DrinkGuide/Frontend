import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { Marquee } from "../../components/Marquee";
import styled from "styled-components";
import { VoiceLabelText } from "../../components/VoiceLableText";
import { ReactComponent as GoogleLogin } from "../../assets/images/google-login.svg";
import { ReactComponent as GoogleSignup } from "../../assets/images/google-signup.svg";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 655px;
  width: 393px;
  margin: 0 auto;
  background-color: black;
`;

const TextContainer = styled.div`
  padding-top: 1.03rem;
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

const FooterContainer = styled.div`
  display: block;
  background-color: #282828;
  height: 197px;
  width: 393px;
  margin: 0 auto;
  color: #ffffff;
`;
const StyledGoogleLogin = styled(GoogleLogin)`
  width: 280px;
  height: 100px;
  cursor: pointer;
`;

const StyledGoogleSignup = styled(GoogleSignup)`
  width: 280px;
  height: 100px;
  margin-top: 1rem; /* Optional: adds space between buttons */
`;

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
        <Marquee />
        <StyledGoogleLogin
          onClick={() => {
            handleGoogleLogin();
          }}
        />
        <StyledGoogleSignup />
        <Marquee />
      </LoginContainer>
      <FooterContainer>
        <div>(01811)</div>
        <div> 서울시 노원구 공릉로 232 서울과학기술대학교</div>
        <div>[대표번호 : 02-970-6114]</div>
      </FooterContainer>
    </>
  );
}

export default LoginPage;
