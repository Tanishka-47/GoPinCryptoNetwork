import React, { useState } from "react";

function VoiceAssistant({ onCommand }) {
  const [status, setStatus] = useState("idle");

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      return alert("SpeechRecognition not supported in this browser");
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setStatus("listening");
    recognition.onend = () => setStatus("idle");

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      if (onCommand) onCommand(text);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setStatus("error");
    };

    recognition.start();
  };

  return (
    <div style={{ margin: "1rem 0" }}>
      <button onClick={startListening} disabled={status === "listening"}>
        {status === "listening" ? "Listening..." : "Start Voice Assistant"}
      </button>
      <small style={{ marginLeft: "1rem" }}>Status: {status}</small>
    </div>
  );
}

export default VoiceAssistant;
