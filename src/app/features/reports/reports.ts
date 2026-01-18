import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Button } from '../../shared/ui/button/button';
import { ArrowLeftRight, Calendar, FileText, LucideAngularModule } from 'lucide-angular';
import { ReportItemCard } from "./components/report-item-card/report-item-card";

@Component({
  selector: 'app-reports',
  imports: [
    MatButtonModule,
    LucideAngularModule,
    ReportItemCard
],
  templateUrl: './reports.html',
  styleUrl: './reports.css',
})
export class Reports {
  readonly ArrowLeftRight = ArrowLeftRight;
  readonly FileText = FileText;
  readonly Calendar = Calendar;
}
