import React from 'react';
import './Sphere.css';

//help code: https://codepen.io/iamlark/pen/jYzYJg?editors=0110
//chatGPT

const Sphere = ({ dots = [], latCount, lngCount }) => {

  return (
    <div className="sphere">
      {dots.map((dot, i) => {
        const rotateY = dot.lng * (360 / lngCount);
        const rotateX = dot.lat * (180 / latCount) - 90;

        const radius = 95;
        const transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateZ(${radius}px)`;
        //const animationDelay = `${i * 0.001}s`;

        //code for faster movement at poles and more delay in center:
        // center is latCount / 2
        const latCenter = latCount / 2;

        // calculate how far this lat is from the equator (center)
        const latOffset = Math.abs(dot.lat - latCenter);

        const intensity = 1 - (latOffset / latCenter); // 1 at equator, 0 at poles
        const floatZ = 30 + (intensity * 20);

        // invert it so poles get smaller delay (they move first)
        const delayFactor = 1 - (latOffset / latCenter);  // 1 at pole, 0 at equator
        const animationDelay = `${delayFactor * 0.5}s`;

        const styleVars = {
          '--float-z': `${floatZ}px`,
          animationDelay,
          transform
        };

        //color dots with different colors:
        // Generate a hue based on latitude
        const hexLerp = (a, b, t) =>
          `rgb(${[0, 2, 4].map(i => 
            Math.round(parseInt(a.substr(i + 1, 2), 16) * (1 - t) + parseInt(b.substr(i + 1, 2), 16) * t)
          ).join(',')})`;
        
        const t = dot.lat / latCount;
        const dotColor = t < 0.5
          ? hexLerp('#FB8CAB', '#E65C9C', t * 2)
          : hexLerp('#E65C9C', '#CF268A', (t - 0.5) * 2);

        return (
          <div
            key={i}
            className="dot-wrapper"
            style={{
              transform,
              animationDelay
            }}
          >
            <div
              className="dot-float"
              style={{
                animationDelay
              }}
            >
              <div className="dot"
              style={{
                animationDelay, //NEED TO FIX HERE - ADD DELAY TO DOTS PULSING - IT'S NOT WORKING
                backgroundColor: dotColor
              }} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Sphere;
