import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  EventEmitter,
  Output,
  forwardRef,
  HostListener,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

@Component({
  selector: 'nsky-select',
  templateUrl: './nsky-select.component.html',
  styleUrls: ['./nsky-select.component.css'],
  standalone: true,
  imports: [FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NskySelectComponent),
      multi: true,
    },
  ],
})
export class NskySelectComponent {
  // childs
  @ViewChild('selectRef', { static: true }) selectRef!: ElementRef<any>;

  //List itens
  @Input() data: any[] = [];
  @Input() dataOption: any = {};

  // variaveis
  validationInput: string = '';
  classCss: string = 'input-text';
  classCssDropDown: string = 'dropdown-list';
  showDropdown: boolean = false;
  selectedItem: any = '';

  //OUTPUTS
  @Output() change: EventEmitter<any> = new EventEmitter<any>();

  //Inputs
  @Input() text: string = '';
  @Input() initialTitle: string = '';
  @Input() disabled: boolean = false;
  @Input() id: string = '';
  @Input() name: string = '';
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
  @Input('dropDownPosition')
  set dropDownPosition(value: string) {
    if (value === 'up') {
      this.classCssDropDown = 'dropdown-list-up';
    } else if (value === 'down') {
      this.classCssDropDown = 'dropdown-list';
    } else {
      this.classCssDropDown = 'dropdown-list';
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: any): void {
    const clickedInside = this.selectRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.showDropdown = false;
    }
  }

  private onChange = (_: any) => {};
  private onTouched = () => {};

  // ControlValueAccessor methods
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

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  selectItem(item: any) {
    this.selectedItem = item;
    this.onChange(this.selectedItem);
    this.change.emit(item);
    this.showDropdown = false;
  }
}
