import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitReceipt } from './exit-receipt';

describe('ExitReceipt', () => {
  let component: ExitReceipt;
  let fixture: ComponentFixture<ExitReceipt>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExitReceipt]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExitReceipt);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
