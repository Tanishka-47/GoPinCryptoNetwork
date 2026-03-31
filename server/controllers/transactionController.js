// Simulated offline storage for hackathon MVP
const transactions = [];

exports.createTransaction = (req, res) => {
  const { sender, receiver, amount } = req.body;

  if (!sender || !receiver || !amount) {
    return res.status(400).json({ message: "sender, receiver, and amount are required." });
  }

  const tx = { id: transactions.length + 1, sender, receiver, amount, timestamp: new Date().toISOString() };
  transactions.push(tx);

  res.json({ message: "Transaction stored (offline mode)", data: tx });
};
