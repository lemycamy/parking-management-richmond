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


export const YEAR_ONLY_FORMATS = {
  parse: {
    dateInput: 'yyyy',
  },
  display: {
    dateInput: 'yyyy',
    monthYearLabel: 'yyyy',
    dateA11yLabel: 'yyyy',
    monthYearA11yLabel: 'yyyy',
  },
};

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
    NgxEchartsDirective,
    MatLuxonDateModule
  ],
  templateUrl: './annual-report.html',
  styleUrl: './annual-report.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: DateAdapter, useClass: LuxonDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: YEAR_ONLY_FORMATS },
  ],
})
export class AnnualReport {
  readonly Banknote = Banknote;
  readonly Car = Car;
  readonly Clock = Clock;
  readonly Motorbike = Motorbike;
  readonly Eye = Eye;

  readonly date = new FormControl(DateTime.now());

  openReport() {
    console.log('open annual report');
  }

  setMonthAndYear(selected: DateTime, datepicker: any) {
    const current = this.date.value ?? DateTime.now();

    this.date.setValue(
      current.set({
        year: selected.year,
        month: 1,
        day: 1,
      })
    );

    datepicker._goToDateInView(selected, 'multi-year');
    datepicker.close();
  }

  vehicleChartInstance!: ECharts;
  revenueChartInstance!: ECharts;

  vehicleOption = {
    backgroundColor: '#FFF',
    legend: {
      orient: 'horizontal',
      left: 'left'
    },
    series: [
      {
        name: 'Vehicle Type',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 24, name: 'CAR' },
          { value: 47, name: 'MOTOR' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };


  revenueOption = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Car Revenue', 'Motor Revenue', 'Total Revenue']
    },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Car Revenue',
        data: [1500, 2350, 2200, 2150, 1350, 1550, 2600, 2550, 2250, 2100, 1850, 1950],
        type: 'line'
      },
      {
        name: 'Motor Revenue',
        data: [1300, 2000, 1200, 2125, 1250, 1400, 2250, 2500, 1850, 1950, 1550, 1650],
        type: 'line'
      },
      {
        name: 'Total Revenue',
        data: [1800, 4350, 3200, 4175, 2600, 1950, 2850, 5050, 4100, 4050, 3400, 3600],
        type: 'line'
      },
    ]
};




  onVehicleChartInit(e: ECharts) {
    this.vehicleChartInstance = e;
    console.log('on chart init:', e);
  }
  onRevenueChartInit(e: ECharts) {
    this.revenueChartInstance = e;
    console.log('on chart init:', e);
  }

  readonly COLUMNS: string[] = ['loggedMonth', 'carAmount', 'motorAmount', 'duration', 'totalRevenue', 'view'] as const;
  dataSource = new MatTableDataSource<any>(['test-element']);

  ngOnInit(): void {
    console.log(this.date.value);
  }
}
