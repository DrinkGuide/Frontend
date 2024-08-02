import React, { useState, useEffect, useRef } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import axios from "axios";
import { Footer } from "../../components/Footer";
import styled from "styled-components";
import { ReactComponent as FeedBackText } from "../../assets/images/feedback-text.svg";
import { Button } from "../../components/Button";
import { useLocation } from "react-router-dom";

const FeedBackContainer = styled.div`
  font-family: "Pretendard-Regular";
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh; /* 화면 높이 맞춤 */
  width: 100vw; /* 화면 너비 맞춤 */
  margin: 0 auto;
  background-color: black;
  padding-top: 129px;
`;

const TextContainer = styled.div`
  padding-top: 22px;
  padding-bottom: 64px;
  color: #ffffff;
  text-align: center;
  font-size: 1rem;
  line-height: 150%;
  letter-spacing: -0.0110000000001em;
  font-weight: 700;
  position: flex;
  left: calc(50% - 154.5px);
`;

const StyledTextarea = styled.textarea`
  box-sizing: border-box;
  padding: 20px 21px;
  height: 380px;
  width: 361px;
  background: #282828;
  border-radius: 16px;
  color: #ffffff;
  text-align: left;
  font-family: "PretendardVariable-Regular", sans-serif;
  font-size: 15px;
  line-height: 150%;
  letter-spacing: -0.011000000000000001em;
  font-weight: 400;
  border: none;
  resize: none;
  margin-bottom: 64px;

  ::placeholder {
    color: #ffffff;
  }
`;

function FeedBackPage() {
  const [content, setContent] = useState("");
  const location = useLocation();
  const accessToken =
    "eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6Miwicm9sZSI6IltsaW9uNi5Ecmlua0d1aWRlLmNvbW1vbi5vYXV0aC5DdXN0b21PQXV0aDJVc2VyJDFANTViYzA3ZjVdIiwiaWF0IjoxNzIyNTkyODYzLCJleHAiOjMzMjU4NTkyODYzfQ.wFJFGaRh9e1lZU-yvPJzyl8IU1m03YnScbkD43SnA98";

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const isTyping = useRef(false);
  const prevTranscript = useRef("");

  useEffect(() => {
    // Start listening if the browser supports it
    if (browserSupportsSpeechRecognition) {
      handleRecordOn();
    }

    // Cleanup function to stop listening when component unmounts or URL changes
    return () => {
      handleRecordOff();
    };
  }, [browserSupportsSpeechRecognition, location.pathname]);

  useEffect(() => {
    // Only update content if there is new transcript data
    if (!isTyping.current) {
      const newText = transcript.replace(prevTranscript.current, "");
      if (newText) {
        setContent((prevContent) => prevContent + newText);
        prevTranscript.current = transcript;
      }
    }
  }, [transcript]);

  const handleRecordOn = () => {
    SpeechRecognition.startListening({ continuous: true });
  };

  const handleRecordOff = () => {
    SpeechRecognition.stopListening();
  };

  const handleContentChange = (event) => {
    isTyping.current = true;
    const text = event.target.value;
    if (text.length <= 500) {
      setContent(text);
    }
    isTyping.current = false;
  };

  const handleReset = () => {
    resetTranscript(); // Ensure transcript is cleared
    setContent("");
    prevTranscript.current = "";
  };

  const handleSubmit = async () => {
    console.log("Submitting feedback...");

    try {
      const response = await axios.post(
        "https://www.drinkguide.store/api/v1/contacts",
        { content },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("Success:", response.data);
      handleReset(); // Reset the textarea after successful submission
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.statusText : error.message
      );
    }
  };

  return (
    <>
      <FeedBackContainer>
        <FeedBackText padding-top={129} />
        <TextContainer>
          <div>고객님의 의견을 들려주세요!</div>
          <div>추후 더 나은 서비스로 발전하는데 큰 도움이 됩니다.</div>
        </TextContainer>
        <StyledTextarea
          name="content"
          placeholder="서비스를 사용하면서 불편했던 점, 개선이 필요한 점 등을 작성해주세요."
          value={content}
          onChange={handleContentChange}
          maxLength={500}
        ></StyledTextarea>
        <Button name={"제출"} color={"#FFFA87"} onClick={handleSubmit} />
      </FeedBackContainer>
      <Footer />
    </>
  );
}

export default FeedBackPage;
