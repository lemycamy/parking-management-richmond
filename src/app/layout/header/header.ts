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
}
