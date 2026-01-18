import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DATE_FORMATS } from '@angular/material/core';

import { Banknote, Car, Clock, LucideAngularModule, TrendingUp,  } from 'lucide-angular';
import * as echarts from 'echarts/core';
import { LineChart, BarChart } from 'echarts/charts';
import { GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
echarts.use([LineChart, BarChart, GridComponent, CanvasRenderer]);

import { getLastMonthDate } from '../../shared/utils/date';
import { DASHBOARD_DATE_FORMAT } from '../../shared/utils/date-format';
import { StatCard } from "../../shared/components/stat-card/stat-card";

@Component({
  selector: 'app-dashboard',
  imports: [
    MatDatepickerModule, 
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    StatCard,
    NgxEchartsDirective,
    LucideAngularModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: DASHBOARD_DATE_FORMAT },
    provideEchartsCore({ echarts }),
  ]
})

export class DashboardComponent {
  readonly Banknote = Banknote
  readonly Car = Car;
  readonly Clock = Clock;
  readonly TrendingUp = TrendingUp;

  readonly range = new FormGroup({
    start: new FormControl<Date | null>(getLastMonthDate()),
    end: new FormControl<Date | null>(new Date()),
  });

  revenueChart: echarts.EChartsCoreOption = {
    grid: {
      top: '5%',
      bottom: '0%',
      left: '0%',
      right: '0%',
    },
    xAxis: {
      type: 'category',
      data: ['Jan 11, 2025', 'Jan 12, 2025', 'Jan 13, 2025', 'Jan 14, 2025', 'Jan 15, 2025', 'Jan 16, 2025', 'Jan 17, 2025'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true
      },
    ],
  };

  peakHoursChart: echarts.EChartsCoreOption = {
    grid: {
      top: '5%',
      left: '0%',
      right: '0%',
      bottom: '0%',
    },
    xAxis: [
      {
        type: 'category',
        data: ['6-8AM', '8-10AM', '10-12AM', '12-02PM', '02-04PM', '04-06PM', '06-08PM', '08-10PM', '12-02AM'],
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Direct',
        type: 'bar',
        barWidth: '60%',
        data: [10, 52, 200, 334, 390, 330, 220, 160, 90]
      }
    ]
  }
}
