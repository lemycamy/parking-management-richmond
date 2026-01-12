import { Component } from '@angular/core';
import { Button } from '../../shared/ui/button/button';
import { CdkTableModule } from '@angular/cdk/table';
import { MatTableDataSource } from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import { CommonModule } from '@angular/common';

export interface ParkingSession {
  plateNumber: string;
  enteredAt: string;
  exitedAt: string | null;
  status: 'PARKED' | 'EXITED' | 'OVERDUE';
}

export const ELEMENT_DATA: ParkingSession[] = [
  {
    plateNumber: 'ACE-1234',
    enteredAt: '2026-01-11T08:12:00',
    exitedAt: null,
    status: 'PARKED',
  },
  {
    plateNumber: 'BGT-9281',
    enteredAt: '2026-01-11T07:45:00',
    exitedAt: '2026-01-11T10:02:00',
    status: 'EXITED',
  },
  {
    plateNumber: 'KLM-5529',
    enteredAt: '2026-01-11T06:30:00',
    exitedAt: '2026-01-11T09:15:00',
    status: 'EXITED',
  },
  {
    plateNumber: 'XQZ-4410',
    enteredAt: '2026-01-11T05:20:00',
    exitedAt: null,
    status: 'OVERDUE',
  },
  {
    plateNumber: 'PNY-7812',
    enteredAt: '2026-01-11T09:05:00',
    exitedAt: null,
    status: 'PARKED',
  },
  {
    plateNumber: 'TRK-3399',
    enteredAt: '2026-01-10T23:40:00',
    exitedAt: '2026-01-11T06:10:00',
    status: 'EXITED',
  },
];

//added mattabs and common modules
@Component({
  selector: 'app-parking',
  imports: [Button, CdkTableModule, MatTabsModule, CommonModule],
  templateUrl: './parking.html',
  styleUrl: './parking.css',
})

export class Parking {
  displayedColumns: string[] = ['plateNumber', 'enteredAt', 'exitedAt', 'status', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

 //added sum  filtering for the tabs
    activeData: ParkingSession[] = [];
    exitedData: ParkingSession[] = [];

  ngOnInit(): void {
    this.dataSource.data = ELEMENT_DATA;

  //sum gpt ahh filter  
    this.activeData = ELEMENT_DATA.filter(e => e.status === 'PARKED' || e.status === 'OVERDUE');
    this.exitedData = ELEMENT_DATA.filter(e => e.status === 'EXITED');
  }
}
