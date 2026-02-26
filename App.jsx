import React, { useState, useEffect, useRef, useCallback } from 'react';
import CanvasAnimation from './components/CanvasAnimation';
import CinematicText from './components/CinematicText';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import IngredientsSection from './components/IngredientsSection';
import ExperienceSection from './components/ExperienceSection';
import CTASection from './components/CTASection';
import FooterSection from './components/FooterSection';
import './styles/App.css';

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [showCinematicText, setShowCinematicText] = useState(false);
  const animationSectionRef = useRef(null);
  const rafIdRef = useRef(null);
  const lastProgressRef = useRef(0);
  const heroSectionRef = useRef(null);

  // Handle scroll for animation progress
  useEffect(() => {
    const handleScroll = () => {
      if (!animationSectionRef.current) return;

      const rect = animationSectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;

      const sectionTop = rect.top;
      const sectionBottom = rect.bottom;

      let progress;

      if (sectionTop > windowHeight) {
        progress = 0;
      } else if (sectionBottom < 0) {
        progress = 1;
      } else {
        progress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / (windowHeight + sectionHeight)));
      }

      // Only update if progress actually changed (avoid unnecessary re-renders)
      if (Math.abs(progress - lastProgressRef.current) > 0.001) {
        lastProgressRef.current = progress;
        setScrollProgress(progress);
      }

      // Show cinematic text only when scrolled past hero section
      const heroRect = heroSectionRef.current?.getBoundingClientRect();
      if (heroRect && heroRect.bottom < 100) {
        setShowCinematicText(true);
      } else {
        setShowCinematicText(false);
      }
    };

    const onScroll = () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      rafIdRef.current = requestAnimationFrame(handleScroll);
    };

    handleScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  // Memoize load complete handler
  const handleLoadComplete = useCallback(() => {
    setImagesLoaded(true);
  }, []);

  return (
    <div className="app-container">
      {/* Hero Section */}
      <div ref={heroSectionRef}>
        <HeroSection />
      </div>

      {/* Cinematic Scroll Animation Section */}
      <section 
        ref={animationSectionRef}
        className="animation-section"
      >
        <div className="animation-container">
          <CanvasAnimation 
            scrollProgress={scrollProgress}
            isLoading={!imagesLoaded}
            onLoadComplete={handleLoadComplete}
          />
          {showCinematicText && <CinematicText scrollProgress={scrollProgress} />}
        </div>
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Ingredients Section */}
      <IngredientsSection />

      {/* Experience Section */}
      <ExperienceSection />

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <FooterSection />
    </div>
  );
}

export default App;