import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { DateTime } from 'luxon';
import { Banknote, Car, Clock, LucideAngularModule, Motorbike } from 'lucide-angular';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CdkTableModule } from '@angular/cdk/table';

import { StatCard } from "../../../../shared/components/stat-card/stat-card";
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe, NgClass } from '@angular/common';
import { NgxEchartsDirective } from 'ngx-echarts';
import type { ECharts } from 'echarts/core';
import { ParkingService } from '../../../parking/services/parking.service';
import { getTodayISO } from '../../../../shared/utils/date.utils';
import { ParkingStatistics } from '../../../../../graphql/generated/graphql';
import { formatMinutes } from '../../../../shared/utils/time-format';
import { Button } from "../../../../shared/ui/button/button";

type SessionState = 'ACTIVE' | 'EXITED';

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
    NgxEchartsDirective,
    Button
],
  templateUrl: './daily-breakdown.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class DailyBreakdown {
  readonly Banknote = Banknote;
  readonly Car = Car;
  readonly Clock = Clock;
  readonly Motorbike = Motorbike;

  private parkingService = inject(ParkingService);
  private destroy$ = new Subject<void>();
  private destroyRef = inject(DestroyRef);

  formatMinutes = formatMinutes;

  readonly date = new FormControl(DateTime.now(), { nonNullable: true });
  dateToday = this.date.value.toFormat('yyyy-MM-dd');

  readonly COLUMNS: string[] = ['plateNumber', 'vehicleType', 'enteredAt', 'exitedAt', 'duration', 'fee', 'status', 'actions'] as const;
  dataSource = new MatTableDataSource<any>([]);

  stats: ParkingStatistics | null = null;

  ngOnInit(): void {
    this.loadSessions()
    this.fetchParkingStatistics()

    this.date.valueChanges.subscribe(() => {
      this.dateToday = this.date.value.toFormat('yyyy-MM-dd');
      this.loadSessions()
      this.fetchParkingStatistics()
    })
  }

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
  }

  loadSessions(): void {
    this.parkingService.getParkingSessions({
      page: 1,
      limit: 10,
      parkingState: "EXITED",
      date: this.dateToday,
    }).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        this.dataSource.data = response.data;
        console.log(this.dataSource.data)
      },
      error: err => {
        console.error('Error loading parking sessions:', err);
      },
    });
  }

  fetchParkingStatistics(): void {
    this.parkingService.getParkingStatistics({
      parkingState: "EXITED",
      date: this.dateToday
    }).valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: ({ data }) => {
        const stats = data?.parkingStatistics;

        if (!stats) {
          this.stats = null;
          return;
        }

        this.stats = {
          parkedVehicles: stats.parkedVehicles ?? 0,
          parkedMotorcycles: stats.parkedMotorcycles ?? 0,
          revenueToday: stats.revenueToday ?? 0,
          currentlyParked: stats.currentlyParked ?? 0,
          totalEntriesToday: stats.totalEntriesToday ?? 0,
        };

        console.log(this.stats);
      },
      error: (err) => {
        console.error('Error fetching parking statistics:', err);
      }
    })
  }
}
