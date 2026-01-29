import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth';
import { Button } from '../../shared/ui/button/button';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink, 
    Button
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  public authService = inject(AuthService);

  menuItems = [
    { label: 'Dashboard', path: 'dashboard', roles: ['admin']  },
    { label: 'Parking', path: 'parking', roles: ['admin', 'user', 'thetaxman'] },
    { label: 'Reports', path: 'reports', roles: ['admin'] },
    { label: 'Reports', path: 'b/reports', roles: ['thetaxman'] },
  ];

  hasAccess(roles?: string[]): boolean {
    const role = this.authService.getRole();
    if (!role) return false;
    if (!roles) return false;
    return roles.includes(role);
  }
}
