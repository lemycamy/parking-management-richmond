import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualReport } from './annual-report';

describe('AnnualReport', () => {
  let component: AnnualReport;
  let fixture: ComponentFixture<AnnualReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnualReport]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnualReport);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
