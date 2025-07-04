// squares.component.ts
import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ViewChildren,
  QueryList,
  OnInit,
  signal,
  computed,
  effect
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-square',
  standalone: true,
  imports: [CommonModule],
  template: '<div #squareRef class="square"></div>',
  styleUrls: ['./squares.component.css']
})
export class SquareComponent implements AfterViewInit {
  @Input() left!: number;
  @ViewChild('squareRef') squareRef!: ElementRef<HTMLDivElement>;

  private direction = 1;
  private y = Math.random() * (window.innerHeight - 20);

  ngAfterViewInit(): void {
    const el = this.squareRef.nativeElement;
    const squareHeight = 20;
    const maxY = window.innerHeight - squareHeight;
    const x = (this.left / 100) * window.innerWidth;

    const animate = () => {
      this.y += this.direction;

      if (this.y >= maxY) {
        this.y = maxY;
        this.direction = -1;
      } else if (this.y <= 0) {
        this.y = 0;
        this.direction = 1;
      }

      el.style.transform = `translate(${x}px, ${this.y}px)`;
      requestAnimationFrame(animate);
    };

    animate();
  }
}

@Component({
  selector: 'app-squares',
  standalone: true,
  imports: [CommonModule, SquareComponent],
  templateUrl: './squares.component.html',
  styleUrls: ['./squares.component.css']
})
export class SquaresComponent implements OnInit {
  squareCount = signal(10);

  squares = computed(() => Array.from({ length: this.squareCount() }, (_, i) => i));

  ngOnInit(): void {
    // Optional: could be used to debug re-renders
  }

  add10(): void {
    this.squareCount.update(c => c + 10);
  }

  resetSquares(): void {
    this.squareCount.set(10);
  }
}
