import React from 'react';
import '../styles/IngredientsSection.css';

const IngredientsSection = () => {
  const ingredients = [
    {
      name: 'Belgian Cocoa',
      description: 'Single-origin Belgian dark chocolate (72% cacao)',
      icon: '🍫'
    },
    {
      name: 'European Hazelnuts',
      description: 'Hand-roasted hazelnuts from the Piedmont region',
      icon: '🌰'
    },
    {
      name: 'Golden Praline',
      description: 'Caramelized hazelnut and gold foil center',
      icon: '✨'
    },
    {
      name: 'Bourbon Vanilla',
      description: 'Rare grade A Madagascar vanilla beans',
      icon: '🌸'
    },
    {
      name: 'Sea Salt',
      description: 'Artisanal Himalayan pink sea salt',
      icon: '🧂'
    },
    {
      name: 'Natural Butter',
      description: 'Pure cacao butter for silky texture',
      icon: '🧈'
    }
  ];

  return (
    <section className="ingredients-section">
      <div className="ingredients-container">
        <h2 className="ingredients-title">The Art of Ingredients</h2>
        <p className="ingredients-subtitle">
          Every element is carefully selected to create a perfect harmony of taste and texture
        </p>

        <div className="ingredients-grid">
          {ingredients.map((ingredient, index) => (
            <div key={index} className="ingredient-card">
              <div className="ingredient-icon">{ingredient.icon}</div>
              <h3 className="ingredient-name">{ingredient.name}</h3>
              <p className="ingredient-description">{ingredient.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IngredientsSection;
