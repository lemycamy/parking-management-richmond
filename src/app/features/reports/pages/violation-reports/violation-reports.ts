import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StatCard } from '../../../../shared/components/stat-card/stat-card';
import { Banknote, Car, Clock, Eye, LucideAngularModule, Motorbike } from 'lucide-angular';
import { DatePipe, NgClass } from '@angular/common';
import { NgxEchartsDirective } from 'ngx-echarts';
import { CdkTableModule } from '@angular/cdk/table';
import { ECharts } from 'echarts/core';
import { MatTableDataSource } from '@angular/material/table';
import { DateTime } from 'luxon';
import { MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
import { LuxonDateAdapter, MatLuxonDateModule } from '@angular/material-luxon-adapter';


@Component({
  selector: 'app-annual-report',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    StatCard,
    LucideAngularModule,
    CdkTableModule,
    MatLuxonDateModule
  ],
  templateUrl: './violation-reports.html',
  styleUrl: './violation-reports.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViolationReports {
  readonly Banknote = Banknote;
  readonly Car = Car;
  readonly Clock = Clock;
  readonly Motorbike = Motorbike;
  readonly Eye = Eye;

  readonly date = new FormControl(DateTime.now());

  openReport() {
    console.log('open violation report');
  }

  
  setMonthAndYear(selected: DateTime, datepicker: any) {
    const current = this.date.value ?? DateTime.now();

    this.date.setValue(
      current.set({
        year: selected.year,
        month: selected.month,
        day: selected.day,
      })
    );

    datepicker._goToDateInView(selected, 'multi-year');
    datepicker.close();
  }


  readonly COLUMNS: string[] = ['loggedDate', 'plateNumber', 'vehicleTypeOf', 'violationTypeOf', 'fineAmount', 'view'] as const;
  dataSource = new MatTableDataSource<any>(['test-element']);

  ngOnInit(): void {
    console.log(this.date.value);
  }
}
