import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Button } from '../../shared/ui/button/button';
import { AlertTriangle, ArrowLeftRight, Calendar, CarFront, FileText, LucideAngularModule } from 'lucide-angular';
import { ReportItemCard } from "../../shared/components/report-item-card/report-item-card";

@Component({
  selector: 'app-reports',
  imports: [
    MatButtonModule,
    LucideAngularModule,
    ReportItemCard
],
  templateUrl: './bir.html',
  styleUrl: './bir.css',
})
export class Bir {
  readonly ArrowLeftRight = ArrowLeftRight;
  readonly FileText = FileText;
  readonly Calendar = Calendar;
  readonly AlertTriangle = AlertTriangle;
  readonly CarFront = CarFront;
}
