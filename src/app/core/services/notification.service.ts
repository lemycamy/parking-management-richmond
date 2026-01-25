import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})

export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  unauthorized() {
    this.snackBar.open(
      'You do not have access to this page',
      'OK',
      {
        duration: 3000,
      }
    )
  }
}
