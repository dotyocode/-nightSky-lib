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
import { NskyCheckComponent } from '../nsky-check/nsky-check.component';

@Component({
  selector: 'nsky-mult-select',
  templateUrl: './nsky-mult-select.component.html',
  styleUrls: ['./nsky-mult-select.component.css'],
  standalone: true,
  imports: [FormsModule, NskyCheckComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NskyMultSelectComponent),
      multi: true,
    },
  ],
})
export class NskyMultSelectComponent {
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
  private selectedItems: any[] = [];
  selectAllChecked: boolean = false;
  //OUTPUTS
  @Output() change: EventEmitter<any> = new EventEmitter<any>();

  //Inputs
  @Input() text: string = '';
  @Input() selectAllText: string = '';
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

  updateAllCheckboxes(): void {
    const allSelected = this.areAllItemsSelected();
    this.selectAllChecked = allSelected;

    this.data.forEach((item) => {
      const index = this.selectedItems.findIndex(
        (selectedItem) => selectedItem.id === item.id
      );

      if (index === -1 && allSelected) {
        this.selectedItems.push(item);
      } else if (index !== -1 && !allSelected) {
        this.selectedItems.splice(index, 1);
      }
    });
  }

  areAllItemsSelected(): boolean {
    return this.selectedItems.length === this.data.length;
  }

  toggleSelectAll(event: any): void {
    const selectAll = event.target.checked;

    this.selectedItems = selectAll ? [...this.data] : [];
    this.selectAllChecked = selectAll;

    this.updateAllCheckboxes();

    this.selectedItem = this.selectedItems
      .map((item) => item[this.dataOption])
      .join(', ');

    this.onChange(this.selectedItems);
  }

  toggleSelection(item: any): void {
    const index = this.selectedItems.findIndex(
      (selectedItem) => selectedItem.id === item.id
    );

    if (index === -1) {
      this.selectedItems.push(item);
    } else {
      this.selectedItems.splice(index, 1);
    }

    this.selectedItem = this.selectedItems
      .map((selectedItem) => selectedItem[this.dataOption])
      .join(', ');
    this.onChange(this.selectedItems);

    if (item.id !== 'selectAll') {
      this.selectAllChecked = this.areAllItemsSelected();
    }
  }

  isSelected(item: any): boolean {
    return this.selectedItems.some(
      (selectedItem) => selectedItem.id === item.id
    );
  }

  private onChange = (_: any) => {};
  private onTouched = () => {};

  writeValue(value: any): void {
    this.selectedItems = value || [];
    this.selectedItem = this.selectedItems
      .map((item) => item[this.dataOption])
      .join(', ');
    this.onChange(this.selectedItems);
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
    this.showDropdown = true;
  }

  selectItem(item: any) {
    this.selectedItem = item;
    this.onChange(this.selectedItem);
    this.change.emit(item);
    this.showDropdown = false;
  }
}
