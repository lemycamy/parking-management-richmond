import { Component, inject } from '@angular/core';
import { MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { Button } from '../../../../shared/ui/button/button';

@Component({
  selector: 'app-exit-confirmation-dialog',
  imports: [
    MatDialogContent,
    Button
  ],
  templateUrl: './exit-confirmation-dialog.html',
  styleUrl: './exit-confirmation-dialog.css',
})
export class ExitConfirmationDialog {
  private dialogRef = inject(MatDialogRef<ExitConfirmationDialog>);

  cancel(): void {
    this.dialogRef.close(false);
  }

  confirmExit(): void {
    this.dialogRef.close(true);
  }
}
