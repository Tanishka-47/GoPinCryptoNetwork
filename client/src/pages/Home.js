import React, { useState } from "react";
import QRGenerator from "../components/QRGenerator";
import QRScanner from "../components/QRScanner";
import VoiceAssistant from "../components/VoiceAssistant";

function Home() {
  const [scanResult, setScanResult] = useState(null);
  const [voiceCommands, setVoiceCommands] = useState([]);

  const handleQRCodeScan = (data) => {
    try {
      const parsed = JSON.parse(data);
      setScanResult(parsed);
    } catch (err) {
      setScanResult({ raw: data });
    }
  };

  const handleVoiceCommand = (text) => {
    setVoiceCommands((prev) => [...prev, text]);

    const lower = text.toLowerCase();
    if (lower.includes("send") && lower.includes("to") && lower.includes("from")) {
      const match = lower.match(/send\s+([0-9.]+)\s+to\s+([^\s]+)\s+from\s+([^\s]+)/);
      if (match) {
        const amount = Number(match[1]);
        const receiver = match[2];
        const sender = match[3];
        setScanResult({ sender, receiver, amount, note: "Voice-assistant transaction" });
      }
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <h2>GO-PIN Dashboard</h2>

      <section style={{ border: "1px solid #ddd", padding: "16px", borderRadius: "10px", marginBottom: "16px" }}>
        <h3>QR Generator</h3>
        <QRGenerator />
      </section>

      <section style={{ border: "1px solid #ddd", padding: "16px", borderRadius: "10px", marginBottom: "16px" }}>
        <h3>QR Scanner</h3>
        <p>Scan a payment QR code to auto-fill fields.</p>
        <QRScanner onScan={handleQRCodeScan} />
        {scanResult && (
          <pre style={{ background: "#f7f7f7", padding: "8px", borderRadius: "6px", marginTop: "8px" }}>
            {JSON.stringify(scanResult, null, 2)}
          </pre>
        )}
      </section>

      <section style={{ border: "1px solid #ddd", padding: "16px", borderRadius: "10px", marginBottom: "16px" }}>
        <h3>Voice Assistant</h3>
        <p>Say "Send 0.1 to 0xAAA from 0xBBB"</p>
        <VoiceAssistant onCommand={handleVoiceCommand} />
        <div>
          <h4>Recent commands</h4>
          <ul>
            {voiceCommands.slice(-5).map((cmd, index) => (
              <li key={index}>{cmd}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Home;
