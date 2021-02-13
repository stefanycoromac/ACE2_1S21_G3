import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-oxygen',
  templateUrl: './oxygen.component.html',
  styleUrls: ['./oxygen.component.css']
})
export class OxygenComponent implements OnInit {
  public data: any[];

  public dataReports: any[];
  public xAxisLabel: string;
  public yAxisLabel: string;
  public legendTitle: string;

  constructor() {
    this.data = [];

    this.reportProperties();
  }

  ngOnInit(): void {
  }

  private reportProperties(): void {
    this.xAxisLabel = "Fecha";
    this.yAxisLabel = "Promedio";
    this.legendTitle = "Ultimas 10 lecturas";
    this.dataReports = [];
  }
}
