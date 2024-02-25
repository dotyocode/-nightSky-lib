import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'nsky-check',
  templateUrl: './nsky-check.component.html',
  styleUrls: ['./nsky-check.component.css'],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NskyCheckComponent),
      multi: true,
    },
  ],
})
export class NskyCheckComponent implements ControlValueAccessor {
  validationInput: string = '';
  classCss: string = 'input-text';
  selectedItem: any = '';

  @Input() text: string = '';
  @Input() disabled: boolean = false;
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() for: string = '';
  @Input() checked: any;
  @Input('validation')
  set validation(value: string) {
    if (value === 'invalid') {
      this.validationInput = 'invalid';
      this.classCss = 'input-error';
    } else if (value === 'valid') {
      this.validationInput = 'valid';
      this.classCss = 'input-text';
    } else {
      this.validationInput = '';
      this.classCss = 'input-text';
    }
  }
  @Input() messageError: string = '';

  private onChange = (_: any) => {};
  private onTouched = () => {};

  writeValue(value: any): void {
    this.selectedItem = value;
    this.onChange(this.selectedItem);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event: any): void {
    this.checked = event.target.checked;
    this.onChange(this.checked);
  }
}
