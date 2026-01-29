import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyBreakdown } from './daily-breakdown';

describe('DailyBreakdown', () => {
  let component: DailyBreakdown;
  let fixture: ComponentFixture<DailyBreakdown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyBreakdown]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyBreakdown);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
