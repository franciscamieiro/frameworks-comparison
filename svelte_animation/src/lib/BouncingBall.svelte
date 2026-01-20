<script lang="ts">
	
	import { onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	export let start: boolean;
	export let onDone: () => void;

	let x = 0;
	let direction = 1;
	let animationId: number | null = null;

	let startTime: number | null = null;
	let frameCount = 0;
	const duration = 10000; // 10s

	function animate(timestamp: number) {
		if (startTime === null) startTime = timestamp;
		frameCount++;

		const elapsedTotal = timestamp - startTime;

		if (elapsedTotal >= duration) {
			console.log('Animation stopped after 10 seconds.');

			const totalTime = elapsedTotal / 1000;
			const avgFrameTime = elapsedTotal / frameCount;
			const estimatedFPS = frameCount / totalTime;

			console.log(`Frames found: ${frameCount}`);
			console.log(`Average frame time: ${avgFrameTime.toFixed(2)} ms`);
			console.log(`Estimated FPS: ${estimatedFPS.toFixed(2)}`);

			if (animationId !== null) cancelAnimationFrame(animationId);
			animationId = null;

			onDone?.(); // avisa o pai
			return;
		}

		x += direction * 2;
		if (x > 300 || x < 0) direction *= -1;

		animationId = requestAnimationFrame(animate);
	}

	function startAnimation() {
		if (!browser) return;
		if (animationId !== null) cancelAnimationFrame(animationId);

		x = 0;
		direction = 1;
		startTime = null;
		frameCount = 0;

		animationId = requestAnimationFrame(animate);
	}

	// inicia a animação apenas quando start for clicado
	$: if (start) startAnimation();

	onDestroy(() => {
		if (animationId !== null) cancelAnimationFrame(animationId);
	});


</script>

<div class="ball" style="transform: translateX({x}px)"></div>


<style>
	.ball {
		width: 50px;
		height: 50px;
		background-color: red;
		border-radius: 50%;
		position: absolute;
		top: 100px;
		transition: transform 0.01s linear;
	}
</style>
