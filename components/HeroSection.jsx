import React from 'react';
import '../styles/HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-background">
        <img src="/hero_background.png" alt="Golden Hazelnut Praline Bliss" className="hero-bg-image" />
      </div>
      <div className="hero-content">
        <h1 className="hero-title">Golden Hazelnut Praline Bliss</h1>
        <p className="hero-subtitle">Experience the Ultimate Indulgence</p>
        <p className="hero-description">
          Discover a symphony of flavors meticulously crafted for those who refuse mediocrity.
          Each piece is a journey through luxury and sensuality.
        </p>
        <button className="hero-cta">Begin the Journey</button>
      </div>
      <div className="hero-accent"></div>
    </section>
  );
};

export default HeroSection;