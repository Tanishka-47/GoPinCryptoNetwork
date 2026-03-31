import React from "react";

function VoiceAssistant() {
  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      return alert("SpeechRecognition not supported in this browser");
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.onresult = (event) => {
      console.log("Voice Input:", event.results[0][0].transcript);
    };
    recognition.start();
  };

  return <button onClick={startListening}>Start Voice Assistant</button>;
}

export default VoiceAssistant;
