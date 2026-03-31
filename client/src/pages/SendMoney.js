import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import { postTransaction } from "../utils/api";
import { wrapPaymentData } from "../utils/crypto";

const STORAGE_KEY = "go-pin-transactions";

function SendMoney() {
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");
  const [qrUrl, setQrUrl] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  const saveHistory = (item) => {
    const next = [item, ...history].slice(0, 20);
    setHistory(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!sender || !receiver || !amount || Number(amount) <= 0) {
      setMessage("Please fill all fields with valid values.");
      return;
    }

    try {
      const payload = { sender, receiver, amount: Number(amount), note };
      const { data } = await postTransaction(payload);
      const tx = { ...payload, id: data.data.id || Date.now(), createdAt: new Date().toISOString() };
      saveHistory(tx);
      setMessage(`Transaction stored: ID=${tx.id}`);
      setSender("");
      setReceiver("");
      setAmount("");
      setNote("");
    } catch (err) {
      console.error(err);
      setMessage("Failed to store transaction, try offline queue.");
    }
  };

  const generateQR = async () => {
    if (!sender || !receiver || !amount || Number(amount) <= 0) {
      setMessage("Fill sender, receiver, and amount before generating QR.");
      return;
    }

    const encoded = wrapPaymentData(sender, receiver, Number(amount));
    const data = { sender, receiver, amount: Number(amount), note, encoded };
    const url = await QRCode.toDataURL(JSON.stringify(data));
    setQrUrl(url);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Send Money</h2>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "10px", maxWidth: "500px" }}>
        <input value={sender} onChange={(e) => setSender(e.target.value)} placeholder="Sender address" required />
        <input value={receiver} onChange={(e) => setReceiver(e.target.value)} placeholder="Receiver address" required />
        <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" type="number" min="0" step="0.0001" required />
        <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Note (optional)" />
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button type="button" onClick={generateQR} style={{ flex: 1 }}>
            Generate QR
          </button>
          <button type="submit" style={{ flex: 1 }}>
            Send & Record
          </button>
        </div>
      </form>

      {message && <p style={{ color: message.startsWith("Failed") ? "red" : "green" }}>{message}</p>}
      {qrUrl && (
        <div style={{ marginTop: "16px" }}>
          <h4>Payment QR</h4>
          <img src={qrUrl} alt="Payment QR" style={{ width: "220px", height: "220px" }} />
          <p>Scan this QR to import payment data.</p>
        </div>
      )}

      <section style={{ marginTop: "24px" }}>
        <h3>Recent Transactions</h3>
        {history.length === 0 ? (
          <p>No send history yet.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ borderBottom: "1px solid #ccc", textAlign: "left", padding: "8px" }}>ID</th>
                <th style={{ borderBottom: "1px solid #ccc", textAlign: "left", padding: "8px" }}>From</th>
                <th style={{ borderBottom: "1px solid #ccc", textAlign: "left", padding: "8px" }}>To</th>
                <th style={{ borderBottom: "1px solid #ccc", textAlign: "left", padding: "8px" }}>Amount</th>
                <th style={{ borderBottom: "1px solid #ccc", textAlign: "left", padding: "8px" }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {history.map(( tx ) => (
                <tr key={tx.id}>
                  <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{tx.id}</td>
                  <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{tx.sender}</td>
                  <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{tx.receiver}</td>
                  <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{tx.amount}</td>
                  <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{new Date(tx.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

export default SendMoney;
