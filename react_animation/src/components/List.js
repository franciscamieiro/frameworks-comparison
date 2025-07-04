import React from 'react';
import './List.css';

//help code: https://codepen.io/iamlark/pen/jYzYJg?editors=0110
//chatGPT

const List = () => {

    return (
        <div>
            <div className="buttons">
                <button id="clickMe">Click Me</button>
                <button id="clear">Clear</button>
            </div>
            <ol id="list"></ol>
        </div>
    );
};

export default List;
