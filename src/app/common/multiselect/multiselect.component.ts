import { Component, Input, HostBinding, forwardRef, OnChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IMultiSelect } from './multiselect.model';

@Component({
  selector: 'app-multiselect-input',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelectComponent),
      multi: true
    }
  ]
})
export class MultiSelectComponent implements ControlValueAccessor, OnChanges {

  @Input() options: string[] = [];
  selections: IMultiSelect[];
  private currentSelection = '';

  @Input() disabled = false;
  @HostBinding('style.opacity')
  get opacity() {
    return this.disabled ? 0.25 : 1;
  }

  onChange = (selected: string) => { };
  onTouched = () => { };

  get value(): string {
    return JSON.stringify(this.selections.filter(sel => sel.selected).map(sel => sel.description)); // .join(';');
  }

  writeValue(selectionString: string): void {
    this.currentSelection = selectionString;
    this.updateSelections();
    this.onChange(this.value);
  }

  updateSelections() {
    console.log(this.currentSelection);
    const selArray: string[] = this.currentSelection === '' ? [] : JSON.parse(this.currentSelection); // .split(';');
    this.selections.forEach(sel => sel.selected = selArray.includes(sel.description));
  }

  registerOnChange( fn: any ): void {
    this.onChange = fn;
  }

  registerOnTouched( fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  constructor() {}

  ngOnChanges() {
    this.selections = this.options.map(opt => ({description: opt, selected: false}));
    this.updateSelections();
  }

  optionSelected(option: IMultiSelect) {
    if (!this.disabled) {
      option.selected = !option.selected;
    }
    this.onChange(this.value);
  }

}
