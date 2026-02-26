import React, { useMemo, useCallback } from 'react';
import '../styles/CinematicText.css';

const CinematicText = ({ scrollProgress }) => {
  const TOTAL_FRAMES = 192;

  // Memoize text stages to prevent recreation
  const textStages = useMemo(() => [
    { frameStart: 0, frameEnd: 40, text: 'Indulgence Begins.' },
    { frameStart: 41, frameEnd: 80, text: 'A Crack of Desire.' },
    { frameStart: 81, frameEnd: 140, text: 'Golden Hazelnut Praline Bliss Flows.' },
    { frameStart: 141, frameEnd: 191, text: 'Pure Melted Perfection.' }
  ], []);

  const getCurrentFrame = useCallback((progress) => {
    const eased = progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    const rawIndex = eased * (TOTAL_FRAMES - 1);
    return Math.floor(rawIndex);
  }, []);

  const currentFrame = useMemo(() => getCurrentFrame(scrollProgress), [scrollProgress, getCurrentFrame]);

  const { text: currentText, stage: stageIndex, opacity } = useMemo(() => {
    for (let i = 0; i < textStages.length; i++) {
      const stage = textStages[i];
      if (currentFrame >= stage.frameStart && currentFrame <= stage.frameEnd) {
        const stageProgress = (currentFrame - stage.frameStart) / (stage.frameEnd - stage.frameStart);
        let opacityValue = 1;

        if (stageProgress < 0.2) {
          opacityValue = stageProgress / 0.2;
        } else if (stageProgress > 0.8) {
          opacityValue = (1 - stageProgress) / 0.2;
        }

        return { text: stage.text, stage: i, opacity: opacityValue };
      }
    }
    return { text: 'Indulgence Begins.', stage: 0, opacity: 1 };
  }, [currentFrame, textStages]);

  return (
    <div className="cinematic-text-container">
      <div
        className={`cinematic-text stage-${stageIndex}`}
        style={{
          opacity: opacity,
        }}
      >
        <h2 className="cinematic-headline">{currentText}</h2>
      </div>
    </div>
  );
};

export default CinematicText;
