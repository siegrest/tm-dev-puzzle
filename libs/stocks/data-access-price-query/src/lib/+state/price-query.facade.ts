import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { FetchPriceQuery } from './price-query.actions';
import { PriceQueryPartialState } from './price-query.reducer';
import {
  getSelectedSymbol,
  getAllPriceQueries,
  getInProgress
} from './price-query.selectors';
import { map, skip } from 'rxjs/operators';

@Injectable()
export class PriceQueryFacade {
  selectedSymbol$ = this.store.pipe(select(getSelectedSymbol));
  priceQueries$ = this.store.pipe(
    select(getAllPriceQueries),
    skip(1),
    map(priceQueries =>
      priceQueries.map(priceQuery => [priceQuery.date, priceQuery.close])
    )
  );
  requestInProgress$ = this.store.pipe(
    select(getInProgress)
  );

  constructor(private store: Store<PriceQueryPartialState>) {}

  fetchQuote(symbol: string, from: Date, to: Date) {
    this.store.dispatch(new FetchPriceQuery(symbol, from, to));
  }
}
