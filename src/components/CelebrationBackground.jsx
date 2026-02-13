import React, { useState, useEffect } from 'react';
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [position, setPosition] = useState({ left: 50, top: 30 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
      // Randomize position for each new photo
      setPosition({
        left: Math.random() * 80 + 10, // 10% to 90%
        top: Math.random() * 60 + 10,  // 10% to 70%
      });
    }, 1500); // Change photo every 1.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="celebration-background">
      <div
        className="floating-photo"
        style={{
          left: `${position.left}%`,
          top: `${position.top}%`,
        }}
      >
        <img 
          src={photos[currentIndex]} 
          alt={`Memory ${currentIndex + 1}`}
          loading="lazy"
        />
      </div>
    </div>
  );
}

export default CelebrationBackground;
