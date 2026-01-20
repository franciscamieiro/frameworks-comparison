<script lang="ts">
	import { onDestroy, createEventDispatcher } from 'svelte';
	import { browser } from '$app/environment';

	export let start: boolean;
	export let ballCount: number = 50; // default
	const dispatch = createEventDispatcher();

	type Ball = {
		x: number;
		y: number;
		vx: number;
		vy: number;
		size: number;
		color: string;
	};

	let balls: Ball[] = [];
	let animationId: number | null = null;
	let startTime: number | null = null;
	let frameCount = 0;
	const duration = 10000; // 10s
	const speed = 8;

	// dimensões da tela
	let width = 0;
	let height = 0;

	// inicializa as bolas
	function initBalls(count: number) {
		width = window.innerWidth;
		height = window.innerHeight;

		balls = Array.from({ length: count }, () => ({
			x: Math.random() * width,
			y: Math.random() * height,
			vx: (Math.random() - 0.5) * 8,
			vy: (Math.random() - 0.5) * 8,
			size: 15, // tamanho aleatório
			color: `hsl(${Math.random() * 360}, 70%, 50%)`, // cor aleatória
		}));
	}

	// animação principal
	function animate(timestamp: number) {
		if (!browser) return;

		if (startTime === null) startTime = timestamp;
		frameCount++;
		const elapsedTotal = timestamp - startTime; 
		
		if (elapsedTotal >= duration) { 
			const totalTime = elapsedTotal / 1000; 
			const avgFrameTime = elapsedTotal / frameCount; 
			const estimatedFPS = frameCount / totalTime;

			console.log(`Balls: ${balls.length}`);
			console.log(`🎞️  Frames: ${frameCount}`);
			console.log(`⚙️  Avg frame time: ${avgFrameTime.toFixed(2)} ms`);
			console.log(`📈  FPS: ${estimatedFPS.toFixed(2)}`);

			if (animationId !== null) cancelAnimationFrame(animationId);
			animationId = null;
			

			dispatch('done');
			return;
		}

		width = window.innerWidth;
		height = window.innerHeight;

		balls = balls.map((b) => {
			let { x, y, vx, vy, size } = b;

			x += vx;
			y += vy;

			const maxX = width - size;
			const maxY = height - size;

			if (x < 0) {
				x = 0;
				vx *= -1;
			} else if (x > maxX) {
				x = maxX;
				vx *= -1;
			}

			if (y < 0) {
				y = 0;
				vy *= -1;
			} else if (y > maxY) {
				y = maxY;
				vy *= -1;
			}

			return { ...b, x, y, vx, vy };
		});

		animationId = requestAnimationFrame(animate);
	}

	function startAnimation() {
		if (!browser) return;
		if (animationId !== null) cancelAnimationFrame(animationId);

		startTime = null;
		frameCount = 0;
		initBalls(ballCount);

		animationId = requestAnimationFrame(animate);
	}

	// reage ao start
	$: if (browser && start) startAnimation();

	onDestroy(() => {
		if (animationId !== null) cancelAnimationFrame(animationId);
	});
</script>

<div class="balls-container">
	{#each balls as ball, i (i)}
		<div
			class="ball"
			style="
				left: {ball.x}px;
				top: {ball.y}px;
				width: {ball.size}px;
				height: {ball.size}px;
				background-color: {ball.color};
			"
		></div>
	{/each}
</div>

<style>
	.ball {
		position: absolute;
		will-change: transform;
	}
</style>
