import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { interval, map, Observable, startWith, Subject, takeUntil } from 'rxjs';

import { MatTableDataSource } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { Button } from '../../shared/ui/button/button';
import { ParkingService } from './services/parking.service';
import { QueryState } from '../../core/models/graphql-response.model';
import { ParkingSession } from './models/parking-session.model';

import { Car, LucideAngularModule } from 'lucide-angular';
import { PaginatedResponse } from '../../shared/types/paginated-response.type';

const ELEMENT_DATA: any[] = [
  {
    id: "57e0f041-3597-4a2e-b9ea-466861bd2562",
    vehicleType: "CAR",
    plateNumber: "ABC-1234",
    enteredAt: "2026-01-14T10:59:58.494Z",
    durationMinutes: null,
    exitedAt: null,
    fee: 34,
    paymentStatus: "UNPAID"
  }
]

@Component({
  selector: 'app-parking',
  imports: [
    Button,
    CdkTableModule,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    DatePipe,
    LucideAngularModule,
  ],
  templateUrl: './parking.html',
  styleUrl: './parking.css',
})

export class ParkingComponent {
  private parkingService = inject(ParkingService);

  private destroy$ = new Subject<void>();

  readonly Car = Car;

  activeColumns: string[] = ['plateNumber', 'enteredAt', 'status', 'actions'];
  exitedColumns: string[] = ['plateNumber', 'enteredAt', 'exitedAt', 'duration', 'fee', 'status'];

  displayedColumns: string[] = ['plateNumber', 'enteredAt', 'exitedAt', 'status', 'actions'];
  dataSource = new MatTableDataSource<ParkingSession>([]);

  activeCarsData = new MatTableDataSource<ParkingSession>([]);
  queryState: QueryState<PaginatedResponse<ParkingSession>> = {
    data: null,
    loading: false,
    error: null,
  };

  now$: Observable<Date> = interval(1000).pipe(
    startWith(0),
    map(() => new Date())
  );

  ngOnInit(): void {
    this.activeCarsData.data = ELEMENT_DATA;
    // this.loadParkingSessions()
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadParkingSessions(): void {
    this.queryState.loading = true;
    this.queryState.error = null;

    this.parkingService.getParkingSessions(1, 12).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (data) => {
        this.queryState.data = data;
        this.activeCarsData.data = data.data;
        this.queryState.loading = false;
        console.log(this.activeCarsData.data)
      },
      error: err => {
        console.error('Error loading parking sessions:', err);
        this.queryState.error = err.message || 'Failed to load data';
        this.queryState.loading = false;
      },
    });
  }

  refreshData(): void {
    this.loadParkingSessions();
  }
}
