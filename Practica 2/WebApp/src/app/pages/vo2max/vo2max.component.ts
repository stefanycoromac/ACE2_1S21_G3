import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vo2max',
  templateUrl: './vo2max.component.html',
  styleUrls: ['./vo2max.component.css']
})
export class Vo2maxComponent implements OnInit {
  public data: any[];

  public dataReports: any[];
  public xAxisLabel: string;
  public yAxisLabel: string;
  public legendTitle: string;

  constructor() {
    this.data = [{
      'name': 'ml',
      'series': this.initialData()
    }];

    this.reportProperties();
  }

  ngOnInit(): void { }

  private initialData(): any[] {
    const initialData: any[] = [];
    for (let index = -25; index < 0; index++) {
      initialData.push({
        'name': index,
        'value': 0
      });
    }

    return initialData;
  }

  private reportProperties(): void {
    this.xAxisLabel = 'Fecha';
    this.yAxisLabel = 'VO2MAX';
    this.legendTitle = 'Historico';
    this.dataReports = [];
  }
}
