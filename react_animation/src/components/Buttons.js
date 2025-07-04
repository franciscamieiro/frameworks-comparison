import React from 'react';
import './Buttons.css';

const Buttons = () => {

    return (
<div className="item">
    <p className="description">Button hover animations:</p>
    {/*https://alvarotrigo.com/blog/10-cool-css-animations-to-add-to-your-website/*/}
    <button className='hover-button' id="button-2">
        <div id="slide"></div>
        <a href="#">fill.</a>
    </button>
    {/*https://codepen.io/AlexBelmonte/pen/yWzKYR*/}
    <button className="hover-button one">bounce.</button>
    <button className="hover-button two">wiggle.</button>
    <button className="hover-button three">stretch.</button>
    <button className="hover-button four">tilt.</button>
    <button className="hover-button five">slant.</button>
</div>)};


export default Buttons;
