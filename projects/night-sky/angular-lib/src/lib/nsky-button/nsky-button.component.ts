import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'nsky-button',  // Corrija o seletor aqui
  templateUrl: './nsky-button.component.html',
  styleUrls: ['./nsky-button.component.css'],
  standalone: true, // Make sure to include this line
  imports: []
})

export class NskyButtonComponent {
  @Input() title: string = '';
  @Input() background: string = '';
  @Input() typeButton: string = ''
  @Input() textColor: string = '';
  @Input() size: string = '';
  @Input() classOptions: string = ''
}
