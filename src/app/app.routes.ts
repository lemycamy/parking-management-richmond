import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { DashboardComponent } from './features/dashboard/dashboard';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'parking',    
        loadChildren: () =>
            import('./features/parking/parking.routes').then(m => m.parkingRoutes)
    },
    {
        path: 'reports',    
        loadChildren: () =>
            import('./features/reports/reports.routes').then(m => m.reportsRoutes)
    },
];
