import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'nsky-input',  // Corrija o seletor aqui
  templateUrl: './nsky-input.component.html',
  styleUrls: ['./nsky-input.component.css'],
  standalone: true, // Make sure to include this line
  imports: []
})

export class NskyInputComponent {
  validationInput: string = '';
  classCss: string = 'input-text';

  @Input() text: string = '';
  @Input() initialTitle: string = '';
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() type: string = '';
  @Input() maxlength: string = '';
  @Input() max: string = '';
  @Input() min: string = '';
  @Input('validation')
  set validation(value: string) {
    if(value === 'invalid') {
      this.validationInput = 'invalid'
      this.classCss = 'input-error'
    } else if (value === 'valid') {
      this.validationInput = 'valid'
      this.classCss = 'input-text'
    } else {
      this.validationInput = ''
      this.classCss = 'input-text'
    }
  }
  @Input() messageError: string = '';
}
