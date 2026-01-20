import { useState, useEffect, useRef } from 'react';
import './BouncingBall.css';

function BouncingBall({start}) {
  const [x, setX] = useState(0);
  const direction = useRef(1);

  const startTime = useRef(performance.now());
  const frameCount = useRef(0);

  const duration = 10000; // 10 seconds in ms

  useEffect(() => {
    if (!start) return;

    startTime.current = performance.now(); // reset start time when animation starts
    frameCount.current = 0;

    let animationId;

    const animate = (timestamp) => {
      const elapsedTotal = timestamp - startTime.current;

      if (elapsedTotal >= duration) {
        console.log("Animation stopped after 10 seconds.");

        const totalTime = elapsedTotal / 1000; // seconds
        const avgFrameTime = elapsedTotal / frameCount.current; // ms per frame
        const estimatedFPS = frameCount.current / totalTime;

        console.log(`Frames found: ${frameCount.current}`);
        console.log(`Average frame time: ${avgFrameTime.toFixed(2)} ms`);
        console.log(`Estimated FPS: ${estimatedFPS.toFixed(2)}`);

        return; // stop animation
      }

      setX(prev => {
        let next = prev + direction.current * 2;
        if (next > 300 || next < 0) direction.current *= -1;
        return next;
      });

      // FPS measurement
      frameCount.current++;

      /* console number of frames each second
      const elapsed = (timestamp - lastTimestamp.current) / 1000; // seconds

      if (elapsed >= 1) {
        const fps = frameCount.current / elapsed;
        console.log(`FPS: ${fps.toFixed(1)}`);
        frameCount.current = 0;
        lastTimestamp.current = timestamp;
      }*/

      animationId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationId);
  }, [start, duration]);

  return <div style={{ transform: `translateX(${x}px)` }} className="ball" />;
}

export default BouncingBall;