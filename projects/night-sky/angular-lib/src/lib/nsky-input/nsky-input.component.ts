import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'nsky-input',
  templateUrl: './nsky-input.component.html',
  styleUrls: ['./nsky-input.component.css'],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NskyInputComponent),
      multi: true,
    },
  ],
})
export class NskyInputComponent implements ControlValueAccessor {
  validationInput: string = '';
  classCss: string = 'input-text';
  selectedItem: any = '';

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

  onInput(value: any): void {
    this.selectedItem = value.target.value;
    this.onChange(this.selectedItem);
  }
}
