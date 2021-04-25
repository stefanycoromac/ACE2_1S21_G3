import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  @Input() data: any[];

  public showXAxis: boolean;
  @Input() xAxisLabel: string;
  public showXAxisLabel: boolean;

  public showYAxis: boolean;
  @Input() yAxisLabel: string;
  public showYAxisLabel: boolean;

  @Input() legendTitle: string;
  public showLegend: boolean;
  public legendPosition: string;

  public showGridLines: boolean;
  public roundDomains: boolean;
  public autoScale: boolean;

  constructor() {
    this.data = [];
    this.graphProperties();
  }

  ngOnInit(): void { }

  private graphProperties(): void {
    this.showXAxis = true;
    this.xAxisLabel = 'X';
    this.showXAxisLabel = false;

    this.showYAxis = true;
    this.yAxisLabel = 'Y';
    this.showYAxisLabel = false;

    this.showGridLines = true;
    this.roundDomains = false;
    this.autoScale = false;

    this.legendTitle = 'Legend Title';
    this.showLegend = false;
    this.legendPosition = 'below';
  }
}
