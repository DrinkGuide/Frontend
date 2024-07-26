import React, { useState, useEffect, useRef } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const Record = () => {
  const [store, setStore] = useState("");
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
      setStore((prevStore) => prevStore + newText);
      prevTranscript.current = transcript;
    }
  }, [transcript]);

  const handleRecordOn = () => {
    SpeechRecognition.startListening({ continuous: true });
  };

  const handleRecordOff = () => {
    SpeechRecognition.stopListening();
  };

  const handleChange = (event) => {
    isTyping.current = true;
    const text = event.target.value;
    if (text.length <= 255) {
      setStore(text);
    }
    isTyping.current = false;
  };

  const handleReset = () => {
    handleRecordOff();
    resetTranscript();
    setStore("");
    prevTranscript.current = "";
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <p>Microphone: {listening ? "on" : "off"}</p>
      <button onClick={handleRecordOn}>Start</button>
      <button onClick={handleRecordOff}>Stop</button>
      <button onClick={handleReset}>Reset</button>
      <p>{transcript}</p>
      <textarea
        name="store"
        placeholder="음성 혹은 타이핑을 통해 문구를 입력하세요"
        value={store}
        onChange={handleChange}
        maxLength={255}
        style={{ width: "100%", height: "100px" }}
      ></textarea>
    </div>
  );
};

export default Record;
