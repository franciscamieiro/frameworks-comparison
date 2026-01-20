import { useState, useEffect, useRef } from 'react';
import './BouncingBalls.css';

function BouncingBalls({ start, ballCount = 50, onDone }) {
  const [balls, setBalls] = useState([]);
  const animationId = useRef(null);
  const startTime = useRef(null);
  const frameCount = useRef(0);
  const widthRef = useRef(window.innerWidth);
  const heightRef = useRef(window.innerHeight);

  const duration = 10000; // 10 seconds
  const speed = 8;

  // inicializa as bolas
  const initBalls = (count) => {
    const width = widthRef.current;
    const height = heightRef.current;

    return Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      size: 15,
      color: `hsl(${Math.random() * 360}, 70%, 50%)`
    }));
  };

  useEffect(() => {
    if (!start) return;

    // reinicia

    cancelAnimationFrame(animationId.current);
    setBalls(initBalls(ballCount));
    startTime.current = null;
    frameCount.current = 0;

    const animate = (timestamp) => {
      if (startTime.current === null) startTime.current = timestamp;
      frameCount.current++;

      const elapsed = timestamp - startTime.current;

      if (elapsed >= duration) {
        const totalTime = elapsed / 1000;
        const avgFrameTime = elapsed / frameCount.current;
        const estimatedFPS = frameCount.current / totalTime;

        console.log(`Balls: ${ballCount}`);
        console.log(`🎞️  Frames: ${frameCount.current}`);
        console.log(`⚙️  Avg frame time: ${avgFrameTime.toFixed(2)} ms`);
        console.log(`📈  FPS: ${estimatedFPS.toFixed(2)}`);


        cancelAnimationFrame(animationId.current);
        animationId.current = null;

        if (onDone) onDone();
        return;
      }

      setBalls((prevBalls) =>
        prevBalls.map((b) => {
          let { x, y, vx, vy, size } = b;

          x += vx;
          y += vy;

          const maxX = widthRef.current - size;
          const maxY = heightRef.current - size;

          if (x < 0) {
            x = 0;
            vx *= -1;
          } else if (x > maxX) {
            x = maxX;
            vx *= -1;
          }

          if (y < 0) {
            y = 0;
            vy *= -1;
          } else if (y > maxY) {
            y = maxY;
            vy *= -1;
          }

          return { ...b, x, y, vx, vy };
        })
      );

      animationId.current = requestAnimationFrame(animate);
    };

    animationId.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId.current);
  }, [start, ballCount, onDone]);

  useEffect(() => {
    console.log("A length de Balls mudou", balls.length);
  }, [balls.length]);

  return (
    <div className="balls-container">
      {balls.map((ball, i) => (
        <div
          key={i}
          className="ball"
          style={{
            left: `${ball.x}px`,
            top: `${ball.y}px`,
            width: `${ball.size}px`,
            height: `${ball.size}px`,
            backgroundColor: ball.color
          }}
        ></div>
      ))}
    </div>
  );
}

export default BouncingBalls;
