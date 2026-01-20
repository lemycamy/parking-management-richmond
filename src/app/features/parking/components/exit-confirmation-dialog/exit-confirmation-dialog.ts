import { Component, inject } from '@angular/core';
import { MatDialogContent, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-exit-confirmation-dialog',
  imports: [
    MatDialogContent
  ],
  templateUrl: './exit-confirmation-dialog.html',
  styleUrl: './exit-confirmation-dialog.css',
})
export class ExitConfirmationDialog {
  private dialogRef = inject(MatDialogRef<ExitConfirmationDialog>);

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
