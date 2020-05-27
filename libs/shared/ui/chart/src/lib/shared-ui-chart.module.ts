import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GoogleChartsModule } from 'angular-google-charts';
import { ChartComponent } from './chart/chart.component';
import { MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    GoogleChartsModule.forRoot(),
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [ChartComponent],
  exports: [ChartComponent]
})
export class SharedUiChartModule {}
