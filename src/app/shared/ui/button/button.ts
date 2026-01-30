import { NgClass } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [
    NgClass
  ],
  templateUrl: './button.html',
  styleUrl: './button.css',
})

export class Button {
  @Input() variant: 'primary' | 'danger' | 'neutral' = 'primary';
  @Input() disabled: boolean = false;

  get buttonClasses(): string {
    const variants = {
      primary: 'bg-primary hover:bg-emerald-700 text-white',
      neutral: 'bg-white border-2 border-text-900 text-text-900',
      danger: 'bg-danger-900 text-white',
    }

    return variants[this.variant];
  }

  @HostBinding('class')
  hostClass = '';

}
