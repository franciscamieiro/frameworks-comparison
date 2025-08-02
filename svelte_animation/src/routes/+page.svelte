<h1>Svelte</h1>
<button class="hover-button one">bounce.</button>

<style>
	.hover-button {
		color: white;
		height: 45px;
		width: 150px;
		border: none;
		border-radius: 10px;
		font-size: 20px;
		padding: 10px;
		margin: 10px;
		background: #000000;
		transition-duration: 0.4s;
		transition-timing-function: linear;
	}

	.hover-button:hover {
		background: #44e4ef;
		color: black;
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
</style>
