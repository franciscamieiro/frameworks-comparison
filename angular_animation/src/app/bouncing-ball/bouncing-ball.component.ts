import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-bouncing-ball',
  standalone: true,
  imports: [],
  templateUrl: './bouncing-ball.component.html',
  styleUrl: './bouncing-ball.component.css'
})

export class BouncingBallComponent implements OnInit, OnDestroy {
  x = 0;
  direction = 1;
  animationId: any;

  ngOnInit() {
    this.animate();
  }

  animate = () => {
    this.x += this.direction * 2;
    if (this.x > 300 || this.x < 0) this.direction *= -1;
    this.animationId = requestAnimationFrame(this.animate);
  };

  ngOnDestroy() {
    cancelAnimationFrame(this.animationId);
  }
}
