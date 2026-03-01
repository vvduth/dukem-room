import { Box } from "lucide-react";
import React from "react";

const Navbar = () => {
  const handleAuthClick = async () => {
    console.log("Login clicked");
  };
  return (
    <header className="navbar">
      <nav className="inner">
        <div className="left">
          <div className="brand">
            <Box className="logo" />
            <span className="name">Dukem Room</span>
          </div>
          <ul className="links">
            <a href="#">Product</a>
            <a href="#">Pricing</a>
            <a href="#">Community</a>
            <a href="#">Blog</a>
          </ul>
        </div>
        <div className="actions">
          <button className="login" onClick={handleAuthClick}>
            Login
          </button>
          <a href="#upload" className="cta">
            Get started
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
