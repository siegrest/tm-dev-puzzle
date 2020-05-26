import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { DateRange } from '../datepicker/date-range';

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit, OnDestroy {
  stockPickerForm: FormGroup;
  quotes$ = this.priceQuery.priceQueries$;
  inProgress$ = this.priceQuery.requestInProgress$;
  formChanged: Subscription;
  range: DateRange = { from: null, to: null };

  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {
    this.stockPickerForm = fb.group({
      symbol: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.formChanged = this.stockPickerForm.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(() => this.fetchQuote());
  }

  ngOnDestroy(): void {
    this.formChanged.unsubscribe();
  }

  fetchQuote() {
    if (this.stockPickerForm.valid) {
      const { symbol } = this.stockPickerForm.value;
      this.priceQuery.fetchQuote(symbol, this.range.from, this.range.to);
    }
  }

  dateRangeChanged(range: DateRange) {
    this.range = range;
    this.fetchQuote();
  }

  isInvalidField(field: string): boolean {
    return (
      !this.stockPickerForm.get(field).valid &&
      this.stockPickerForm.get(field).touched
    );
  }
}
