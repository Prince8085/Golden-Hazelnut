import React from 'react';
import '../styles/FooterSection.css';

const FooterSection = () => {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-column">
            <h3 className="footer-title">Golden Hazelnut Praline Bliss</h3>
            <p className="footer-description">
              Luxury chocolate crafted for those who appreciate true indulgence and artisanal excellence.
            </p>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#shop">Shop</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#recipes">Recipes</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">Follow Us</h4>
            <ul className="footer-links">
              <li><a href="#instagram">Instagram</a></li>
              <li><a href="#facebook">Facebook</a></li>
              <li><a href="#twitter">Twitter</a></li>
              <li><a href="#pinterest">Pinterest</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">Newsletter</h4>
            <p className="footer-newsletter-text">Subscribe for exclusive offers and recipes</p>
            <input
              type="email"
              placeholder="Your email"
              className="footer-input"
            />
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; 2026 Golden Hazelnut Praline Bliss. All rights reserved.
          </p>
          <div className="footer-legal">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#cookies">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
