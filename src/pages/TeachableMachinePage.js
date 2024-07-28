import React, { useRef, useState, useEffect, useCallback } from "react";
import Webcam from "react-webcam";
import * as tmImage from "@teachablemachine/image";
import { getSpeech } from "../components/getSpeech";
// import { useSpeechSynthesis } from "react-speech-kit";

const TeachableMachinePage = () => {
  const URL = "/my_model/"; // 모델 파일 경로 설정 (public/my_model/ 기준)
  const [model, setModel] = useState(null);
  const [result, setResult] = useState("");
  const webcamRef = useRef(null);

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
            showPredictions(predictions); // 예측 결과를 실시간으로 보여줍니다.
          }
          window.requestAnimationFrame(loop);
        };

        loop(); // 최초 한 번 실행
      } catch (error) {
        console.error("Error loading the model: ", error);
      }
    };

    init();
  }, [URL]); // URL이 변경될 때마다 새로운 모델을 로드합니다.

  useEffect(() => {
    getSpeech(result);
  }, [result]); // result(teachable machine의 결과)가 변경될 때마다 result 값을 음성으로 출력

  const showPredictions = (predictions) => {
    if (!predictions || predictions.length === 0) return;

    const maxPrediction = predictions.reduce((prev, current) =>
      prev.probability > current.probability ? prev : current
    );

    setResult(maxPrediction.className);

    // 각 예측 결과의 확률 콘솔에 출력
    predictions.forEach((prediction) => {
      console.log(
        `${prediction.className}: ${prediction.probability.toFixed(2)}`
      );
    });
  };

  const videoConstraints = {
    facingMode: "environment", // 후면 카메라 사용
  };

  return (
    <div>
      <h1>Teachable Machine Image Model</h1>
      <div id="webcam-container">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          style={{ transform: "scaleX(-1)" }} //webcam 좌우반전
        />
      </div>
      <div id="label-container">
        <h2>분류 결과:</h2>
        <p>{result}</p>
      </div>
      <button className="save-scan-btn">save</button>
    </div>
  );
};

export default TeachableMachinePage;
