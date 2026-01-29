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


export const MONTH_YEAR_FORMATS = {
  parse: {
    dateInput: 'MMMM yyyy',
  },
  display: {
    dateInput: 'MMMM yyyy',
    monthYearLabel: 'MMMM yyyy',
    dateA11yLabel: 'MMMM yyyy',
    monthYearA11yLabel: 'MMMM yyyy',
  },
};

@Component({
  selector: 'app-monthly-summary',
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
    MatLuxonDateModule,
  ],
  templateUrl: './monthly-summary.html',
  styleUrl: './monthly-summary.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: DateAdapter, useClass: LuxonDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MONTH_YEAR_FORMATS },
  ],
})
export class BIRMonthlySummary {
  readonly Banknote = Banknote;
  readonly Car = Car;
  readonly Clock = Clock;
  readonly Motorbike = Motorbike;
  readonly Eye = Eye;

  readonly date = new FormControl(DateTime.now());

  
  openReport() {
    console.log('open monthly report');
  }

  setMonthAndYear(selected: DateTime, datepicker: any) {
    const current = this.date.value ?? DateTime.now();

    this.date.setValue(
      current.set({
        year: selected.year,
        month: selected.month,
        day: 1,
      })
    );

    datepicker.close();
  }

  vehicleChartInstance!: ECharts;
  revenueChartInstance!: ECharts;

  vehicleOption = {
    backgroundColor: '#FFF',
    tooltip: {
      trigger: 'item'
    },
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


  weekOneOption = {
    legend:{
      data: ['Car Revenue', 'Motor Revenue']
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Car Revenue',
        data: [1950, 2100, 1750, 850, 950, 1350, 1350],
        type: 'bar'
      },
      {
        name: 'Motor Revenue',
        data: [1200, 1800, 1500, 600, 700, 1100, 1200],
        type: 'bar'
      }
    ]
  };
  weekTwoOption = {
    legend:{
      data: ['Car Revenue', 'Motor Revenue']
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Car Revenue',
        data: [1400, 2250, 1600, 900, 1000, 1450, 1550],
        type: 'bar'
      },
      {
        name: 'Motor Revenue',
        data: [1200, 2000, 1500, 800, 700, 1100, 1300],
        type: 'bar'
      }
    ]
  };
  weekThreeOption = {
    legend:{
      data: ['Car Revenue', 'Motor Revenue']
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Car Revenue',
        data: [1500, 2350, 2200, 2150, 1350, 1550, 2600],
        type: 'bar'
      },
      {
        name  : 'Motor Revenue',
        data: [1200, 2000, 1500, 800, 700, 1100, 1300],
        type: 'bar'
      }
    ]
  };
  weekFourOption = {
    legend:{
      data: ['Car Revenue', 'Motor Revenue']
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Car Revenue',
        data: [2000, 4350, 3200, 4175, 2600, 1950, 2850],
        type: 'bar'
      },
      {
        name: 'Motor Revenue',
        data: [1200, 2000, 1500, 800, 700, 1100, 1300],
        type: 'bar'
      }
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

  readonly COLUMNS: string[] = ['loggedDate', 'carAmount', 'motorAmount', 'duration', 'totalRevenue', 'view'] as const;
  dataSource = new MatTableDataSource<any>(['test-element']);

  ngOnInit(): void {
    console.log(this.date.value);
  }
}
