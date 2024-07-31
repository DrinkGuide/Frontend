import React, { useState, useEffect, useRef } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const Record = () => {
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

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <textarea
        name="title"
        placeholder="제목을 입력하세요"
        value={title}
        onChange={handleTitleChange}
        maxLength={255}
        style={{ width: "100%", height: "30px" }}
      ></textarea>

      <textarea
        name="content"
        placeholder="음성 혹은 타이핑을 통해 문구를 입력하세요"
        value={content}
        onChange={handleContentChange}
        maxLength={255}
        style={{ width: "100%", height: "200px" }}
      ></textarea>
      <p>Microphone: {listening ? "on" : "off"}</p>
      <button onClick={handleRecordOn}>Start</button>
      <button onClick={handleRecordOff}>Stop</button>
      <button onClick={handleReset}>Reset</button>
      <p>{transcript}</p>
    </div>
  );
};

export default Record;
