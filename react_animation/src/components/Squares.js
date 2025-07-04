import React, { useEffect, useRef, useState } from 'react';
import './Squares.css';

const Square = ({ left }) => {
    const ref = useRef();
    const direction = useRef(1); // 1 = down, -1 = up
    const topRef = useRef(Math.random() * (window.innerHeight)); // initial random top

    useEffect(() => {
        const el = ref.current;
        const squareHeight = el.offsetHeight;
        const maxTop = window.innerHeight - squareHeight;
        let top = topRef.current;

        const animate = () => {
            top += direction.current;

            // Reverse direction if hitting top or bottom
            if (top >= maxTop) {
                top = maxTop;
                direction.current = -1;
            } else if (top <= 0) {
                top = 0;
                direction.current = 1;
            }

            el.style.top = `${top}px`;
            requestAnimationFrame(animate);
        };

        // Initial placement
        el.style.left = `${left}%`;
        el.style.top = `${top}px`;

        animate();
    }, [left]);

    return <div ref={ref} className="square" />;
};

const Squares = () => {
    const [squareCount, setSquareCount] = useState(10);

    const add10 = () => setSquareCount(prev => prev + 10);
    const resetSquares = () => setSquareCount(10);

    return (
        <div className="container">
            <div className="sidebar">
                <p>Top and left changes</p>
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

export default Squares;
