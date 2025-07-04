import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SphereComponent } from './sphere/sphere.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { SquaresComponent } from './squares/squares.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SquaresComponent, ButtonsComponent, SphereComponent, CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
