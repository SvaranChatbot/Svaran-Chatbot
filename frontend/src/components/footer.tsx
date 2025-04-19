/* Kunal Sharma 2023UMA0221 Mathematics and Computing */

import React from 'react';
import '../styles/footer.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h4>Svaran</h4>
          <p>IIT Jammu Chatbot</p>
        </div>
        
        <div>
          <ul className="footer-links">
            <li><a href="/about">About</a></li>
            <li><a href="/team">Team</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        
        <div className="footer-copyright">
          <p>&copy; {currentYear} Svaran. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;