import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

import { MatTableDataSource } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';


import { Car, LucideAngularModule, Motorbike, ScanQrCode } from 'lucide-angular';
import { ParkingEntryForm } from '../../components/parking-entry-form/parking-entry-form';
import { QueryState } from '../../../../core/models/graphql-response.model';
import { PaginatedResponse } from '../../../../shared/types/paginated-response.type';
import { ParkingSession } from '../../models/parking-session.model';
import { ParkingService } from '../../services/parking.service';
import { ExitConfirmationDialog } from '../../components/exit-confirmation-dialog/exit-confirmation-dialog';
import { ScanModalComponent } from './scan-modal.component';

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
  templateUrl: './exit-scan.html',
  styleUrl: './exit-scan.css',
})

export class ExitScan {
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

  

  openScanModal() {
  const dialogRef = this.dialog.open(ScanModalComponent, {
    width: '400px',
    disableClose: true
  });

  dialogRef.afterOpened().subscribe(() => {

    queueMicrotask(() => {
      dialogRef.componentInstance.openScanner();
    });
  });


  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      console.log('Scanned QR:', result);
    }
  });
}

}















// import { Component, ViewChild } from '@angular/core';
// import { ZXingScannerComponent, ZXingScannerModule } from '@zxing/ngx-scanner';
// import { BarcodeFormat } from '@zxing/library';

// @Component({
//   selector: 'app-exit-scan',
//   standalone: true,
//   imports: [ZXingScannerModule],
//   templateUrl: './exit-scan.html',
//   styleUrls: ['./exit-scan.css'],
// })
// export class ExitScan {
//   @ViewChild('scanner') scanner!: ZXingScannerComponent;

//   scanningEnabled = false;
//   scannedResult: string | null = null;
//   formats = [BarcodeFormat.QR_CODE];

//   async openScanner() {
//     if (!this.scanner) {
//     console.error('Scanner not ready');
//     return;
//   }

//     try {
//       const permission = await this.scanner.askForPermission();
//       if (!permission) {
//         console.error('Camera permission denied');
//         return;
//       }

//       const devices = await this.scanner.updateVideoInputDevices();
//       if (!devices || devices.length === 0) {
//         console.error('No camera devices found');
//         return;
//       }
//       this.scanner.device = devices[0];

//       this.scanningEnabled = true;
//     } catch (err) {
//       console.error('Could not start camera:', err);
//     }
//   }

//   onScanSuccess(result: string) {
//     console.log('QR Code Scanned:', result);
//     this.scannedResult = result;
//     this.scanningEnabled = false;
//   }

//   onScanError(err: any) {
//     console.error('ZXing error:', err);
//   }

//   closeScanner() {
//     this.scanningEnabled = false;
//   }
// }
