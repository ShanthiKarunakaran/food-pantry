import React from "react";
import "./Footer.css";
export function Footer() {
  return (
    <footer className="footer-wrapper">
      <div className="footer-inner">
        <div className="footer-left">
          <h3 className="footer-title">Food Bank Network</h3>
          <p className="footer-text">
            Connecting fresh, nutritious food with the communities who need it
            most — with dignity, respect, and compassion.
          </p>
        </div>

        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/form">Sign Up</a>
          <a href="/food-bank-inventory">Login</a>
          <a href="/contact-us">Contact</a>
        </div>

        <div className="footer-right">
          <p className="footer-right-label">
            © {new Date().getFullYear()} Food Bank Network
          </p>
          <p className="footer-right-sub">All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}
