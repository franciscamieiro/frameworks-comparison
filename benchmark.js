import puppeteer from 'puppeteer';
import fs from 'fs';

//const URL = ' http://localhost:4200'; angular
//const URL = 'http://localhost:3000'; react
//const URL = 'http://localhost:5174'; vue
//const URL = 'http://localhost:5173'; svelte

const URL = 'http://localhost:4200'; // Change to app URL
const RECORDING_TIME = 10000; // ms - 10s

(async () => {
    const browser = await puppeteer.launch({
        headless: true,
    });

    const page = await browser.newPage();

    console.log('Starting performance trace...');

    await page.tracing.start({
        path: 'trace.json',
        categories: [
            'devtools.timeline',
            'disabled-by-default-devtools.timeline.frame',
            'disabled-by-default-devtools.timeline',
            'animation'
        ]
    });

    const trace = JSON.parse(fs.readFileSync('trace.json', 'utf-8'));

    const timelineEvents = trace.traceEvents.filter(e =>
        e.cat.includes('timeline') || e.cat.includes('blink') || e.cat.includes('gpu')
    );

    await page.goto(URL);

    // Let animation run
    await new Promise(resolve => setTimeout(resolve, RECORDING_TIME));

    await page.tracing.stop();

    console.log('Trace saved to trace.json');

    await browser.close();

    // OPTIONAL: Extract frame durations from the trace
    const frames = timelineEvents.filter(e =>
        ['DrawFrame', 'BeginFrame', 'FrameStartedLoading'].includes(e.name)
    );

    const timestamps = frames
        .map(f => f.ts)
        .sort((a, b) => a - b);

    if (timestamps.length < 2) {
        console.log('Not enough frames to calculate average frame time.');
    } else {
        // Calculate frame intervals (in ms)
        const intervals = [];
        for (let i = 1; i < timestamps.length; i++) {
            intervals.push((timestamps[i] - timestamps[i - 1]) / 1000);
        }
        const avgFrameTime = intervals.reduce((a, b) => a + b, 0) / intervals.length;
        const fps = 1000 / avgFrameTime;

        console.log(`Frames found: ${frames.length}`);
        console.log(`Average frame time: ${avgFrameTime.toFixed(2)} ms`);
        console.log(`Estimated FPS: ${fps.toFixed(2)} fps`);
    }
})();
