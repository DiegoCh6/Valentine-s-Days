import React, { useState } from 'react';
import './LoveMessage.css';

function LoveMessage() {
  const [revealedIndex, setRevealedIndex] = useState(null);

  const messages = [
    {
      title: '✨ Your Light',
      text: 'In a world that can sometimes feel cold and dark, you are a beacon of warmth. Your smile has the power to transform any moment, to turn ordinary days into memories worth treasuring forever.',
      image: '/src/assets/IMG_05.jpeg',
    },
    {
      title: '💫 Your Strength',
      text: 'From Cabanaconde xd to the heights of your dreams, you carry an inner strength that inspires everyone around you. You don\'t just dream—you build, you strive, you become.',
      image: '/src/assets/IMG_08.jpeg',
    },
    {
      title: '🌹 Your Grace',
      text: 'There\'s an elegance in the way you move through life, a thoughtfulness in your words, and a kindness in your heart that makes the world a better place, even if you deny it, I know that is who you are.',
      image: '/src/assets/IMG_10.jpeg',
    },
    {
      title: '💖 Your Value',
      text: 'You deserve to be celebrated, cherished, and loved for exactly who you are. Not for what you do or what you achieve, but simply for being the incredible person that you are.',
      image: '/src/assets/IMG_12.jpeg',
    },
    {
      title: '🫦 Your Beauty',
      text: 'I know that I have said this before, but I can\'t help saying it again. Your eyes, your mouth, your body, everything about you is.....🫠🫠🫠. I am really the luckiest person in the world to have you as a girlfriend.',
      image: '/src/assets/IMG_19.jpeg',
    },
    {
      title: '🌎 Our Journey',
      text: 'I would travel the world a thousand times over just to see your smile and hold your hand through every adventure life throws our way.',
      image: '/src/assets/IMG_09.jpeg',
    },
  ];

  return (
    <section className="love-message">
      <div className="message-header">
        <h2>A Message From My Heart</h2>
        <p>Click on each message to reveal what I want you to know...</p>
      </div>

      <div className="messages-grid">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message-card ${revealedIndex === index ? 'revealed' : ''}`}
            onClick={() => setRevealedIndex(revealedIndex === index ? null : index)}
            style={{
              backgroundImage: `url(${message.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div className="card-inner">
              <div className="card-front">
                <div className="card-number">{index + 1}</div>
                <div className="card-title">{message.title}</div>
                <div className="click-hint">Click to reveal</div>
              </div>
              <div className="card-back">
                <p>{message.text}</p>
              </div>
            </div>
            <div className="card-decoration"></div>
          </div>
        ))}
      </div>

      <div className="message-footer">
        <p>Take your time to read each one... they're all for you.... And I'm not sure if you remember this phrase: "I have so many different dreams about a perfect life and they all have one thing in common: YOU." 💕</p>
      </div>
    </section>
  );
}

export default LoveMessage;
