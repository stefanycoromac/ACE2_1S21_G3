import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.css']
})
export class TemperatureComponent implements OnInit {
  public data: any[];
  public xAxisLabel: string;
  public yAxisLabel: string;
  public legendTitle: string;
  public scheme: any;

  public dataReports: any[];
  public legendReportTitle: string;

  constructor() {
    this.propertiesChart();
    this.propertiesReportChart();
  }

  ngOnInit(): void { }

  private propertiesChart(): void {
    this.xAxisLabel = "Estado";
    this.yAxisLabel = "Temperatura";
    this.legendTitle = "Datos";

    this.data = [
      {
        "name": "Minima",
        "value": 0
      },
      {
        "name": "Promedio",
        "value": 0
      },
      {
        "name": "Maxima",
        "value": 0
      }
    ];

    this.scheme = {
      domain: ['#0264c5', '#01a99c', '#df2e36']
    }
  }

  private propertiesReportChart(): void {
    this.legendReportTitle = "Ultimas 10 lecturas";

    this.dataReports = [
      {
        "name": "Fecha1",
        "series": [
          {
            "name": "Minima",
            "value": 0
          },
          {
            "name": "Promedio",
            "value": 0
          },
          {
            "name": "Maxima",
            "value": 0
          }
        ]
      }
    ];
  }
}
