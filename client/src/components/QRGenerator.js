import QRCode from "qrcode";
import { useState } from "react";

function QRGenerator() {
  const [input, setInput] = useState("");
  const [qrDataUrl, setQrDataUrl] = useState("");

  const generate = async () => {
    const url = await QRCode.toDataURL(JSON.stringify({ message: input }));
    setQrDataUrl(url);
  };

  return (
    <section>
      <h2>Generate QR</h2>
      <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Payload" />
      <button onClick={generate}>Generate</button>
      {qrDataUrl && <img src={qrDataUrl} alt="QR code" />}
    </section>
  );
}

export default QRGenerator;
