import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BouncingBallsChangeDetectionComponent } from './bouncing-balls-change-detection.component';

describe('BouncingBallsChangeDetectionComponent', () => {
  let component: BouncingBallsChangeDetectionComponent;
  let fixture: ComponentFixture<BouncingBallsChangeDetectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BouncingBallsChangeDetectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BouncingBallsChangeDetectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
