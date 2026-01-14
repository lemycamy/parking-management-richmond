import { Routes } from '@angular/router';
import { ParkingComponent } from './features/parking/parking';
import { Reports } from './features/reports/reports';
import { ExitReceiptComponent } from './features/parking/pages/exit-receipt/exit-receipt';

export const routes: Routes = [
    { 
        path: 'parking', 
        component: ParkingComponent
    },
    {
        path: 'parking/exit-receipt',
        component: ExitReceiptComponent
    },
    { 
        path: 'reports', 
        component: Reports
    },
];
