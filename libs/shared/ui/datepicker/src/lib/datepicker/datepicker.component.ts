import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material';
import { DateRange } from './date-range';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'coding-challenge-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit, OnDestroy {
  @Output() dateChanged: EventEmitter<DateRange> = new EventEmitter();
  datePickerForm: FormGroup;
  valueChanged: Subscription;

  constructor(private fb: FormBuilder) {
    this.datePickerForm = fb.group({
      from: [null],
      to: [null]
    });
  }

  ngOnInit() {
    this.valueChanged = this.datePickerForm.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(value => this.dateChanged.emit(value));
  }

  ngOnDestroy(): void {
    this.valueChanged.unsubscribe();
  }

  fromDateRangeFilter = (d = new Date()): boolean => {
    const { to } = this.datePickerForm.value;
    return (to ? d <= to : true) && d <= new Date();
  };

  toDateRangeFilter = (d = new Date()): boolean => {
    const { from } = this.datePickerForm.value;
    return (from ? d >= from : true) && d <= new Date();
  };

  validateDate = (e: MatDatepickerInputEvent<Date>): void => {
    const from = this.datePickerForm.get('from');
    const to = this.datePickerForm.get('to');

    if (!from.valid && from.touched && to.valid && to.touched) {
      from.setValue(to.value);
    } else if (!to.valid && to.touched && from.valid && from.touched) {
      to.setValue(from.value);
    }
  };

  isInvalidField(field: string): boolean {
    return (
      !this.datePickerForm.get(field).valid &&
      this.datePickerForm.get(field).touched
    );
  }
}
