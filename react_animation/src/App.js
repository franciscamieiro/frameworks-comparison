import './App.css';
import { useState } from 'react';
//import Sphere from './components/Sphere.js';
//import Buttons from './components/Buttons.js';
//import Squares from './components/Squares.js';
//import SquaresTransform from './components/SquaresTransform.js';
//import BouncingBall from './components/BouncingBall.js';
import BouncingBalls from './components/BouncingBalls.js';


function App() {
  /*const dots = [];
  const latCount = 18;
  const lngCount = 36;
  for (let lat = 0; lat <= latCount; lat++) {
    const isPole = lat === 0 || lat === latCount;
    //conditional to have only 1 dot on each pole
    const lngSteps = isPole ? 1 : lngCount;
    for (let lng = 0; lng < lngSteps; lng++) {
      dots.push({ lat, lng });
    }
  }*/

  const [start, setStart] = useState(false);
  const [ballCount, setBallCount] = useState(50);

  const handleStart = () => {
    setStart(true); // triggers the animation
  };

  const resetStart = () => {
    setStart(false); // callback quando termina
  };

  const handleSetBallCount = (count) => {
    setBallCount(count);
    console.log(count);
  };

  return (
    <div className="App">
      <div className="App-body">
        <h1>React Balls Benchmark</h1>

      <div className="buttons">
        <button onClick={handleStart}>Start Animation</button>
        <button onClick={() => handleSetBallCount(50)}>50 Balls</button>
        <button onClick={() => handleSetBallCount(100)}>100 Balls</button>
        <button onClick={() => handleSetBallCount(500)}>500 Balls</button>
        <button onClick={() => handleSetBallCount(1000)}>1000 Balls</button>
      </div>

      <BouncingBalls start={start} ballCount={ballCount} onDone={resetStart} />
        
        {/*
          <Buttons></Buttons>
          <Squares></Squares>
          <Sphere dots={dots} latCount={latCount} lngCount={lngCount}></Sphere>
          <SquaresTransform></SquaresTransform>
        */}
      </div>
    </div>
  );
}

export default App;
