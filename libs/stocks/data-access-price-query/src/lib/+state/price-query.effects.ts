import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import {
  StocksAppConfig,
  StocksAppConfigToken
} from '@coding-challenge/stocks/data-access-app-config';
import { Effect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { map } from 'rxjs/operators';
import {
  FetchPriceQuery,
  PriceQueryActionTypes,
  PriceQueryFetched,
  PriceQueryFetchError
} from './price-query.actions';
import {
  PriceQueryPartialState
} from './price-query.reducer';
import { PriceQueryResponse } from './price-query.type';
import { MatSnackBar } from '@angular/material';
import { filterResults } from '../util/filter-util';
import { getSmallestRange } from '../util/date-util';

export class PriceQueryEffects {
  @Effect() loadPriceQuery$ = this.dataPersistence.fetch(
    PriceQueryActionTypes.FetchPriceQuery,
    {
      run: (action: FetchPriceQuery, state: PriceQueryPartialState) => {
        const range = getSmallestRange(action.from);
        return this.httpClient
          .get(
            `${this.env.apiURL}/beta/stock/${
              action.symbol
            }/chart/${range}?token=${this.env.apiKey}`
          )
          .pipe(
            map((resp: PriceQueryResponse[]) => {
              return new PriceQueryFetched(
                filterResults(resp, action.from, action.to)
              );
            })
          );
      },

      onError: (action: FetchPriceQuery, error) => {
        this.snackBar.open('Unable to load data', 'Ok', {
          duration: 7000
        });

        return new PriceQueryFetchError(error);
      }
    }
  );

  constructor(
    @Inject(StocksAppConfigToken) private env: StocksAppConfig,
    private httpClient: HttpClient,
    private dataPersistence: DataPersistence<PriceQueryPartialState>,
    private snackBar: MatSnackBar
  ) {}
}
