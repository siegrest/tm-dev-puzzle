import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'coding-challenge-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnDestroy {
  @Input() data$: Observable<[string | number][]>;
  private chartDataChange: Subscription;

  chart = {
    title: 'Stocks chart',
    type: 'LineChart',
    data: [],
    columnNames: ['period', 'close'],
    options: { title: `Stock price`, width: '600', height: '400' }
  };

  constructor() {}

  ngOnInit() {
    this.chartDataChange = this.data$
      ? this.data$.subscribe(newData => (this.chart.data = newData))
      : null;
  }

  ngOnDestroy() {
    if (this.chartDataChange) {
      this.chartDataChange.unsubscribe();
    }
  }
}
