import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-grouped-vertical-bar-chart',
  templateUrl: './grouped-vertical-bar-chart.component.html',
  styleUrls: ['./grouped-vertical-bar-chart.component.css']
})
export class GroupedVerticalBarChartComponent implements OnInit {
  @Input() data: any[];
  @Input() scheme: any;

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

  @Input() colorScheme: any;

  constructor() {
    this.data = [];
    this.graphProperties();
  }

  ngOnInit(): void { }

  private graphProperties(): void {
    this.scheme = 'nightLights';

    this.showXAxis = true;
    this.xAxisLabel = 'X';
    this.showXAxisLabel = true;

    this.showYAxis = true;
    this.yAxisLabel = 'Y';
    this.showYAxisLabel = true;

    this.showGridLines = true;
    this.roundDomains = false;

    this.legendTitle = 'Legend Title';
    this.showLegend = true;
    this.legendPosition = 'right';
  }
}
