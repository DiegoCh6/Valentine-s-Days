import React from 'react';
import Hero from './components/Hero';
import AnimatedBackground from './components/AnimatedBackground';
import LoveMessage from './components/LoveMessage';
import SurpriseButton from './components/SurpriseButton';
import SecretMessage from './components/SecretMessage';
import ValentineQuestion from './components/ValentineQuestion';
import MusicToggle from './components/MusicToggle';
import './App.css';

function App() {
  return (
    <div className="app">
      <AnimatedBackground />
      <MusicToggle />
      <Hero />
      <LoveMessage />
      <SurpriseButton />
      <SecretMessage />
      <ValentineQuestion />
    </div>
  );
}

export default App;
