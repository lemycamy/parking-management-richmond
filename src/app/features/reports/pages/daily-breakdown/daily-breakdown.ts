import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { provideLuxonDateAdapter } from '@angular/material-luxon-adapter';
import { DateTime } from 'luxon';
import { Banknote, Car, Clock } from 'lucide-angular';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { StatCard } from "../../../../shared/components/stat-card/stat-card";
import { DEFAULT_DATE_FORMAT } from '../../../../shared/utils/date-format';

@Component({
  selector: 'app-daily-breakdown',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    StatCard,
  ],
  templateUrl: './daily-breakdown.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class DailyBreakdown {
  readonly Banknote = Banknote;
  readonly Car = Car;
  readonly Clock = Clock;
  
  readonly date = new FormControl(DateTime.now());

  ngOnInit(): void {
    console.log(this.date.value);
  }
}
