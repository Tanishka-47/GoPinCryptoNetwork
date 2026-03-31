import { useEffect, useState, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";

function QRScanner({ onScan }) {
  const [active, setActive] = useState(false);
  const [error, setError] = useState("");
  const scannerRef = useRef(null);

  useEffect(() => {
    let html5QrCode;

    const startScanner = async () => {
      setError("");
      const elementId = "qr-reader";
      try {
        html5QrCode = new Html5Qrcode(elementId);
        scannerRef.current = html5QrCode;

        await html5QrCode.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: 300 },
          (decodedText) => {
            onScan && onScan(decodedText);
            stopScanner();
          },
          (err) => {
            console.debug("QR scan progress", err);
          }
        );
        setActive(true);
      } catch (e) {
        setError(`QR Scanner error: ${e.message || e}`);
      }
    };

    if (active && !scannerRef.current) {
      startScanner();
    }

    return () => {
      if (html5QrCode) {
        html5QrCode.stop().catch(() => null);
      }
    };
  }, [active, onScan]);

  const startScanner = () => setActive(true);
  const stopScanner = () => {
    setActive(false);
    if (scannerRef.current) {
      scannerRef.current.stop().catch(() => null);
      scannerRef.current.clear();
      scannerRef.current = null;
    }
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <button type="button" onClick={startScanner} disabled={active}>
        Start QR Scanner
      </button>
      <button type="button" onClick={stopScanner} disabled={!active} style={{ marginLeft: "0.5rem" }}>
        Stop Scanner
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {active && <div id="qr-reader" style={{ width: "100%", maxWidth: "450px", marginTop: "0.5rem" }} />}
    </div>
  );
}

export default QRScanner;
