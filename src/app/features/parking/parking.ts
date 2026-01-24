import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { RouterLink } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ParkingService } from './services/parking.service';
import { QueryState } from '../../core/models/graphql-response.model';
import { ParkingSession } from './models/parking-session.model';

import { Car, Import, LucideAngularModule, Motorbike, ScanQrCode } from 'lucide-angular';
import { PaginatedResponse } from '../../shared/types/paginated-response.type';
import { ParkingEntryForm } from "./components/parking-entry-form/parking-entry-form";
import { ExitConfirmationDialog } from './components/exit-confirmation-dialog/exit-confirmation-dialog';
import { Button } from '../../shared/ui/button/button';
import { PARKING_MESSAGES } from './constants/parking.constants';

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
    MatDialogModule,
    RouterLink,
    Button,
    MatPaginator
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

  @ViewChild('activeSessionsPaginator') activeSessionsPaginator!: MatPaginator;
  @ViewChild('exitedSessionsPaginator') exitedSessionsPaginator!: MatPaginator;

  private parkingService = inject(ParkingService);
  private destroy$ = new Subject<void>();
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  sessionManagers = {
    active: {
      dataSource: new MatTableDataSource<ParkingSession>([]),
      state: { loading: false, error: null } as QueryState<PaginatedResponse<ParkingSession>>,
      paginator: null as MatPaginator | null
    },
    exited: {
      dataSource: new MatTableDataSource<ParkingSession>([]),
      state: { loading: false, error: null } as QueryState<PaginatedResponse<ParkingSession>>,
      paginator: null as MatPaginator | null
    }
  };

  ngOnInit(): void {
    this.loadSessions('ACTIVE');
    this.loadSessions('EXITED');
  }

  ngAfterViewInit() {
    this.sessionManagers.active.dataSource.paginator = this.activeSessionsPaginator;
    this.sessionManagers.exited.dataSource.paginator = this.exitedSessionsPaginator;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadSessions(state: SessionState): void {
    const manager = state === 'ACTIVE' ? this.sessionManagers.active : this.sessionManagers.exited;

    manager.state.loading = true;
    manager.state.error = null;

    this.parkingService.getParkingSessions(state).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        manager.dataSource.data = response.data;
        manager.state.loading = false;
      },
      error: err => {
        console.error('Error loading parking sessions:', err);
        manager.state.error = err.message || 'Failed to load data';
        manager.state.loading = false;
      },
    });
  }

  exitSession(element: any): void {
    const dialogRef = this.dialog.open(ExitConfirmationDialog);

    console.log(element)

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (!confirmed) return;

      console.log("exited")

      this.parkingService.exitParkingSession(element.id).subscribe({
        next: (response) => {
          this.snackBar.open(PARKING_MESSAGES.EXIT_SUCCESS, 'Close');
          this.loadSessions('ACTIVE');
          this.loadSessions('EXITED');  
        },
        error: (error) => {
          console.error('Error exiting session:', error);
          this.snackBar.open(error.message, "Okay");
        }
      })
    })
  }

  applyFilter(event: Event, state: SessionState): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    const dataSource = state === 'ACTIVE' 
      ? this.sessionManagers.active.dataSource 
      : this.sessionManagers.exited.dataSource;
    dataSource.filter = filterValue;
  }
}
