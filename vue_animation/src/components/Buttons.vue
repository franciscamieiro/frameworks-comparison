<template>
    <h1>Vue.js</h1>
    <button class="hover-button one">bounce.</button>
    <button class="hover-button two">wiggle.</button>
    <button class="hover-button three">stretch.</button>
    <button class="hover-button four">tilt.</button>
    <button class="hover-button five">slant.</button>
</template>

<style scoped>
h1{
    color: white;
  }
  
	.hover-button {
		color: black;
		height: 45px;
		width: 150px;
		border: none;
		border-radius: 10px;
		font-size: 20px;
		padding: 10px;
		margin: 10px;
		background: #ffffff;
		transition-duration: 0.4s;
		transition-timing-function: linear;
	}

	.hover-button:hover {
		background: #44e4ef;
	}

	.one:hover {
		animation-name: bounce;
		animation-duration: 0.4s;
		animation-timing-function: ease-in-out;
		animation-delay: 0s;
		animation-direction: alternate;
		animation-iteration-count: 3s;
		animation-fill-mode: forwards;
		animation-play-state: running;
	}

	@keyframes bounce {
		0%,
		100% {
			transform: scale(1);
		}

		25%,
		75% {
			transform: scale(0.9);
		}

		50% {
			transform: scale(1.1);
		}
	}

    .two:hover {
    animation-name: wiggle;
    animation-duration: 0.4s;
    animation-timing-function: ease-in-out;
    animation-delay: 0s;
    animation-direction: alternate;
    animation-iteration-count: 3s;
    animation-fill-mode: forwards;
    animation-play-state: running;
  }
  
  @keyframes wiggle {
  
    0%,
    100% {
      transform: translate(0, 0);
    }
  
    25%,
    75% {
      transform: translate(10px, 0);
    }
  
    50% {
      transform: translate(-10px, 0);
    }
  }
  
  .three:hover {
    animation-name: stretch;
    animation-duration: 0.4s;
    animation-timing-function: ease-in-out;
    animation-delay: 0s;
    animation-direction: alternate;
    animation-iteration-count: 3s;
    animation-fill-mode: forwards;
    animation-play-state: running;
  }
  
  @keyframes stretch {
  
    0%,
    100% {
      transform: scaleX(1);
    }
  
    50% {
      transform: scaleX(1.3);
    }
  }
  
  .four:hover {
    animation-name: tilt;
    animation-duration: .4s;
    animation-timing-function: ease-in-out;
    animation-delay: 0s;
    animation-direction: alternate;
    animation-iteration-count: 3s;
    animation-fill-mode: forwards;
    animation-play-state: running;
  }
  
  @keyframes tilt {
  
    0%,
    100% {}
  
    50% {
      transform: rotate(15deg);
    }
  }
  
  .five:hover {
    animation-name: slant;
    animation-duration: .4s;
    animation-timing-function: ease-in-out;
    animation-delay: 0s;
    animation-direction: alternate;
    animation-iteration-count: 3s;
    animation-fill-mode: forwards;
    animation-play-state: running;
  }
  
  @keyframes slant {
  
    0%,
    100% {}
  
    50% {
      transform: skew(-50deg, 5deg);
    }
  }
</style>
