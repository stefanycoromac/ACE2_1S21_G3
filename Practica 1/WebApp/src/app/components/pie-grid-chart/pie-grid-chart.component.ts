import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pie-grid-chart',
  templateUrl: './pie-grid-chart.component.html',
  styleUrls: ['./pie-grid-chart.component.css']
})
export class PieGridChartComponent implements OnInit {
  @Input() data: any[];

  constructor() {
    this.data = [];
  }

  ngOnInit(): void { }

}
