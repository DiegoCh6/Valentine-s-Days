import React, { useState } from 'react';
import './LoveMessage.css';
import IMG_05 from '../assets/IMG_05.jpeg';
import IMG_08 from '../assets/IMG_08.jpeg';
import IMG_10 from '../assets/IMG_10.jpeg';
import IMG_12 from '../assets/IMG_12.jpeg';
import IMG_19 from '../assets/IMG_19.jpeg';
import IMG_09 from '../assets/IMG_09.jpeg';

function LoveMessage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);

  const messages = [
    {
      title: '✨ Your Light',
      text: 'In a world that can sometimes feel cold and dark, you are a beacon of warmth. Your smile has the power to transform any moment, to turn ordinary days into memories worth treasuring forever.',
      image: IMG_05,
    },
    {
      title: '💫 Your Strength',
      text: 'From Cabanaconde xd to the heights of your dreams, you carry an inner strength that inspires everyone around you. You don\'t just dream—you build, you strive, you become.',
      image: IMG_08,
    },
    {
      title: '🌹 Your Grace',
      text: 'There\'s an elegance in the way you move through life, a thoughtfulness in your words, and a kindness in your heart that makes the world a better place, even if you deny it, I know that is who you are.',
      image: IMG_10,
    },
    {
      title: '💖 Your Value',
      text: 'You deserve to be celebrated, cherished, and loved for exactly who you are. Not for what you do or what you achieve, but simply for being the incredible person that you are.',
      image: IMG_12,
    },
    {
      title: '🫦 Your Beauty',
      text: 'I know that I have said this before, but I can\'t help saying it again. Your eyes, your mouth, your body, everything about you is.....🫠🫠🫠. I am really the luckiest person in the world to have you as a girlfriend.',
      image: IMG_19,
    },
    {
      title: '🌎 Our Journey',
      text: 'I would travel the world a thousand times over just to see your smile and hold your hand through every adventure life throws our way.',
      image: IMG_09,
    },
  ];

  const handleNext = () => {
    setIsRevealed(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 300);
  };

  const handlePrev = () => {
    setIsRevealed(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + messages.length) % messages.length);
    }, 300);
  };

  const currentMessage = messages[currentIndex];

  return (
    <section className="love-message">
      <div className="message-header">
        <h2>A Message From My Heart</h2>
        <p>Click on the message to reveal what I want you to know...</p>
      </div>

      <div className="messages-grid">
        <div
          className={`message-card ${isRevealed ? 'revealed' : ''}`}
          onClick={() => setIsRevealed(!isRevealed)}
          style={{
            backgroundImage: `url(${currentMessage.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="card-inner">
            <div className="card-front">
              <div className="card-number">{currentIndex + 1}</div>
              <div className="card-title">{currentMessage.title}</div>
              <div className="click-hint">Click to reveal</div>
            </div>
            <div className="card-back">
              <p>{currentMessage.text}</p>
            </div>
          </div>
          <div className="card-decoration"></div>
        </div>
      </div>

      <div className="message-navigation">
        <button 
          className="nav-button prev" 
          onClick={(e) => { e.stopPropagation(); handlePrev(); }}
          aria-label="Previous message"
        >
          ❮ Previous
        </button>
        <div className="message-indicators">
          {Array.from({ length: messages.length }, (_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => {
                setIsRevealed(false);
                setTimeout(() => setCurrentIndex(index), 300);
              }}
              aria-label={`Message ${index + 1}`}
            />
          ))}
        </div>
        <button 
          className="nav-button next" 
          onClick={(e) => { e.stopPropagation(); handleNext(); }}
          aria-label="Next message"
        >
          Next ❯
        </button>
      </div>

      <div className="message-footer">
        <p>Take your time to read each one... they're all for you.... And I'm not sure if you remember this phrase: "I have so many different dreams about a perfect life and they all have one thing in common: YOU." 💕</p>
      </div>
    </section>
  );
}

export default LoveMessage;
