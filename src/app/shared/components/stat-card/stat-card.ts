import { Component, Input } from '@angular/core';
import { LucideAngularModule, LucideIconData } from 'lucide-angular';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-stat-card',
  imports: [LucideAngularModule, NgClass],
  templateUrl: './stat-card.html',
  styleUrl: './stat-card.css',
})
export class StatCard {
  @Input({ required: true }) icon!: LucideIconData;
  @Input({ required: true }) label!: string;
  @Input({ required: true }) value!: number | string;
  
  @Input() iconBgClass = 'bg-green-200 text-green-700';
}
