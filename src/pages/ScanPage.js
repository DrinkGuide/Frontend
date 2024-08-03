import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Webcam from "react-webcam";
import { useRecoilValue } from "recoil";
import { getAccessTokenAtom } from "../recoil/atom";
import * as tmImage from "@teachablemachine/image";
import { getSpeech } from "../components/getSpeech";

const ScanContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* 화면 높이 맞춤 */
  width: 100vw; /* 화면 너비 맞춤 */
  margin: 0 auto;
  background-color: #000;
  position: relative;
    &:before {
    content: "";
    background: linear-gradient(
      to bottom,
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
  width: 100%;
  height: 100%;
  transform: scaleX(-1);
  object-fit: cover;
`;

const TransparentBox = styled.div`
  position: absolute;
  background: none;
  width: 100%;
  z-index: 1;
`;

const TopBox = styled(TransparentBox)`
  height: 235px;
  color: white;
  top: 0;
  text-align: center;
  &:before {
    content: "";
    background: linear-gradient(to bottom, #000000, transparent);
    position: absolute;
    left: 0;
    height: 50%;
    width: 100%;
  }
`;

const BottomBox = styled(TransparentBox)`
  height: 199px;
  bottom: 0;
  color: #5d9eff;
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
    background: #5d9eff;
    border-radius: 1000px;
    border-style: solid;
    border-color: #5d9eff;
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
  color: #5d9eff;
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
  const [productName, setProductName] = useState("제로콜라");
  const [productType, setProductType] = useState("DRINK");

  const accessToken = useRecoilValue(getAccessTokenAtom);
  // const accessToken =
  //   "eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6Miwicm9sZSI6IltsaW9uNi5Ecmlua0d1aWRlLmNvbW1vbi5vYXV0aC5DdXN0b21PQXV0aDJVc2VyJDFANzhiOTY0Y2ZdIiwiaWF0IjoxNzIyNzAyODM5LCJleHAiOjMzMjU4NzAyODM5fQ.9DT5uGdI2dby-zcc5TbJyWrh2qo94aAFr-1Ntd29UKE";

  const data = { productName: productName, productType: productType };

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

  useEffect(() => {
    getSpeech(result);
  }, [result]);

  const showPredictions = (predictions) => {
    if (!predictions || predictions.length === 0) return;

    const maxPrediction = predictions.reduce((prev, current) =>
      prev.probability > current.probability ? prev : current
    );

    setResult(maxPrediction.className);

    predictions.forEach((prediction) => {
      console.log(
        `${prediction.className}: ${prediction.probability.toFixed(2)}`
      );
    });
  };

  const videoConstraints = {
    facingMode: "environment",
  };

  const handlePurchaseDataSubmit = async () => {
    try {
      const response = await axios.post(
        "https://www.drinkguide.store/api/v1/purchases",
        { data },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("Success:", response.data);
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.statusText : error.message
      );
    }
  };

  return (
    <>
      <ScanContainer
        onDoubleClick={() => {
          console.log("Double click detected");
          handlePurchaseDataSubmit();
        }}
      >
        <TopBox>안녕하세요</TopBox>
        <StyledWebcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
        />
        <BottomBox>
          <div className="frame-1">
            <div
              className="scan-type"
              style={{ color: "#101010", background: "#5d9eff" }}
            >
              음료수
            </div>
          </div>
          <ResultText>{result}</ResultText>
        </BottomBox>
      </ScanContainer>
    </>
  );
};

export default ScanPage;
