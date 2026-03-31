import React, { useState, useCallback } from "react";
import QRScanner from "../components/QRScanner";
import { postTransaction } from "../utils/api";

function ReceiveMoney() {
  const [pendingTransaction, setPendingTransaction] = useState(null);
  const [message, setMessage] = useState("");

  const onScan = useCallback((rawData) => {
    try {
      const json = JSON.parse(rawData);
      setPendingTransaction(json);
      setMessage("Payment payload scanned, confirm to save.");
    } catch (err) {
      setMessage(`Invalid QR payload: ${err.message}`);
    }
  }, []);

  const acceptPayment = async () => {
    if (!pendingTransaction) return;
    const payload = {
      sender: pendingTransaction.sender || "unknown",
      receiver: pendingTransaction.receiver || "unknown",
      amount: Number(pendingTransaction.amount || 0),
      note: pendingTransaction.note || "Received via QR",
    };

    try {
      const { data } = await postTransaction(payload);
      setMessage(`Received transaction recorded: ID=${data.data.id}`);
      setPendingTransaction(null);
    } catch (err) {
      console.error(err);
      setMessage("Failed to record receive transaction.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "700px" }}>
      <h2>Receive Money</h2>
      <p>Scan the sender-generated QR code to confirm and store the transaction.</p>
      <QRScanner onScan={onScan} />

      {pendingTransaction && (
        <div style={{ marginTop: "16px", border: "1px solid #ddd", borderRadius: "8px", padding: "12px" }}>
          <h4>Pending Transaction</h4>
          <p>Sender: {pendingTransaction.sender}</p>
          <p>Receiver: {pendingTransaction.receiver}</p>
          <p>Amount: {pendingTransaction.amount}</p>
          <p>Note: {pendingTransaction.note || "(none)"}</p>
          <button onClick={acceptPayment}>Confirm Receive</button>
        </div>
      )}

      {message && <p style={{ marginTop: "14px", fontWeight: 600 }}>{message}</p>}
    </div>
  );
}

export default ReceiveMoney;
