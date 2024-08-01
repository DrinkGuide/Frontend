import React, { useState, useEffect, useRef } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Footer } from "../../components/Footer";
import styled from "styled-components";
import { ReactComponent as FeedBackText } from "../../assets/images/feedback-text.svg";
import { ReactComponent as SubmitButton } from "../../assets/images/submit-button.svg";
// import SubmitModal from "./components/SubmitModal";

const FeedBackContainer = styled.div`
  font-family: "Pretendard-Regular";
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 852px;
  width: 393px;
  margin: 0 auto;
  background-color: black;
`;

const TextContainer = styled.div`
  padding-top: 1.03rem;
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

  ::placeholder {
    color: #ffffff;
  }
`;

function FeedBackPage() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const isTyping = useRef(false);
  const prevTranscript = useRef("");

  useEffect(() => {
    if (!isTyping.current) {
      const newText = transcript.replace(prevTranscript.current, "");
      setContent((prevStore) => prevStore + newText);
      prevTranscript.current = transcript;
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
    if (text.length <= 255) {
      setContent(text);
    }
    isTyping.current = false;
  };

  const handleTitleChange = (event) => {
    isTyping.current = true;
    const text = event.target.value;
    if (text.length <= 100) {
      setTitle(text);
    }
    isTyping.current = false;
  };

  const handleReset = () => {
    handleRecordOff();
    resetTranscript();
    setContent("");
    prevTranscript.current = "";
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
          maxLength={255}
        ></StyledTextarea>
        <SubmitButton />
      </FeedBackContainer>
      <Footer />
    </>
  );
}

export default FeedBackPage;
