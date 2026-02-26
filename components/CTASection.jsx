import React from 'react';
import '../styles/CTASection.css';

const CTASection = () => {
  return (
    <section className="cta-section">
      <div className="cta-container">
        <h2 className="cta-title">Ready to Indulge?</h2>
        <p className="cta-subtitle">
          Join thousands of chocolate connoisseurs who have discovered true bliss
        </p>

        <div className="cta-buttons">
          <button className="cta-button primary">Discover Collection</button>
          <button className="cta-button secondary">Learn More</button>
        </div>

        <div className="cta-benefits">
          <div className="benefit">
            <span className="benefit-icon">🚚</span>
            <p>Free Luxury Shipping</p>
          </div>
          <div className="benefit">
            <span className="benefit-icon">🎁</span>
            <p>Elegant Gift Packaging</p>
          </div>
          <div className="benefit">
            <span className="benefit-icon">✓</span>
            <p>100% Satisfaction Guarantee</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
