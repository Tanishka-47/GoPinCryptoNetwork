import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "16px", backgroundColor: "#0d6efd", color: "white", display: "flex", gap: "16px" }}>
      <h1 style={{ margin: 0 }}>GO-PIN</h1>
      <Link to="/" style={{ color: "white", textDecoration: "none" }}>
        Home
      </Link>
      <Link to="/send" style={{ color: "white", textDecoration: "none" }}>
        Send
      </Link>
      <Link to="/receive" style={{ color: "white", textDecoration: "none" }}>
        Receive
      </Link>
    </nav>
  );
}

export default Navbar;
