import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS,
  MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { SharedUiChartModule } from '@coding-challenge/shared/ui/chart';
import { StocksComponent } from './stocks/stocks.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedUiDatepickertModule } from '@coding-challenge/shared/ui/datepicker';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: StocksComponent }
    ]),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    SharedUiChartModule,
    SharedUiDatepickertModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  declarations: [StocksComponent],
  providers: [
    {
      provide: MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS,
      useValue: {
        _forceAnimations: true
      }
    }
  ]
})
export class StocksFeatureShellModule {}
