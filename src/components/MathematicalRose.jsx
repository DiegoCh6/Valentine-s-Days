import React, { useRef, useEffect, useState } from 'react';
import './MathematicalRose.css';

function MathematicalRose({ shouldDraw }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    if (!shouldDraw) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const baseScale = Math.min(width, height) / 2.5;

    // Enhanced rose equation with more petals
    const getRoseRadius = (theta, petalCount = 8) => {
      // Create a fuller rose with multiple petal layers
      const r1 = Math.cos(petalCount * theta);
      const r2 = Math.sin(petalCount * theta * 0.5) * 0.3;
      return Math.max(0, (r1 + r2 * 0.5) * 0.9);
    };

    // Spiral radius for layered effect
    const getLayerRadius = (theta, layer) => {
      return 0.5 + layer * 0.4 + Math.sin(theta * 3) * 0.15;
    };

    // Convert polar to Cartesian
    const polarToCartesian = (r, theta, scale) => {
      return {
        x: centerX + r * Math.cos(theta) * scale,
        y: centerY + r * Math.sin(theta) * scale,
      };
    };

    // Clear canvas with gradient
    const bgGradient = ctx.createLinearGradient(0, 0, width, height);
    bgGradient.addColorStop(0, 'rgba(10, 10, 20, 0.98)');
    bgGradient.addColorStop(0.5, 'rgba(20, 15, 35, 0.98)');
    bgGradient.addColorStop(1, 'rgba(10, 10, 20, 0.98)');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    setIsDrawing(true);
    let currentProgress = 0;
    const maxProgress = 1;
    const speed = 0.002;

    const colors = [
      { r: 255, g: 20, b: 80 },    // Deep crimson
      { r: 255, g: 50, b: 100 },   // Bright crimson
      { r: 255, g: 100, b: 120 },  // Light pink
      { r: 255, g: 150, b: 140 },  // Pale pink
      { r: 255, g: 180, b: 160 },  // Very light pink
    ];

    const drawRose = (progress) => {
      // Clear canvas
      const bgGradient = ctx.createLinearGradient(0, 0, width, height);
      bgGradient.addColorStop(0, 'rgba(10, 10, 20, 0.98)');
      bgGradient.addColorStop(0.5, 'rgba(20, 15, 35, 0.98)');
      bgGradient.addColorStop(1, 'rgba(10, 10, 20, 0.98)');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Draw multiple layers of petals (from inside out)
      const layers = 5;
      for (let layer = 0; layer < layers; layer++) {
        const layerProgress = Math.max(0, progress - layer * 0.15);
        if (layerProgress <= 0) continue;

        const petalsInLayer = 8 + layer * 2;
        const scaleForLayer = baseScale * (0.5 + layer * 0.3);
        const layerColor = colors[Math.min(layer, colors.length - 1)];

        // Draw each petal
        for (let petal = 0; petal < petalsInLayer; petal++) {
          const petalOffset = (petal * 2 * Math.PI) / petalsInLayer;
          const points = [];

          // Create petal shape
          for (let t = 0; t <= layerProgress * Math.PI * 1.5; t += 0.02) {
            const r = getRoseRadius(t, petalsInLayer) * getLayerRadius(t + petalOffset, layer);
            const { x, y } = polarToCartesian(r, t + petalOffset, scaleForLayer);
            points.push({ x, y });
          }

          if (points.length > 2) {
            // Draw petal outline
            ctx.beginPath();
            for (let i = 0; i < points.length; i++) {
              if (i === 0) {
                ctx.moveTo(points[i].x, points[i].y);
              } else {
                ctx.lineTo(points[i].x, points[i].y);
              }
            }

            // Return to center for petal shape
            ctx.lineTo(centerX, centerY);
            ctx.closePath();

            // Fill petal with gradient
            const petalGradient = ctx.createRadialGradient(
              centerX, centerY, 0,
              centerX, centerY, scaleForLayer * 1.5
            );
            
            const opacity1 = 0.5 - layer * 0.08;
            const opacity2 = 0.25 - layer * 0.05;
            const opacity3 = 0.1 - layer * 0.02;

            petalGradient.addColorStop(0, `rgba(${layerColor.r}, ${layerColor.g}, ${layerColor.b}, ${opacity1})`);
            petalGradient.addColorStop(0.6, `rgba(${layerColor.r - 20}, ${layerColor.g - 10}, ${layerColor.b - 10}, ${opacity2})`);
            petalGradient.addColorStop(1, `rgba(${layerColor.r - 40}, ${layerColor.g - 20}, ${layerColor.b - 20}, ${opacity3})`);

            ctx.fillStyle = petalGradient;
            ctx.fill();

            // Petal outline
            ctx.strokeStyle = `rgba(${layerColor.r - 50}, ${layerColor.g - 30}, ${layerColor.b - 30}, 0.6)`;
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // Add vein details to petals
            if (layer > 0 && points.length > 5) {
              ctx.beginPath();
              const midPoint = Math.floor(points.length / 2);
              ctx.moveTo(centerX, centerY);
              ctx.lineTo(points[midPoint].x, points[midPoint].y);
              ctx.strokeStyle = `rgba(${layerColor.r - 80}, ${layerColor.g - 50}, ${layerColor.b - 50}, 0.3)`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
        }
      }

      // Draw inner core with multiple circles
      const coreGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 25);
      coreGradient.addColorStop(0, 'rgba(255, 240, 120, 0.9)');
      coreGradient.addColorStop(0.5, 'rgba(255, 200, 100, 0.7)');
      coreGradient.addColorStop(1, 'rgba(220, 100, 80, 0.5)');
      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 18 * progress, 0, 2 * Math.PI);
      ctx.fill();

      // Inner stamen details
      if (progress > 0.3) {
        ctx.fillStyle = 'rgba(200, 80, 60, 0.4)';
        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * 2 * Math.PI;
          const x = centerX + Math.cos(angle) * 8;
          const y = centerY + Math.sin(angle) * 8;
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, 2 * Math.PI);
          ctx.fill();
        }
      }

      // Outer glow
      const glowGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, baseScale * 2
      );
      glowGradient.addColorStop(0, 'rgba(255, 100, 130, 0)');
      glowGradient.addColorStop(0.7, 'rgba(255, 100, 130, 0.1)');
      glowGradient.addColorStop(1, 'rgba(255, 100, 130, 0.05)');
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, baseScale * 2, 0, 2 * Math.PI);
      ctx.fill();

      // Edge sparkle effect
      if (progress > 0.6) {
        for (let i = 0; i < 12; i++) {
          const angle = (i / 12) * 2 * Math.PI + currentProgress * 0.5;
          const distance = baseScale * (1.5 + progress * 0.5);
          const x = centerX + Math.cos(angle) * distance;
          const y = centerY + Math.sin(angle) * distance;
          
          ctx.fillStyle = `rgba(255, 200, 150, ${0.3 * (1 - Math.abs(Math.cos(angle)))})`;
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, 2 * Math.PI);
          ctx.fill();
        }
      }

      // Draw Brenda's name
      const nameOpacity = Math.max(0, progress - 0.3);
      ctx.globalAlpha = nameOpacity;
      
      // Make everything responsive based on canvas size
      const fontSize = Math.max(18, Math.min(32, baseScale * 0.5));
      const nameY = centerY + baseScale * 1.15;
      const heartSize = fontSize * 0.65;
      
      ctx.font = `italic ${fontSize}px Georgia, serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Shadow effect for name
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillText('Brenda', centerX + 1.5, nameY + 1.5);
      
      // Main text with gradient
      const nameGradient = ctx.createLinearGradient(
        centerX - fontSize * 2, 
        nameY - fontSize * 0.5, 
        centerX + fontSize * 2, 
        nameY + fontSize * 0.5
      );
      nameGradient.addColorStop(0, 'rgba(255, 180, 150, 0.9)');
      nameGradient.addColorStop(0.5, 'rgba(255, 100, 120, 1)');
      nameGradient.addColorStop(1, 'rgba(255, 150, 180, 0.9)');
      ctx.fillStyle = nameGradient;
      ctx.fillText('Brenda', centerX, nameY);
      
      // Decorative hearts around the name
      if (progress > 0.5) {
        ctx.globalAlpha = nameOpacity * 0.8;
        ctx.font = `${heartSize}px serif`;
        const heartSpacing = fontSize * 2;
        for (let i = 0; i < 3; i++) {
          const offsetX = -heartSpacing + i * heartSpacing;
          ctx.fillStyle = 'rgba(255, 100, 130, 0.85)';
          ctx.fillText('❤', centerX + offsetX, nameY);
        }
      }
      
      ctx.globalAlpha = 1;
    };

    const animate = () => {
      if (currentProgress <= maxProgress) {
        drawRose(currentProgress);
        currentProgress += speed;
        animationRef.current = requestAnimationFrame(animate);
      } else {
        drawRose(1);
        setIsDrawing(false);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [shouldDraw]);

  return (
    <div className="mathematical-rose-container">
      <canvas ref={canvasRef} className="rose-canvas" />
    </div>
  );
}

export default MathematicalRose;
