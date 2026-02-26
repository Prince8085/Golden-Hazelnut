import React from 'react';
import '../styles/AboutSection.css';

const AboutSection = () => {
  return (
    <section className="about-section">
      <div className="about-background">
        <img src="/Whisk_6a56b3c6218b88a8f194ae2feea04ca2eg.jpeg" alt="Chocolate Artistry" className="about-bg-image" />
      </div>
      <div className="about-container">
        <div className="about-content">
          <h2 className="about-title">Crafted for Perfection</h2>
          <p className="about-text">
            Golden Hazelnut Praline Bliss represents the pinnacle of chocolate artistry. 
            Born from a decades-long pursuit of perfection, each chocolate piece combines 
            premium Belgian cocoa with hand-roasted European hazelnuts and a golden praline 
            center that melts like silk on the palate.
          </p>
          <p className="about-text">
            We believe in transparency, quality, and sustainability. Every ingredient is 
            ethically sourced, and every batch is crafted with the precision of master artisans.
          </p>
        </div>
        <div className="about-stats">
          <div className="stat">
            <h3>40+</h3>
            <p>Years of Excellence</p>
          </div>
          <div className="stat">
            <h3>100%</h3>
            <p>Premium Ingredients</p>
          </div>
          <div className="stat">
            <h3>50K+</h3>
            <p>Satisfied Connoisseurs</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;