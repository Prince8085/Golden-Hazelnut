import React from 'react';
import '../styles/ExperienceSection.css';

const ExperienceSection = () => {
  const steps = [
    {
      number: '01',
      title: 'The Anticipation',
      description: 'Open the luxury packaging and let your senses prepare for what\'s to come.'
    },
    {
      number: '02',
      title: 'The Aroma',
      description: 'Close your eyes and breathe in the rich, intoxicating scent of Belgian cocoa.'
    },
    {
      number: '03',
      title: 'The Crack',
      description: 'Feel the delicate shell break between your teeth, releasing the praline center.'
    },
    {
      number: '04',
      title: 'The Melt',
      description: 'Let it dissolve slowly on your tongue, allowing each flavor to bloom and fade.'
    }
  ];

  return (
    <section className="experience-section">
      <div className="experience-container">
        <h2 className="experience-title">How to Experience Bliss</h2>
        <p className="experience-subtitle">
          A four-step journey to chocolate perfection
        </p>

        <div className="steps-container">
          {steps.map((step, index) => (
            <div key={index} className="step">
              <div className="step-number">{step.number}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
              {index < steps.length - 1 && <div className="step-divider"></div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;