import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SphereComponent } from './sphere/sphere.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { SquaresComponent } from './squares/squares.component';
import { BouncingBallComponent } from './bouncing-ball/bouncing-ball.component';
import { BouncingBallFrameCountComponent } from './bouncing-ball-framecount/bouncing-ball-framecount.component';
import { BouncingBallsComponent } from './bouncing-balls/bouncing-balls.component';
import { BouncingBallsChangeDetectionComponent } from './bouncing-balls-change-detection/bouncing-balls-change-detection.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    BouncingBallsChangeDetectionComponent,
    BouncingBallsComponent,
    BouncingBallFrameCountComponent,
    BouncingBallComponent,
    SquaresComponent,
    ButtonsComponent,
    SphereComponent,
    CommonModule,
    RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  start = false;
  ballCount = 50;

  handleStart() {
    this.start = true;
  }

  resetStart() {
    this.start = false;
  }

  setBallCount(count: number) {
    this.ballCount = count;
    console.log(`Ball count: ${count}`);
  }
}
