<template>
  <div class="balls-container">
    <div v-for="(ball, i) in balls" :key="i" class="ball" :style="{
      left: ball.x + 'px',
      top: ball.y + 'px',
      width: ball.size + 'px',
      height: ball.size + 'px',
      backgroundColor: ball.color,
    }"></div>
  </div>
</template>

<script setup>
import { ref, onUnmounted, watch } from 'vue';

const props = defineProps({
  start: Boolean,
  ballCount: { type: Number, default: 50 },
  onDone: Function,
});

const balls = ref([]);
const animationId = ref(null);
const startTime = ref(null);
const frameCount = ref(0);

const duration = 10000; // 10 segundos
const speed = 8;

function initBalls(count) {
  const width = window.innerWidth;
  const height = window.innerHeight;

  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 8,
    vy: (Math.random() - 0.5) * 8,
    size: 15,
    color: `hsl(${Math.random() * 360}, 70%, 50%)`,
  }));
}

function animate(timestamp) {
  if (startTime.value === null) startTime.value = timestamp;
  frameCount.value++;

  const elapsedTotal = timestamp - startTime.value;

  if (elapsedTotal >= duration) {
    const totalTime = elapsedTotal / 1000; 
    const avgFrameTime = elapsedTotal / frameCount.value; 
    const estimatedFPS = frameCount.value / totalTime;

    console.log(`Balls: ${props.ballCount}`);
    console.log(`🎞️  Frames: ${frameCount.value}`);
    console.log(`⚙️  Avg frame time: ${avgFrameTime.toFixed(2)} ms`);
    console.log(`📈  FPS: ${estimatedFPS.toFixed(2)}`);

    cancelAnimationFrame(animationId.value);
    animationId.value = null;

    if (props.onDone) props.onDone();
    return;
  }

  const width = window.innerWidth;
  const height = window.innerHeight;

  balls.value = balls.value.map((b) => {
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

  animationId.value = requestAnimationFrame(animate);
}

watch(
  () => props.start,
  (newVal) => {
    if (!newVal) return;

    cancelAnimationFrame(animationId.value);
    balls.value = initBalls(props.ballCount);
    startTime.value = null;
    frameCount.value = 0;

    animationId.value = requestAnimationFrame(animate);
  }
);

onUnmounted(() => {
  cancelAnimationFrame(animationId.value);
});

</script>

<style scoped>
.ball {
  position: absolute;
  will-change: transform;
}
</style>