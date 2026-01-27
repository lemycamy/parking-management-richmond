import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { Button } from '../../../../shared/ui/button/button';
import { MatFormField, MatLabel, MatHint, MatInput, MatError } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { getLastMonthDate } from '../../../../shared/utils/date.utils';
import { MAT_DATE_FORMATS, MatOption } from '@angular/material/core';
import { DASHBOARD_DATE_FORMAT } from '../../../../shared/utils/date-format';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-monthly-dialog',
  imports: [
    MatDialogContent,
    ReactiveFormsModule,
    Button,
    MatFormField,
    MatLabel,
    MatHint,
    MatDatepickerModule,
    MatInput,
    MatError,
    MatOption,
    MatSelectModule
],
  templateUrl: './add-monthly-dialog.html',
  styleUrl: './add-monthly-dialog.css',
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: DASHBOARD_DATE_FORMAT },
  ]
})
export class AddMonthlyDialog {

  private dialogRef = inject(MatDialogRef<AddMonthlyDialog>)

  private fb = inject(FormBuilder);
  
    
  isSubmitting = false;
  entryForm: FormGroup = this.fb.group({
    vehicleType: ['', Validators.required],
    plateNumber: ['', Validators.required]
  })

  onSubmit() {
    if (this.entryForm.invalid) return;
    this.isSubmitting = true;
  } 

  readonly range = new FormGroup({
    start: new FormControl<Date | null>(getLastMonthDate()),
    end: new FormControl<Date | null>(new Date()),
  });

  cancel(): void {
    this.dialogRef.close(false);
  }

  confirmExit(): void {
    this.dialogRef.close(true);
  }
}
