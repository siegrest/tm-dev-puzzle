import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'coding-challenge-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @Input() data: [string | number][];

  chart = {
    title: '',
    type: 'LineChart',
    columnNames: ['period', 'close'],
    options: { title: `Stock price`, width: '600', height: '400' }
  };

  constructor() {}

  ngOnInit() {
  }
}
