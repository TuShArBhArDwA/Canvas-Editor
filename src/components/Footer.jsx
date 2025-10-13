import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="app-footer">
      <p>
        Made with ❤️ by{" "}
        <a
          href="https://tushar-bhardwaj.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="portfolio-link"
        >
          Tushar Bhardwaj
        </a>
      </p>
    </footer>
  );
}

export default Footer;
