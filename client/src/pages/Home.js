import React from "react";
import QRGenerator from "../components/QRGenerator";
import QRScanner from "../components/QRScanner";
import VoiceAssistant from "../components/VoiceAssistant";

function Home() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>GO-PIN Dashboard</h2>
      <QRGenerator />
      <QRScanner />
      <VoiceAssistant />
    </div>
  );
}

export default Home;
