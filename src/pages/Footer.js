import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <p>&copy; {new Date().getFullYear()} Gas Agency System. All rights reserved.</p>
        <div className="footer-links">
          <a href="#about-us">About</a>
          <a href="#contact">Contact</a>
          <p onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>⬆ Back To Top ⬆</p>
        </div>
      </div>
    </footer>
  );
}
