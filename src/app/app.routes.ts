import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { DashboardComponent } from './features/dashboard/dashboard';
import { Login } from './features/auth/login/login';
import { RoleGuard } from './core/guards/role.guard';
import { LoginGuard } from './core/guards/login.guard';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'login',
        canActivate: [LoginGuard],
        component: Login
    },
    {
        path: 'dashboard',
        canActivate: [RoleGuard],
        data: { roles: ['admin'] },
        component: DashboardComponent
    },
    {
        path: 'parking',    
        canActivate: [RoleGuard],
        data: { roles: ['admin', 'user', 'thetaxman'] },
        loadChildren: () =>
            import('./features/parking/parking.routes').then(m => m.parkingRoutes)
    },
    {
        path: 'reports',   
        canActivate: [RoleGuard],
        data: { roles: ['admin'] },
        loadChildren: () =>
            import('./features/reports/reports.routes').then(m => m.reportsRoutes)
    },
    {
        path: 'b/reports',   
        canActivate: [RoleGuard],
        data: { roles: ['admin', 'thetaxman'] },
        loadChildren: () =>
            import('./features/bir/bir.routes').then(m => m.birRoutes)
    },
];
