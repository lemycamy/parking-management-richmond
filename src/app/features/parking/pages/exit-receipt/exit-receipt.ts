import { Component } from '@angular/core';
import { CommonModule, DatePipe, NgClass } from '@angular/common';

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
  selector: 'app-exit-receipt',
  imports: [DatePipe, NgClass, CommonModule],
  templateUrl: './exit-receipt.html',
  styleUrl: './exit-receipt.css',
})
export class ExitReceiptComponent {

  ELEMENT_DATA = [
  {
    id: '57e0f041-3597-4a2e-b9ea-466861bd2562',
    vehicleType: 'CAR',
    plateNumber: 'ABC-1234',
    enteredAt: '2026-01-14T10:59:58.494Z',
    exitedAt: null,
    durationMinutes: null,
    fee: 34,
    paymentStatus: 'UNPAID',
  }
];

}
