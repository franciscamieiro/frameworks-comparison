import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bouncing-balls',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bouncing-balls.component.html',
  styleUrls: ['./bouncing-balls.component.css']
})
export class BouncingBallsComponent implements OnChanges, OnDestroy {
  @Input() start = false;
  @Input() ballCount = 50;
  @Output() done = new EventEmitter<void>();

  balls: any[] = [];
  private animationId: number | null = null;
  private startTime: number | null = null;
  private frameCount = 0;
  private duration = 10000;
  private readonly speed = 8;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['start'] && this.start) {
      this.startAnimation();
    }
  }

  ngOnDestroy() {
    if (this.animationId) cancelAnimationFrame(this.animationId);
  }

  trackByFn(index: number, ball: any) {
    return ball.id; // ou index, se cada bola sempre estiver na mesma posição do array
  }

  private initBalls(count: number) {
    const width = window.innerWidth;
    const height = window.innerHeight;
    return Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * this.speed,
      vy: (Math.random() - 0.5) * this.speed,
      size: 15,
      color: `hsl(${Math.random() * 360}, 70%, 50%)`
    }));
  }

  private startAnimation() {
    if (this.animationId) cancelAnimationFrame(this.animationId);
    this.balls = this.initBalls(this.ballCount);
    this.startTime = null;
    this.frameCount = 0;

    const animate = (timestamp: number) => {
      if (this.startTime === null) this.startTime = timestamp;
      this.frameCount++;
      const elapsedTotal = timestamp - this.startTime;

      if (elapsedTotal >= this.duration) {
        const totalTime = elapsedTotal / 1000; 
        const avgFrameTime = elapsedTotal / this.frameCount; 
        const estimatedFPS = this.frameCount / totalTime;

        console.log(`Balls: ${this.ballCount}`);
        console.log(`🎞️  Frames: ${this.frameCount}`);
        console.log(`⚙️  Avg frame time: ${avgFrameTime.toFixed(2)} ms`);
        console.log(`📈  FPS: ${estimatedFPS.toFixed(2)}`);

        if (this.animationId) cancelAnimationFrame(this.animationId);
        this.animationId = null;

        this.done.emit();
        return;
      }

      const width = window.innerWidth;
      const height = window.innerHeight;

      this.balls = this.balls.map((b) => {
        let { x, y, vx, vy, size } = b;

        x += vx;
        y += vy;

        const maxX = width - size;
        const maxY = height - size;

        if (x < 0) { x = 0; vx *= -1; }
        else if (x > maxX) { x = maxX; vx *= -1; }

        if (y < 0) { y = 0; vy *= -1; }
        else if (y > maxY) { y = maxY; vy *= -1; }

        return { ...b, x, y, vx, vy };
      });

      this.animationId = requestAnimationFrame(animate);
    };

    this.animationId = requestAnimationFrame(animate);
  }
}
