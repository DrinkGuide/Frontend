import React, { useState, useRef } from "react";
import styled from "styled-components";
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
import { ReactComponent as GoUpMessageSVG } from "../../assets/images/go-up-message.svg";
import { ReactComponent as WhiteArrowBeforeSVG } from "../../assets/images/white-arrow-before.svg";
import { ReactComponent as WhiteArrowAfterSVG } from "../../assets/images/white-arrow-after.svg";

const MainContainer = styled.div`
  font-family: "Pretendard-Regular";
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw; /* 화면 너비 맞춤 */
  margin: 0 auto;
  background-color: black;
`;

const AnimationBox = styled.div`
  &.animation {
    animation-name: opacity;
    animation-duration: 5000ms;

    @keyframes opacity {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
`;
const handleScroll = () => {
  window.scrollTo({
    top: 745,
    behavior: "smooth",
  });
};

const IconWrapper = styled.div`
  position: relative;
  width: 35px; /* Adjust width as needed */
  height: 35px; /* Adjust height as needed */
  transition: margin-top 0.5s ease-in-out, margin-bottom 0.5s ease-in-out;
  margin-top: ${props => (props.isHovered ? '-15px' : '0')};
  margin-bottom: ${props => (props.isHovered ? '15px' : '0')};
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
  margin-top: 10px;
  margin-bottom: 70px;
`


const MainPage = () => {
  const navigate = useNavigate();
  const [light, setLight] = useState(true); // Recoil로 전역변수 처리해야 됨
  const [isHovered, setIsHovered] = useState(false);


  const handleScreenMode = () => {
    {
      setLight((prev) => !prev);
    }
  }; // 다크모드 on/off

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  //스크롤 버튼 활성화

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
        onClick={() => {
          navigate("/scan");
        }}
      />
      <Button
        name="피드백"
        color="#FFA858"
        onClick={() => {
          navigate("/feedback");
        }}
      />
      <Button
        name="마이페이지"
        color="#FF5858"
        onClick={() => {
          navigate("/mypage");
        }}
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

      <svg
        width="116"
        height="150"
        viewBox="0 0 116 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M109.946 29.4721L115.037 17.3229C115.13 17.0999 115.179 16.8602 115.179 16.6169V1.8447C115.179 1.17558 114.813 0.559923 114.222 0.233658C113.63 -0.0926059 112.908 -0.0760162 112.332 0.276054L105.352 4.54145L98.3732 0.276054C97.7725 -0.0907626 97.0113 -0.0907626 96.4106 0.276054L89.4314 4.54145L82.4522 0.276054C81.8514 -0.0907626 81.0903 -0.0907626 80.4896 0.276054L73.5103 4.54145L66.5311 0.276054C65.9304 -0.0907626 65.1692 -0.0907626 64.5685 0.276054L57.5893 4.54145L50.6101 0.276054C50.0093 -0.0907626 49.2482 -0.0907626 48.6475 0.276054L41.6682 4.54145L34.689 0.276054C34.0883 -0.0907626 33.3271 -0.0907626 32.7264 0.276054L25.7472 4.54145L18.768 0.277898C18.1672 -0.0889192 17.4061 -0.0889192 16.8053 0.277898L9.82613 4.5433L2.84691 0.277898C2.27044 -0.0741728 1.54845 -0.0889193 0.957054 0.235502C0.365658 0.559923 0 1.17743 0 1.8447V16.6169C0 16.8584 0.0485057 17.098 0.141786 17.3229L5.23302 29.4721V120.526L0.141786 132.678C0.0485057 132.902 0 133.141 0 133.384V148.155C0 148.824 0.365658 149.44 0.957054 149.766C1.54845 150.092 2.27044 150.076 2.84691 149.724L9.82613 145.458L16.8053 149.724C17.4061 150.09 18.1672 150.09 18.768 149.724L25.7472 145.458L32.7264 149.724C33.3271 150.09 34.0883 150.09 34.689 149.724L41.6682 145.458L48.6475 149.724C49.2482 150.09 50.0093 150.09 50.6101 149.724L57.5893 145.458L64.5685 149.724C65.1692 150.09 65.9304 150.09 66.5311 149.724L73.5103 145.458L80.4896 149.724C81.0903 150.09 81.8514 150.09 82.4522 149.724L89.4314 145.458L96.4106 149.724C96.711 149.908 97.0524 150 97.3919 150C97.7315 150 98.0729 149.908 98.3732 149.724L105.352 145.458L112.332 149.724C112.908 150.076 113.63 150.09 114.222 149.766C114.813 149.44 115.179 148.824 115.179 148.155V133.384C115.179 133.143 115.13 132.903 115.037 132.678L109.946 120.527V29.4721ZM111.447 133.749V138.924H3.73121V133.749L3.88418 133.383H111.293L111.446 133.749H111.447ZM3.73121 16.2519V11.076H111.447V16.2519L111.294 16.6188H3.88418L3.73121 16.2519ZM8.96422 93.7388V52.9889H106.214V93.7388H8.96422Z"
          fill="#FF5858"
        />
      </svg>

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
