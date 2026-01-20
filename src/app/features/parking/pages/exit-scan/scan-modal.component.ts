import { Component, ViewChild } from '@angular/core';
import { ZXingScannerComponent, ZXingScannerModule } from '@zxing/ngx-scanner';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BarcodeFormat } from '@zxing/library';

@Component({
  selector: 'app-scan-modal',
  standalone: true,
  imports: [ZXingScannerModule, MatDialogModule],
  templateUrl: './scan-modal.component.html',
})

export class ScanModalComponent {

  @ViewChild(ZXingScannerComponent)
  scanner!: ZXingScannerComponent;

  scanningEnabled = false;
  scannedResult: string | null = null;
  formats = [BarcodeFormat.QR_CODE];

  constructor(private dialogRef: MatDialogRef<ScanModalComponent>) {}

  async openScanner() {
    if (!this.scanner) {
      console.error('Scanner not ready');
      return;
    }

    try {
      const permission = await this.scanner.askForPermission();
      if (!permission) return;

      const devices = await this.scanner.updateVideoInputDevices();
      if (!devices?.length) return;

      this.scanner.device = devices[0];

    } catch (err) {
      console.error(err);
    }
  }

  onScanSuccess(result: string) {
    console.log('Scanned QR:', result);
    this.dialogRef.close();
    // this.scanner.reset();

  }

    close() {
    this.dialogRef.close();
  }
}


// export class ScanModalComponent {
//   @ViewChild('scanner') scanner!: ZXingScannerComponent;

//   scanningEnabled = false;
//   scannedResult: string | null = null;
//   formats = [BarcodeFormat.QR_CODE];

//   constructor(private dialogRef: MatDialogRef<ScanModalComponent>) {}

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

//   close() {
//     this.dialogRef.close();
//   }
// }
