import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BouncingBallFrameCountComponent } from './bouncing-ball-framecount.component';

describe('BouncingBallFrameCountComponent', () => {
  let component: BouncingBallFrameCountComponent;
  let fixture: ComponentFixture<BouncingBallFrameCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BouncingBallFrameCountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BouncingBallFrameCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
