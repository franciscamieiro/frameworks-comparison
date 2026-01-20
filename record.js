import puppeteer from 'puppeteer';
import fs from 'fs';

const URL = 'http://localhost:3000'; // your React app URL
const RECORDING_TIME = 10000; // 10 seconds
const TRACE_PATH = 'trace.json';

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const client = await page.target().createCDPSession();

  await page.goto(URL);

  // Enable performance metrics
  await client.send('Performance.enable');

  // Start tracing
  await page.tracing.start({
    path: TRACE_PATH,
    categories: [
      'devtools.timeline',
      'disabled-by-default-devtools.timeline',
      'animation'
    ]
  });

  // Click the Start Animation button
  await page.click('button');

  // Wait for the animation to finish (10 seconds)
  await new Promise(resolve => setTimeout(resolve, RECORDING_TIME));

  // Stop tracing
  await page.tracing.stop();

  // Get memory usage metrics
  const perfMetrics = await client.send('Performance.getMetrics');
  const jsHeapMB = perfMetrics.metrics.find(m => m.name === 'JSHeapUsedSize').value / (1024*1024);

  // Read the trace file
  const trace = JSON.parse(fs.readFileSync(TRACE_PATH, 'utf-8'));
  const events = trace.traceEvents;

  // Avg Recalculate Style
  const recalcEvents = events.filter(e => e.name === 'RecalculateStyles');
  const totalRecalcUs = recalcEvents.reduce((sum, e) => sum + (e.dur || 0), 0);
  const avgRecalcMs = recalcEvents.length ? totalRecalcUs / recalcEvents.length / 1000 : 0;

  // Paint Duration
  const paintEvents = events.filter(e => e.name === 'Paint');
  const totalPaintUs = paintEvents.reduce((sum, e) => sum + (e.dur || 0), 0);
  const avgPaintMs = paintEvents.length ? totalPaintUs / paintEvents.length / 1000 : 0;

  // DOM Updates visible? (any Recalculate or Layout events)
  const domUpdates = events.some(e => ['RecalculateStyles', 'Layout', 'UpdateLayerTree'].includes(e.name));

  // Approximate animation stutter: count frames >16ms
  const frameEvents = events.filter(e => ['DrawFrame', 'BeginFrame'].includes(e.name));
  let stutterCount = 0;
  const frameIntervals = [];

  for (let i = 0; i < frameEvents.length - 1; i++) {
    const dt = (frameEvents[i + 1].ts - frameEvents[i].ts) / 1000; // μs → ms
    frameIntervals.push(dt);
    if (dt > 16) stutterCount++;
  }

  // FPS metrics
  const totalFrames = frameIntervals.length;
  const totalTimeMs = frameIntervals.reduce((sum, dt) => sum + dt, 0);
  const avgFrameTimeMs = totalFrames ? totalTimeMs / totalFrames : 0;
  const avgFPS = avgFrameTimeMs ? 1000 / avgFrameTimeMs : 0;

  console.log('--- Animation Metrics ---');
  console.log(`Avg Recalculate Style per Frame: ${avgRecalcMs.toFixed(2)} ms`);
  console.log(`DOM Updates visible: ${domUpdates}`);
  console.log(`Avg Paint Duration: ${avgPaintMs.toFixed(2)} ms`);
  console.log(`Memory Usage (heap MB): ${jsHeapMB.toFixed(2)}`);
  console.log(`Animation Stutter Count (>16ms frames): ${stutterCount}`);
  console.log(`Total Frames: ${totalFrames}`);
  console.log(`Average Frame Time: ${avgFrameTimeMs.toFixed(2)} ms`);
  console.log(`Average FPS: ${avgFPS.toFixed(2)}`);

  await browser.close();
})();
