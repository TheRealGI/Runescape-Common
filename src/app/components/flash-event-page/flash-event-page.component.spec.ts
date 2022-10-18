import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashEventPageComponent } from './flash-event-page.component';

describe('FlashEventPageComponent', () => {
  let component: FlashEventPageComponent;
  let fixture: ComponentFixture<FlashEventPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlashEventPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlashEventPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
