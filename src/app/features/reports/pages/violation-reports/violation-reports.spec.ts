import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViolationReports } from './violation-reports';

describe('ViolationReports', () => {
  let component: ViolationReports;
  let fixture: ComponentFixture<ViolationReports>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViolationReports]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViolationReports);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
