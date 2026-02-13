import React from 'react';
import './CelebrationBackground.css';
import IMG_14 from '../assets/IMG_14.jpeg';
import IMG_15 from '../assets/IMG_15.jpeg';
import IMG_16 from '../assets/IMG_16.jpeg';
import IMG_17 from '../assets/IMG_17.jpeg';
import IMG_18 from '../assets/IMG_18.jpeg';
import IMG_19 from '../assets/IMG_19.jpeg';
import IMG_20 from '../assets/IMG_20.jpeg';
import IMG_21 from '../assets/IMG_21.jpeg';

const photos = [IMG_14, IMG_15, IMG_16, IMG_17, IMG_18, IMG_19, IMG_20, IMG_21];

function CelebrationBackground() {
  return (
    <div className="celebration-background">
      {photos.map((photo, index) => (
        <div
          key={index}
          className="floating-photo"
          style={{
            animationDelay: `${index * 0.15}s`,
            left: `${(index * 12.5) % 100}%`,
            top: `${Math.random() * 60 + 10}%`,
          }}
        >
          <img src={photo} alt={`Memory ${index + 1}`} />
        </div>
      ))}
    </div>
  );
}

export default CelebrationBackground;
