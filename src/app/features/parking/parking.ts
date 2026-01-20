import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

import { MatTableDataSource } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { ParkingService } from './services/parking.service';
import { QueryState } from '../../core/models/graphql-response.model';
import { ParkingSession } from './models/parking-session.model';

import { Car, LucideAngularModule, Motorbike, ScanQrCode } from 'lucide-angular';
import { PaginatedResponse } from '../../shared/types/paginated-response.type';
import { ParkingEntryForm } from "./components/parking-entry-form/parking-entry-form";
import { ExitConfirmationDialog } from './components/exit-confirmation-dialog/exit-confirmation-dialog';

type SessionState = 'ACTIVE' | 'EXITED';

@Component({
  selector: 'app-parking',
  imports: [
    CdkTableModule,
    CommonModule,
    MatCardModule,
    MatInputModule,
    LucideAngularModule,
    ParkingEntryForm,
    MatDialogModule
  ],
  templateUrl: './parking.html',
  styleUrl: './parking.css',
})

export class ParkingComponent {
  readonly Car = Car;
  readonly Motorbike = Motorbike;
  readonly ScanQrCode = ScanQrCode;

  readonly ACTIVE_SESSION_COLUMNS: string[] = ['vehicleType', 'plateNumber', 'enteredAt', 'status', 'actions'] as const;
  readonly EXITED_SESSION_COLUMNS: string[] = ['vehicleType', 'plateNumber', 'enteredAt', 'exitedAt', 'duration', 'fee', 'status'] as const;

  private parkingService = inject(ParkingService);
  private destroy$ = new Subject<void>();
  private dialog = inject(MatDialog);

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

  exitSession(id: string): void {
    const dialogRef = this.dialog.open(ExitConfirmationDialog);

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (!confirmed) return;

      console.log("exited")

      this.parkingService.exitParkingSession(id).subscribe({
        next: (response) => {
          console.log(response);
          this.loadSessions('ACTIVE');
          this.loadSessions('EXITED');
        },
        error: (error) => {
          console.error('Error archiving attendee:', error);
        }
      })
    })
  }

  applyActiveSessionsFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.activeSessionsDataSource.filter = filterValue.trim().toLowerCase();
  }

  applyExitSessionsFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.exitedSessionsDataSource.filter = filterValue.trim().toLowerCase();
  }
}
