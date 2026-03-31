import { useEffect } from "react";

function QRScanner() {
  useEffect(() => {
    console.log("Scanner started");
    // integrate scanning library (e.g., html5-qrcode) here
  }, []);

  return <div>QR Scanner (Integrate library)</div>;
}

export default QRScanner;
