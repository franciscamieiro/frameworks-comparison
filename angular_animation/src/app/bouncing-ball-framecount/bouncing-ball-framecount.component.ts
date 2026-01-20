import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-bouncing-ball-framecount',
  standalone: true,
  imports: [],
  templateUrl: './bouncing-ball-framecount.component.html',
  styleUrl: './bouncing-ball-framecount.component.css'
})

export class BouncingBallFrameCountComponent implements OnInit, OnDestroy {
  x = 0;
  direction = 1;
  animationId: any;

  frameCount = 0;
  lastTimestamp: DOMHighResTimeStamp = performance.now();

  startTime: DOMHighResTimeStamp = performance.now();
  readonly duration = 10000; // 10 seconds in ms

  ngOnInit() {
    this.startTime = performance.now();
    this.animationId = requestAnimationFrame(this.animate);
  }

  animate = (timestamp: DOMHighResTimeStamp) => {
    // --- Stop after 10 seconds ---
    if (timestamp - this.startTime >= this.duration) {
      console.log('Animation stopped after 10 seconds.');

      // Final summary logs
      const totalTime = (timestamp - this.startTime) / 1000; // seconds
      const avgFrameTime = (totalTime * 1000) / this.frameCount;
      const estimatedFPS = this.frameCount / totalTime;

      console.log(`Frames found: ${this.frameCount}`);
      console.log(`Average frame time: ${avgFrameTime.toFixed(2)} ms`);
      console.log(`Estimated FPS: ${estimatedFPS.toFixed(2)}`);

      return; // exit without requesting another frame
    }

    // --- Ball animation logic ---
    this.x += this.direction * 2;
    if (this.x > 300 || this.x < 0) {
      this.direction *= -1;
    }

    // --- FPS calculation ---
    this.frameCount++;

    // request next frame
    this.animationId = requestAnimationFrame(this.animate);
  };

  ngOnDestroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}
