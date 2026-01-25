import { inject, Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from '../../features/auth/services/auth';
import { NotificationService } from '../services/notification.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  readonly authService = inject(AuthService);
  readonly router = inject(Router);
  private notify = inject(NotificationService);

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    const allowedRoles = route.data['roles'] as string[];
    const userRole = this.authService.getRole();

    if (!allowedRoles.includes(userRole!)) {
      this.router.navigate(['/parking']);
      this.notify.unauthorized();
      return false;
    }

    return true;
  }
}
