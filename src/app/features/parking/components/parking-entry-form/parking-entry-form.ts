import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { finalize, interval, map, Observable, startWith } from 'rxjs';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

import { ParkingService } from '../../services/parking.service';

@Component({
  selector: 'app-parking-entry-form',
  imports: [
    CommonModule,
    DatePipe,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
  ],
  templateUrl: './parking-entry-form.html',
  styleUrl: './parking-entry-form.css',
})

export class ParkingEntryForm {
  private fb = inject(FormBuilder);
  private parkingService = inject(ParkingService)
  
  isSubmitting = false;
  entryForm: FormGroup = this.fb.group({
    vehicleType: ['', Validators.required],
    plateNumber: ['', Validators.required]
  })

  now$: Observable<Date> = interval(1000).pipe(
    startWith(0),
    map(() => new Date())
  );  

  onSubmit() {
    if (this.entryForm.invalid) return;
    this.isSubmitting = true;

    this.parkingService.createParkingSession(this.entryForm.value).pipe(
      finalize(() => {
        this.isSubmitting = false;
      })
    ).subscribe({
      next: (response) => {
        console.log('Parking created:', response);
        this.entryForm.reset();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}