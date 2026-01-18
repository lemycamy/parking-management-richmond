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

import { Car, LucideAngularModule, Motorbike, ScanQrCode } from 'lucide-angular';
import { PaginatedResponse } from '../../shared/types/paginated-response.type';

type SessionState = 'ACTIVE' | 'EXITED';

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
  readonly Motorbike = Motorbike;
  readonly ScanQrCode = ScanQrCode;

  readonly ACTIVE_SESSION_COLUMNS: string[] = ['vehicleType', 'plateNumber', 'enteredAt', 'status', 'actions'] as const;
  readonly EXITED_SESSION_COLUMNS: string[] = ['vehicleType', 'plateNumber', 'enteredAt', 'exitedAt', 'duration', 'fee', 'status'] as const;

  activeSessionsDataSource = new MatTableDataSource<ParkingSession>([]);
  activeSessionState: QueryState<PaginatedResponse<ParkingSession>> = {
    loading: false,
    error: null,
  };

  exitedSessionsDataSource = new MatTableDataSource<ParkingSession>([]);
  exitedSessionState: QueryState<PaginatedResponse<ParkingSession>> = {
    loading: false,
    error: null,
  };

  now$: Observable<Date> = interval(1000).pipe(
    startWith(0),
    map(() => new Date())
  );

  ngOnInit(): void {
    this.loadSessions('ACTIVE');
    this.loadSessions('EXITED');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadSessions(state: SessionState): void {
    const isActive = state === 'ACTIVE';
    const queryState = isActive ? this.activeSessionState : this.exitedSessionState;
    const dataSource = isActive ? this.activeSessionsDataSource : this.exitedSessionsDataSource;

    queryState.loading = true;
    queryState.error = null;

    this.parkingService.getParkingSessions(state).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        dataSource.data = response.data;
        queryState.loading = false;
      },
      error: err => {
        console.error('Error loading parking sessions:', err);
        queryState.error = err.message || 'Failed to load data';
        queryState.loading = false;
      },
    });
  }

  applyActiveSessionsFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.activeSessionsDataSource.filter = filterValue.trim().toLowerCase();
  }
}
