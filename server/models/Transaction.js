// Placeholder model for future MongoDB/Postgres integration
class Transaction {
  constructor({ sender, receiver, amount, timestamp }) {
    this.sender = sender;
    this.receiver = receiver;
    this.amount = amount;
    this.timestamp = timestamp || new Date().toISOString();
  }
}

module.exports = Transaction;
