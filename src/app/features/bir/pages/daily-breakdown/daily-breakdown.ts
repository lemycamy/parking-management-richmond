import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DateTime } from 'luxon';
import { Banknote, Car, Clock, LucideAngularModule, Motorbike } from 'lucide-angular';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CdkTableModule } from '@angular/cdk/table';

import { StatCard } from "../../../../shared/components/stat-card/stat-card";
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe, NgClass } from '@angular/common';


@Component({
  selector: 'app-daily-breakdown',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    StatCard,
    LucideAngularModule,
    CdkTableModule,
    DatePipe,
    NgClass,
  ],
  templateUrl: './daily-breakdown.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class BIRDailyBreakdown {
  readonly Banknote = Banknote;
  readonly Car = Car;
  readonly Clock = Clock;
  readonly Motorbike = Motorbike;

  readonly date = new FormControl(DateTime.now());

  readonly COLUMNS: string[] = ['plateNumber', 'vehicleType', 'enteredAt', 'exitedAt', 'duration', 'fee', 'status'] as const;
  dataSource = new MatTableDataSource<any>([]);

  ngOnInit(): void {
    console.log(this.date.value);
  }
}
