import { Routes } from '@angular/router';
import { ParkingComponent } from './features/parking/parking';
import { Reports } from './features/reports/reports';
import { ExitReceiptComponent } from './features/parking/pages/exit-receipt/exit-receipt';
import { DashboardComponent } from './features/dashboard/dashboard';
import { DailyBreakdown } from './features/reports/pages/daily-breakdown/daily-breakdown';

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
        path: 'dashboard',
        component: DashboardComponent
    },
    { 
        path: 'reports', 
        component: Reports
    },
    {
        path: 'reports/daily-breakdown',
        component: DailyBreakdown
    },
];
