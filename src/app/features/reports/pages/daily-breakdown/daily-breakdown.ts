import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { provideLuxonDateAdapter } from '@angular/material-luxon-adapter';
import { DateTime } from 'luxon';
import { Banknote, Car, Clock, LucideAngularModule, Motorbike } from 'lucide-angular';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CdkTableModule } from '@angular/cdk/table';

import { StatCard } from "../../../../shared/components/stat-card/stat-card";
import { DEFAULT_DATE_FORMAT } from '../../../../shared/utils/date-format';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe, NgClass } from '@angular/common';
import { NgxEchartsDirective } from 'ngx-echarts';
import type { ECharts, EChartsCoreOption } from 'echarts/core';


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
    NgxEchartsDirective
  ],
  templateUrl: './daily-breakdown.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class DailyBreakdown {
  readonly Banknote = Banknote;
  readonly Car = Car;
  readonly Clock = Clock;
  readonly Motorbike = Motorbike;

  readonly date = new FormControl(DateTime.now());

  chartInstance!: ECharts;
  option = {
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



  onChartInit(e: ECharts) {
    this.chartInstance = e;
    console.log('on chart init:', e);
  }

  readonly COLUMNS: string[] = ['plateNumber', 'vehicleType', 'enteredAt', 'exitedAt', 'duration', 'fee', 'status'] as const;
  dataSource = new MatTableDataSource<any>([]);

  ngOnInit(): void {
    console.log(this.date.value);
  }
}
