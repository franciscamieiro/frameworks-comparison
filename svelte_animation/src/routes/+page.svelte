<script lang="ts">
	import BouncingBalls from '$lib/BouncingBalls.svelte';
	let start = false;
	let ballCount = 50;

	function handleStart() {
		start = true; // triggers the animation
	}

	function resetStart() {
		start = false;
	}

	function setBallCount(count: number) {
		ballCount = count;
		console.log(ballCount);
	}
</script>

<div class="App">
	<div class="App-body">
		<h1>Svelte Balls Benchmark</h1>

		<div class="buttons">
			<button on:click={handleStart}>Start Animation</button>
			<button on:click={() => setBallCount(50)}>50 Balls</button>
			<button on:click={() => setBallCount(100)}>100 Balls</button>
			<button on:click={() => setBallCount(500)}>500 Balls</button>
			<button on:click={() => setBallCount(1000)}>1000 Balls</button>
		</div>

		<BouncingBalls {start} {ballCount} on:done={resetStart} />
	</div>
</div>

<style>
	.App {
		width: 100%;
		box-sizing: border-box;
		position: relative;
		background-color: #1e2229; /* match Svelte look */
		min-height: 100vh;
		color: white;
		overflow: hidden;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}

	/* Keep body container but align to top/left instead of centered */
	.App-body {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
		padding: 20px;
		position: relative;
		z-index: 10; /* stay above the animated balls */
	}

	h1 {
		margin: 0 0 15px 0;
		font-size: 1.8rem;
		font-weight: 700;
	}

	.buttons {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		margin-bottom: 10px;
	}

	button {
		background: #f3f3f3;
		border: 1px solid #ccc;
		padding: 8px 16px;
		cursor: pointer;
		font-weight: 500;
		border-radius: 3px;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
	}

	button:hover {
		background: #e9e9e9;
	}

	/* keep your small-screen layout adjustments */
	@media screen and (max-width: 650px) {
		.App-body {
			align-items: center;
		}

		.buttons {
			justify-content: center;
		}
	}
</style>
