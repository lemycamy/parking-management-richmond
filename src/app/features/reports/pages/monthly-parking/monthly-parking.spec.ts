import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyParking } from './monthly-parking';

describe('MonthlyParking', () => {
  let component: MonthlyParking;
  let fixture: ComponentFixture<MonthlyParking>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthlyParking]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyParking);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
