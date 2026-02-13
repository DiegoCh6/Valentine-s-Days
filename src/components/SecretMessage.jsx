import React, { useState, useRef, useEffect } from 'react';
import './SecretMessage.css';

function SecretMessage() {
  const [digits, setDigits] = useState([0, 0, 0]);
  const [textInput, setTextInput] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [error, setError] = useState('');
  const videoRef = useRef(null);

  const correctDisplay = '441';
  const correctText = 'puchi'; // Cambiar según sea necesario

  const handleDigitChange = (index, value) => {
    if (value >= 0 && value <= 9) {
      const newDigits = [...digits];
      newDigits[index] = value;
      setDigits(newDigits);
      setError('');
    }
  };

  const incrementDigit = (index) => {
    handleDigitChange(index, (digits[index] + 1) % 10);
  };

  const decrementDigit = (index) => {
    handleDigitChange(index, (digits[index] - 1 + 10) % 10);
  };

  const handleUnlock = () => {
    const codeString = digits.join('');
    const textLower = textInput.toLowerCase().trim();
    
    if (codeString === correctDisplay && textLower === correctText) {
      setIsUnlocked(true);
      setShowSecret(true);
      setError('');
    } else if (codeString !== correctDisplay && textLower !== correctText) {
      setError('❌ Incorrect code AND text. Try again!');
    } else if (codeString !== correctDisplay) {
      setError('❌ Incorrect code. Try again!');
    } else {
      setError('❌ Incorrect text. Try again!');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleUnlock();
    }
  };

  const closeSecretVideo = () => {
    // Pause and reset video before closing
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setShowSecret(false);
  };

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = '';
      }
    };
  }, []);

  return (
    <section className="secret-message">
      <div className="secret-container">
        <div className="secret-header">
          <h2>🔐 Guess The Code</h2>
          <p>Can you unlock the secret? 🎁</p>
        </div>

        {/* Decorative background */}
        <div className="secret-background">
          {[...Array(12)].map((_, i) => (
            <div key={i} className={`heart-bg heart-bg--${i}`}>❤️</div>
          ))}
        </div>

        {/* Padlock Code Input */}
        <div className="padlock-container">
          <div className="padlock-top"></div>
          <div className="padlock-body">
            <div className="padlock-display">
              {/* Digit displays */}
              <div className="digit-group">
                {digits.map((digit, index) => (
                  <div key={index} className="digit-container">
                    <button 
                      className="digit-btn up"
                      onClick={() => incrementDigit(index)}
                      disabled={isUnlocked}
                      aria-label={`Increase digit ${index + 1}`}
                    >
                      ▲
                    </button>
                    <div className="digit-display">{digit}</div>
                    <button 
                      className="digit-btn down"
                      onClick={() => decrementDigit(index)}
                      disabled={isUnlocked}
                      aria-label={`Decrease digit ${index + 1}`}
                    >
                      ▼
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Text Input */}
            <div className="text-input-container">
              <label htmlFor="secret-text">Enter the secret word: When we are irritated, we are..?</label>
              <input
                id="secret-text"
                type="text"
                className="secret-text-input"
                placeholder="Type here..."
                value={textInput}
                onChange={(e) => {
                  setTextInput(e.target.value);
                  setError('');
                }}
                onKeyPress={handleKeyPress}
                disabled={isUnlocked}
              />
            </div>

            {/* Unlock button */}
            <button
              className="unlock-btn"
              onClick={handleUnlock}
              disabled={isUnlocked}
              onKeyPress={handleKeyPress}
            >
              {isUnlocked ? '✓ Unlocked' : 'Unlock'}
            </button>
          </div>

          {/* Status messages */}
          {error && <p className="error-msg">{error}</p>}
          {isUnlocked && <p className="success-msg">✨ ¡Nuestro amor está abierto!</p>}
        </div>

        {/* Hint */}
        <div className="secret-hint">
          <p>💡 Hint: The code number is the sum of our birth dates ... our aniversary date.</p>
        </div>
      </div>

      {/* Secret Video Modal - Only render when unlocked */}
      {showSecret && (
        <div className="secret-video-overlay" onClick={closeSecretVideo}>
          <div className="secret-video-modal" onClick={(e) => e.stopPropagation()}>
            <button className="secret-video-close" onClick={closeSecretVideo}>
              ✕
            </button>
            <h3>🎥 I found the concert video of grupo 5</h3>
            <video
              ref={videoRef}
              className="secret-video"
              controls
              autoPlay
              playsInline
              preload="metadata"
            >
              <source src="/src/assets/surprise-optimized.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </section>
  );
}

export default SecretMessage;
