import { useEffect, useRef, useState } from 'react';
import './Squares.css';

const Square = ({ left }) => {
    const ref = useRef();
    const direction = useRef(1); // 1 = down, -1 = up
    const startY = useRef(Math.random() * (window.innerHeight - 20)); // initial position
    const y = useRef(startY.current);

    useEffect(() => {
        const el = ref.current;
        const squareHeight = 20; // matches .square height
        const maxY = window.innerHeight - squareHeight;
        const x = (left / 100) * window.innerWidth; // convert % to px for translateX

        const animate = () => {
            y.current += direction.current;

            if (y.current >= maxY) {
                y.current = maxY;
                direction.current = -1;
            } else if (y.current <= 0) {
                y.current = 0;
                direction.current = 1;
            }

            el.style.transform = `translate(${x}px, ${y.current}px)`;
            requestAnimationFrame(animate);
        };

        animate();
    }, [left]);

    return <div ref={ref} className="square" />;
};

const SquaresTransform = () => {
    const [squareCount, setSquareCount] = useState(10);

    const add10 = () => setSquareCount(prev => prev + 10);
    const resetSquares = () => setSquareCount(10);

    return (
        <div className="container">
            <div className="sidebar">
                <p>Transform changes</p>
                <button onClick={add10} className="btn">Add 10 Squares</button>
                <button onClick={resetSquares} className="btn">Reset Squares</button>
            </div>
            <div className="square-area">
                {Array.from({ length: squareCount }).map((_, index) => {
                    const laneCount = 20;
                    const column = index % laneCount;
                    const left = (column / laneCount) * 100;
                    return <Square key={index} left={left} />;
                })}
            </div>
        </div>
    );
};

export default SquaresTransform;
