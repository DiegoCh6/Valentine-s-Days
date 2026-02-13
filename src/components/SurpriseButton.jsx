import React, { useState } from 'react';
import './SurpriseButton.css';
import MathematicalRose from './MathematicalRose';

function SurpriseButton() {
  const [isClicked, setIsClicked] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showRose, setShowRose] = useState(false);
  const [shouldDraw, setShouldDraw] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setShowConfetti(true);
    setShowRose(true);
    setShouldDraw(true);
    
    setTimeout(() => {
      setShowConfetti(false);
    }, 2000);

    setTimeout(() => {
      setIsClicked(false);
    }, 1000);
  };

  const closeRose = () => {
    setShowRose(false);
    setShouldDraw(false);
  };

  return (
    <section className="surprise-section">
      <div className="surprise-container">
        <div className="surprise-text">
          <h2>Ready for a surprise?</h2>
          <p>
            This website was created with all the love and care in my heart,
            <br />
            just to tell you how special you are to me, Brenda.
            <br />
            <br />
            You deserve all the happiness in the world.
          </p>
        </div>

        <button 
          className={`surprise-button ${isClicked ? 'active' : ''}`}
          onClick={handleClick}
        >
          <span className="button-text">Click for a Surprise 🎁</span>
          <span className="button-glow"></span>
        </button>

        {showConfetti && (
          <div className="confetti-container">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  delay: `${Math.random() * 0.5}s`,
                  '--rotation': `${Math.random() * 360}deg`,
                  '--color': ['#ff1744', '#d91e63', '#ff6090', '#ffb3c1', '#ffc0cb'][
                    Math.floor(Math.random() * 5)
                  ],
                }}
              />
            ))}
          </div>
        )}

        <div className="surprise-message">
          <p>
            I can't wait to tell you this February 14th: "Happy Valentine's Day to the most wonderful girl from Arequipa!" ❤️❤️❤️❤️❤️❤️
          </p>
          <p className="signature">
            Forever grateful for you...
          </p>
        </div>
      </div>

      {showRose && (
        <div className="rose-modal-overlay" onClick={closeRose}>
          <div className="rose-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="rose-modal-close" onClick={closeRose}>
              ✕
            </button>
            <h2 className="rose-title">A Flower for You 🌹</h2>
            <MathematicalRose shouldDraw={shouldDraw} />
          </div>
        </div>
      )}
    </section>
  );
}

export default SurpriseButton;
