import React, { useState, useEffect } from "react";
import "./Hero.css";

function Hero() {
  const photos = [
    "/src/assets/IMG_17.jpeg",
    "/src/assets/IMG_20.jpeg",
    "/src/assets/IMG_03.jpeg",
    "/src/assets/IMG_07.jpeg",
  ];

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
              alt="Brenda" 
              className="hero-photo"
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
            {photos.map((_, index) => (
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
