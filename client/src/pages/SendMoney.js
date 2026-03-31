import React, { useState } from "react";
import { postTransaction } from "../utils/api";

function SendMoney() {
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await postTransaction({ sender, receiver, amount: Number(amount) });
      setMessage(`Transaction stored: ID=${data.data.id}`);
    } catch (err) {
      console.error(err);
      setMessage("Failed to store transaction");
    }
  };

  return (
    <section>
      <h2>Send Money</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "8px", maxWidth: "400px" }}>
        <input value={sender} onChange={(e) => setSender(e.target.value)} placeholder="Sender address" required />
        <input value={receiver} onChange={(e) => setReceiver(e.target.value)} placeholder="Receiver address" required />
        <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" type="number" required />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </section>
  );
}

export default SendMoney;
