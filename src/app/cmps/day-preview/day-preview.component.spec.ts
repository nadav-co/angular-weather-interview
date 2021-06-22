import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayPreviewComponent } from './day-preview.component';

describe('DayPreviewComponent', () => {
  let component: DayPreviewComponent;
  let fixture: ComponentFixture<DayPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
