import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Button } from '../../shared/ui/button/button';

@Component({
  selector: 'app-reports',
  imports: [
    MatButtonModule, 
    Button
  ],
  templateUrl: './reports.html',
  styleUrl: './reports.css',
})
export class Reports {

}
