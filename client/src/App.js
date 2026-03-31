import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SendMoney from "./pages/SendMoney";
import ReceiveMoney from "./pages/ReceiveMoney";

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main style={{ padding: "1rem" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/send" element={<SendMoney />} />
            <Route path="/receive" element={<ReceiveMoney />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
