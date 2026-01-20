<template>
  <div class="ball" :style="{ transform: `translateX(${x}px)` }"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const x = ref(0);
const direction = ref(1);
let animationId;

const animate = () => {

  //console.log frame count 
  
  x.value += direction.value * 2;
  if (x.value > 300 || x.value < 0) direction.value *= -1;
  animationId = requestAnimationFrame(animate);
};

onMounted(() => {
  animate();
});

onUnmounted(() => {
  cancelAnimationFrame(animationId);
});
</script>

<style scoped>
.ball {
  width: 50px;
  height: 50px;
  background-color: crimson;
  border-radius: 50%;
  position: relative;
}
</style>