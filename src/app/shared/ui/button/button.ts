import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  @HostBinding('class')
  hostClass = '';
  
}
