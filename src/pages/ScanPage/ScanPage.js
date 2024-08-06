import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Webcam from "react-webcam";
import { useRecoilValue } from "recoil";
import {
  getAccessTokenAtom,
  scanPageColorAtom,
  scanPageProductTypeAtom,
} from "../../recoil/atom";
import * as tmImage from "@teachablemachine/image";
import { getSpeech } from "../../components/getSpeech";
import ImageSlider from "./components/ImageSlider";
import Toast from "./components/Toast";

const ScanContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100svh; /* 화면 높이 맞춤 */
  width: 100vw; /* 화면 너비 맞춤 */
  margin: 0 auto;
  background-color: #101010;
  position: relative;
    &:before {
    content: "";
    background: linear-gradient(
      to top,
      rgba(20, 20, 20, 0) 10%,
      rgba(20, 20, 20, 0.25) 25%,
      rgba(20, 20, 20, 0.5) 50%,
      rgba(20, 20, 20, 0.75) 75%,
      rgba(20, 20, 20, 0.8) 100%
    );
    position: absolute;
    top: 0;
    height: 50%;
    width: 100%;
`;

const StyledWebcam = styled(Webcam)`
  width: 100vw;
  height: 100vh;
  object-fit: cover;
`;

const TransparentBox = styled.div`
  position: absolute;
  background: none;
  width: 100%;
  z-index: 1;
`;

const BottomBox = styled(TransparentBox)`
  height: 199px;
  bottom: 0;
  color: ${(props) => props.color};
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &:before {
    content: "";
    background: linear-gradient(
      to bottom,
      rgba(20, 20, 20, 0) 10%,
      rgba(20, 20, 20, 0.25) 25%,
      rgba(20, 20, 20, 0.5) 50%,
      rgba(20, 20, 20, 0.75) 75%,
      rgba(20, 20, 20, 1) 100%
    );

    position: absolute;
    bottom: 0;
    height: 50%;
    width: 100%;
  }

  .frame-1 {
    background: ${(props) => props.color};
    border-radius: 1000px;
    border-style: solid;
    border-width: 3px;
    padding: 12px 29px;
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: center;
    align-items: center;
    width: 120px;
    margin-bottom: 10px; // Add margin-bottom to separate from ResultText
  }

  .scan-type {
    color: #101010;
    text-align: center;
    font-size: 16px;
    line-height: 150%;
    letter-spacing: -0.011em;
    font-weight: 700;
    position: relative;
  }
`;

const ResultText = styled.div`
  color: ${(props) => props.color};
  text-align: center;
  font-family: "PretendardVariable-Bold", sans-serif;
  font-size: 24px;
  line-height: 150%;
  letter-spacing: -0.011000000000000001em;
  font-weight: 700;
  position: relative;
`;

const ScanPage = () => {
  const URL = "/my_model/";
  const [model, setModel] = useState(null);
  const [result, setResult] = useState("");
  const webcamRef = useRef(null);
  const [productName, setProductName] = useState("코카콜라 제로");
  const productType = useRecoilValue(scanPageProductTypeAtom); // 화면에 보여주기 위한 hook
  const [sendProductType, setSendProductType] = useState("DRINK"); // 서버 전달용 변수
  const [clickTimeout, setClickTimeout] = useState(null);
  const [toast, setToast] = useState(false); // 토스트 메세지 상태관리
  const resultColor = useRecoilValue(scanPageColorAtom);
  const accessToken = localStorage.getItem("accessToken");
  const data = { productName: productName, productType: sendProductType };
  // const toastText =
  //   " 터치 한 번 시 인식 결과를 음성으로 안내하고 \n 터치 두 번 시 구매가 진행됩니다.";
  const toastText =
    " 한 번 터치하면 인식 결과가 나타나고, \n 두 번 터치 시 구매 기록에 저장됩니다.";

  useEffect(() => {
    const init = async () => {
      try {
        const modelURL = `${URL}model.json`;
        const metadataURL = `${URL}metadata.json`;

        const loadedModel = await tmImage.load(modelURL, metadataURL);
        setModel(loadedModel);

        const loop = async () => {
          if (webcamRef.current && webcamRef.current.video.readyState === 4) {
            const video = webcamRef.current.video;
            const predictions = await loadedModel.predict(video);
            showPredictions(predictions);
          }
          window.requestAnimationFrame(loop);
        };

        loop();
      } catch (error) {
        console.error("Error loading the model: ", error);
      }
    };
    init();
  }, [URL]);

  const showPredictions = (predictions) => {
    if (!predictions || predictions.length === 0) return;

    const maxPrediction = predictions.reduce((prev, current) =>
      prev.probability > current.probability ? prev : current
    );

    setResult(maxPrediction.className);
  };

  useEffect(() => {
    if (productType === "음료") {
      setSendProductType("DRINK");
    } else if (productType === "과자") {
      setSendProductType("SNACK");
    }
  }, [productType]);

  useEffect(() => {
    setToast(true);
    const timer = setTimeout(() => {
      setToast(false);
      getSpeech(toastText);
    }, 8000); // 1 second

    // Cleanup function to clear the timeout if the component unmounts before the timeout completes
    return () => clearTimeout(timer);
  }, []);

  const videoConstraints = {
    facingMode: "environment",
  };

  const handlePurchaseDataSubmit = async () => {
    try {
      const response = await axios.post(
        "https://www.drinkguide.store/api/v1/purchases",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("Success:", response.data);
      getSpeech(`${data.productName}를 구매합니다`);
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.statusText : error.message
      );
    }
  };

  const handleClickEvent = (event) => {
    if (productType === "음료수") {
      if (clickTimeout) {
        clearTimeout(clickTimeout);
        setClickTimeout(null);
        // Double-click detected
        handlePurchaseDataSubmit();
      } else {
        // Single click detected, set timeout to differentiate between single and double click
        const timeout = setTimeout(() => {
          // Single-click action
          getSpeech(result);
          setProductName(result);
          setClickTimeout(null);
        }, 300); // Adjust the delay as necessary to suit your needs

        setClickTimeout(timeout);
      }
    }
  };

  const handleSliderClick = (event) => {
    event.stopPropagation(); // 이벤트 전파 중단
  };

  return (
    <>
      <ScanContainer
        onClick={(event) => {
          handleClickEvent(event);
        }}
      >
        <ImageSlider onClick={handleSliderClick} />
        <StyledWebcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
        />
        {toast && <Toast setToast={setToast} text={toastText} back/>}
        <BottomBox color={resultColor}>
          <div className="frame-1">
            <div className="scan-type" style={{ color: "#101010" }}>
              {productType}
            </div>
          </div>
          <ResultText color={resultColor}>
            {productType === "음료수" ? result : "결제를 진행하세요"}
          </ResultText>
        </BottomBox>
      </ScanContainer>
    </>
  );
};

export default ScanPage;
