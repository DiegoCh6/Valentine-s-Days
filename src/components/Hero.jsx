import React, { useState, useEffect } from "react";
import "./Hero.css";
import IMG_17 from "../assets/IMG_17.jpeg";
import IMG_20 from "../assets/IMG_20.jpeg";
import IMG_03 from "../assets/IMG_03.jpeg";
import IMG_07 from "../assets/IMG_07.jpeg";

function Hero() {
  const photos = [IMG_17, IMG_20, IMG_03, IMG_07];

  const [currentPhoto, setCurrentPhoto] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhoto((prev) => (prev + 1) % photos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [photos.length]);

  const handlePrevPhoto = () => {
    setCurrentPhoto((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleNextPhoto = () => {
    setCurrentPhoto((prev) => (prev + 1) % photos.length);
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            <span className="heart-icon">💕</span>
            <span className="name-text">BRENDA</span>
            <span className="heart-icon">💕</span>
          </h1>
          <p className="hero-description">En inglés para que mejores tu vocabulario🫠🫠 </p>
          <p className="hero-subtitle">From Me to your heart</p>
          <p className="hero-description">
            This is a special message for someone truly extraordinary.
            <br />
            Someone who lights up every room they enter.
            <br />
            Someone whose smile melts away all the cold.
            <br />
            <span className="emphasis">Someone like you.</span>
          </p>
        </div>
        <div className="floating-hearts">
          
          <span className="float-heart">💕</span>
          <span className="float-heart">💖</span>
          <span className="float-heart">💖</span>
        </div>
        <div className="hero-photo-container">
          <div className="photo-frame">
            <img 
              key={currentPhoto}
              src={photos[currentPhoto]} 
              alt={`Brenda - Photo ${currentPhoto + 1}`}
              className="hero-photo"
              loading="eager"
            />
            <div className="photo-overlay">
              <button className="photo-nav prev" onClick={handlePrevPhoto} aria-label="Previous photo">
                ❮
              </button>
              <button className="photo-nav next" onClick={handleNextPhoto} aria-label="Next photo">
                ❯
              </button>
            </div>
          </div>
          <div className="photo-indicators">
            {Array.from({ length: photos.length }, (_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentPhoto ? "active" : ""}`}
                onClick={() => setCurrentPhoto(index)}
                aria-label={`Photo ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="scroll-indicator">
        <span>Scroll to continue...</span>
        <div className="chevron"></div>
        <div className="chevron"></div>
        <div className="chevron"></div>
      </div>
    </section>
  );
}

export default Hero;
