"use client";

import { useEffect, useRef } from "react";

export default function RainEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let raindrops: {
      x: number;
      y: number;
      l: number;
      xs: number;
      ys: number;
    }[] = [];

    // Initialize raindrops
    const init = () => {
      raindrops = [];
      for (let i = 0; i < 200; i++) {
        // Increased slightly to fill the space
        raindrops.push({
          x: Math.random() * width,
          y: Math.random() * height,
          // DRASTICALLY REDUCED size and speed for a slow, small drizzle
          l: Math.random() * 13 + 0.5, // Very short drop length multiplier
          xs: Math.random() * 1 - 0.5, // Very gentle horizontal drift (nearly straight down)
          ys: Math.random() * 3 + 4, // Very slow vertical falling speed (4 to 7 px per frame)
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      // Cinematic subtle rain color (semi-transparent white/blue)
      ctx.strokeStyle = "rgba(174, 194, 224, 0.35)"; // Slightly boosted opacity since drops are smaller
      ctx.lineWidth = 0.5; // Slightly thicker so the tiny drops remain visible
      ctx.lineCap = "round";

      for (let i = 0; i < raindrops.length; i++) {
        const p = raindrops[i];
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
        ctx.stroke();
      }
      move();
    };

    const move = () => {
      for (let i = 0; i < raindrops.length; i++) {
        const p = raindrops[i];
        p.x += p.xs;
        p.y += p.ys;
        // Loop drops back to top
        if (p.x > width || p.y > height) {
          p.x = Math.random() * width;
          p.y = -20;
        }
      }
    };

    let animationFrameId: number;
    const loop = () => {
      draw();
      animationFrameId = requestAnimationFrame(loop);
    };

    init();
    loop();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      init();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[5] pointer-events-none"
      aria-hidden="true"
    />
  );
}
