import { Box } from "lucide-react";
import React from "react";
import Button from "./ui/Button";

const Navbar = () => {
  const issSignedIn = false; // Replace with actual authentication logic
  const username = "EVUM";
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
          {issSignedIn ? (
            <>
                <span className="greeting">
                    {
                        username ? `Hello, ${username}!` : "Hello!"
                    }

                    <Button onClick={handleAuthClick} size="sm" className="btn">
                        Log out
                    </Button>
                </span>
            </>
          ) : (
            <>
              <Button onClick={handleAuthClick} size="sm" variant="ghost" >
                Login
              </Button>
              <a href="#upload" className="cta">
            Get started
          </a>
            </>
          )}

          
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
