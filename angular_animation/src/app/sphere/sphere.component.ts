import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // 👈 IMPORT THIS


@Component({
  selector: 'app-sphere',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sphere.component.html',
  styleUrl: './sphere.component.css'
})
export class SphereComponent {
  dots: { lat: number; lng: number }[] = [];

  constructor() {
    const rings = 18;     // vertical rings (latitude)
    const spokes = 36;    // dots per ring (longitude)

    for (let lat = 0; lat < rings; lat++) {
      for (let lng = 0; lng < spokes; lng++) {
        this.dots.push({ lat, lng });
      }
    }
  }
}
