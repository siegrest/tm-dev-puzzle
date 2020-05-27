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

  dateRangeFilter = (d: Date): boolean => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return d <= now;
  };

  validateDate = (e: MatDatepickerInputEvent<Date>): void => {
    const from = this.datePickerForm.get('from');
    const to = this.datePickerForm.get('to');

    if (from.value && to.value && to.value < from.value) {
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
