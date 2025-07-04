import './App.css';
import Sphere from './components/Sphere.js';
import Buttons from './components/Buttons.js';
import Squares from './components/Squares.js';
import SquaresTransform from './components/SquaresTransform.js';


function App() {

  const dots = [];

  const latCount = 18;
  const lngCount = 36;

  for (let lat = 0; lat <= latCount; lat++) {
    const isPole = lat === 0 || lat === latCount;
    //conditional to have only 1 dot on each pole
    const lngSteps = isPole ? 1 : lngCount;

    for (let lng = 0; lng < lngSteps; lng++) {
      dots.push({ lat, lng });
    }
  }

  return (
    <div className="App">
      <div className="App-body">

        {/*<Buttons></Buttons>

          <Squares></Squares>

          <Sphere dots={dots} latCount={latCount} lngCount={lngCount}></Sphere>

        */}

        <SquaresTransform></SquaresTransform>
         
      </div>
    </div>
  );
}

export default App;
