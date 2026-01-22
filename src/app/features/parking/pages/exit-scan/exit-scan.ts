import { Component, ViewChild } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { ZXingScannerComponent, ZXingScannerModule } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-parking',
  imports: [ZXingScannerModule],
  templateUrl: './exit-scan.html',
  styleUrl: './exit-scan.css',
})

export class ExitScan {
  @ViewChild(ZXingScannerComponent)
  scanner!: ZXingScannerComponent;

  scannedResult: string | null = null;
  formats = [BarcodeFormat.QR_CODE];
  hasPermission = false;

  ngAfterViewInit() {
    setTimeout(() => {
      this.openScanner();
    }, 100);
  }

  async openScanner() {
    if (!this.scanner) {
      console.error('Scanner not ready');
      return;
    }

    try {
      const permission = await this.scanner.askForPermission();
      this.hasPermission = permission;

      if (!permission) {
        console.error('Camera permission denied');
        return;
      };

      const devices = await this.scanner.updateVideoInputDevices();
      if (!devices || devices.length === 0) {
        console.error('No camera devices found');
        return;
      }

      const backCamera = devices.find(device => 
        device.label.toLowerCase().includes('back')
      ) || devices[0];

      this.scanner.device = backCamera;
      await this.scanner.scanStart();
    } catch (err) {
      console.error('Scanner error:', err);
    }
  }

  onScanSuccess(result: string) {
    console.log('Scanned QR:', result);
    this.scannedResult = result;
    this.scanner.scanStop();
  }

  stopScanner() {
    if (this.scanner) {
      this.scanner.scanStop();
    }
  }
}
