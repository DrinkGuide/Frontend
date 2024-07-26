import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    let copy = transcript;
    setStore(copy);
  }, [transcript]);

  const handleRecordOn = () => {
    SpeechRecognition.startListening({ continuous: true });
  };

  const handleRecordOff = () => {
    SpeechRecognition.stopListening();
  };

  const handleChange = (event) => {
    const text = event.target.value;
    if (text.length <= 255) {
      setStore(text);
    }
  };

  const handleReset = () => {
    handleRecordOff();
    resetTranscript();
    setStore("");
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
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
      ></textarea>
    </div>
  );
};
export default Record;
