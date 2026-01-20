<script setup lang="ts">

import { ref } from 'vue';
import BouncingBalls from './components/BouncingBalls.vue';

const start = ref(false);
const ballCount = ref(50);

function handleStart() {
  start.value = true;
  console.log(start);
}

function resetStart() {
  start.value = false;
}

function handleSetBallCount(count: number) {
  ballCount.value = count;
  console.log(count);
}
</script>

<template>
<div class="App">
    <div class="App-body">
      <h1>Vue Balls Benchmark</h1>

      <div class="buttons">
        <button @click="handleStart()">Start Animation</button>
        <button @click="handleSetBallCount(50)">50 Balls</button>
        <button @click="handleSetBallCount(100)">100 Balls</button>
        <button @click="handleSetBallCount(500)">500 Balls</button>
        <button @click="handleSetBallCount(1000)">1000 Balls</button>
      </div>

      <BouncingBalls
        :start="start"
        :ballCount="ballCount"
        :onDone="resetStart"
      />
    </div>
  </div>
</template>

