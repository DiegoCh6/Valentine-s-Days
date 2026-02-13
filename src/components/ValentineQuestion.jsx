import React, { useState, useRef } from 'react';
import './ValentineQuestion.css';
import CelebrationBackground from './CelebrationBackground';
import celebrationMusic from '../assets/intentalo.mp3';
import baileGif from '../assets/baile.gif';

function ValentineQuestion() {
  const [noClickCount, setNoClickCount] = useState(0);
  const [yesClicked, setYesClicked] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const audioRef = useRef(null);

  const noMessages = [
    'Click NO',
    'Are you sure?',
    'Think again... 💭',
    'One more chance! 🥺',
    'You sure about that? 💔',
    'Last chance! 🎁',
  ];

  const handleYesClick = () => {
    setYesClicked(true);
    setShowCelebration(true);
    
    // Pausar música de fondo
    const backgroundAudio = document.getElementById('background-music');
    if (backgroundAudio) {
      backgroundAudio.pause();
    }
    
    // Reproducir música de celebración
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(error => console.log('Audio play failed:', error));
    }
    
    setTimeout(() => {
      setShowCelebration(false);
    }, 3000);
  };

  const handleNoClick = () => {
    if (noClickCount < 6) {
      setNoClickCount(noClickCount + 1);
    } else {
      // After 6 clicks, show something interesting
      setShowCelebration(true);
      setTimeout(() => {
        setShowCelebration(false);
        setNoClickCount(0); // Reset for fun
      }, 3000);
    }
  };

  const yesButtonSize = 100 + noClickCount * 20; // Grows by 20% each click, starting at 100%
  const noButtonOpacity = Math.max(0.3, 1 - noClickCount * 0.1); // Fades slightly

  const handleCloseCelebration = () => {
    setYesClicked(false);
    
    // Detener música de celebración
    if (audioRef.current) {
      audioRef.current.pause();
    }
    
    // Reanudar música de fondo
    const backgroundAudio = document.getElementById('background-music');
    if (backgroundAudio) {
      backgroundAudio.play().catch(error => console.log('Background audio play failed:', error));
    }
  };

  return (
    <section className="valentine-question">
      <div className="question-container">
        <h2 className="big-question">
          Would you like to be my <span className="valentine-text">Valentine?</span> 💕
        </h2>

        <div className="buttons-container">
          <button
            className="valentine-button yes-button"
            onClick={handleYesClick}
            style={{
              transform: `scale(${yesButtonSize / 100})`,
              fontSize: `${Math.max(1, (yesButtonSize / 100) * 1.1)}rem`,
            }}
          >
            YES ❤️
          </button>

          <button
            className="valentine-button no-button"
            onClick={handleNoClick}
            style={{
              opacity: noButtonOpacity,
              pointerEvents: noClickCount >= 6 ? 'none' : 'auto',
            }}
          >
            {noClickCount < 6 ? noMessages[noClickCount] : 'You tried... 😄'}
          </button>
        </div>

        {noClickCount > 0 && noClickCount < 6 && (
          <p className="hint-text">
            No seas asi! 🙃
          </p>
        )}

        {noClickCount >= 6 && (
          <p className="hint-text" style={{ animation: 'fadeIn 0.5s ease-in' }}>
            😄 You clicked NO too many times! But that's okay, I know your heart says YES! 💕
          </p>
        )}

        {yesClicked && (
          <>
            <CelebrationBackground />
            <div className="celebration-box" onClick={handleCloseCelebration}>
              <div className="celebration-content" onClick={(e) => e.stopPropagation()}>
                <button 
                  className="celebration-close"
                  onClick={handleCloseCelebration}
                >
                  ✕
                </button>
                <h3> Ya, ahora a tonear 🙈❤️</h3>
                <p>You've made me the happiest person!</p>
                <p>I can't wait to celebrate with you! 💕</p>
                <p>Mandame captura al wsp :3 💕</p>
                <div className="celebration-hearts">
                  <img src={baileGif} alt="Celebration dance" className="celebration-gif" loading="lazy" />
                </div>
              </div>
            </div>
          </>
        )}
        
        {/* Audio element for celebration music */}
        <audio ref={audioRef} src={celebrationMusic} />
      </div>
    </section>
  );
}

export default ValentineQuestion;
