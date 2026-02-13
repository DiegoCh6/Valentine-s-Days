import React, { useState, useRef, useEffect } from 'react';
import './MusicToggle.css';
import musicFile from '../assets/music.mp3'; // Ensure you have a music file at this path or update accordingly

function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Reproducir automáticamente al cargar
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      
      // Intentar reproducir inmediatamente
      const playAttempt = () => {
        const promise = audioRef.current.play();
        
        if (promise !== undefined) {
          promise
            .then(() => {
              console.log('Autoplay successful');
              setIsPlaying(true);
            })
            .catch(err => {
              console.log('Autoplay blocked:', err);
              setIsPlaying(false);
            });
        }
      };

      // Intentar después de un pequeño delay para dar tiempo al navegador
      setTimeout(playAttempt, 300);
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        // Resume/play audio
        audioRef.current.volume = 0.5; // Set volume to 80%
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log('Music playing successfully');
            })
            .catch(err => {
              console.log('Audio playback error:', err);
              // Autoplay might be blocked - user interaction required
            });
        }
      } else {
        // Pause audio
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      {!isPlaying && (
        <div className="music-prompt">
          🎵 Ponte musiquita mi amor ❤️
        </div>
      )}
      <button 
        className={`music-toggle ${isPlaying ? 'playing' : ''}`}
        onClick={toggleMusic}
        aria-label="Toggle background music"
        title={isPlaying ? 'Mute music' : 'Play music'}
      >
        <span className="music-icon">
          {isPlaying ? '🎵' : '🔇'}
        </span>
        <div className="equalizer">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </button>

      {/* 
        Audio element - Plays romantic background music
        Uses multiple sources for better browser compatibility
        To add your own music: 
        1. Download a royalty-free romantic song
        2. Save to: src/assets/music.mp3
        3. Replace the src below with: src="./assets/music.mp3"
        
        Recommended free sources:
        - Pixabay Music (pixabay.com/music)
        - YouTube Audio Library
        - Pexels Music (pexels.com/search/music)
      */}
      <audio
        ref={audioRef}
        id="background-music"
        loop
        preload="auto"
        autoPlay
      >
        {/* Primary source - Pixabay royalty-free romantic music */}
        <source 
          src={musicFile}
          type="audio/mpeg"
        />
        
        Your browser does not support the audio element.
      </audio>
    </>
  );
}

export default MusicToggle;
