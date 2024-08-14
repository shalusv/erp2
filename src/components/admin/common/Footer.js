// src/components/admin/Footer/Footer.js
import React from "react";
import "./Footer.css"; // Import the CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()}
        <a
          href="https://theinfines.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          theinfines.com
        </a>
        . All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
