import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMonthlyDialog } from './add-monthly-dialog';

describe('AddMonthlyDialog', () => {
  let component: AddMonthlyDialog;
  let fixture: ComponentFixture<AddMonthlyDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMonthlyDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMonthlyDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
