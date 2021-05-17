import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { User } from 'src/app/models/user.model';
import { Temperature } from 'src/app/models/temperature.model';
import { TemperatureService } from 'src/app/services/temperature.service';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.css'],
  providers: [DatePipe]
})
export class TemperatureComponent implements OnInit, OnDestroy {
  public idUser: number;
  public lastTP: Temperature;

  private subscription: Subscription;

  public data: any[];
  public xAxisLabel: string;
  public yAxisLabel: string;
  public legendTitle: string;
  public scheme: any;

  public dataReports: any[];
  public legendReportTitle: string;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _datepipe: DatePipe,
    private _temperatureService: TemperatureService,
  ) {
    this.propertiesChart();
    this.propertiesReportChart();

    this.lastTP = new Temperature();
  }

  ngOnInit(): void {
    this.getIDUser();

    const source = interval(2000);
    this.subscription = source.subscribe(() => {
      this.getLast();
      this.getTop();
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  private propertiesChart(): void {
    this.xAxisLabel = 'Estado';
    this.yAxisLabel = 'Temperatura';
    this.legendTitle = 'Datos';

    this.data = [];

    this.scheme = {
      domain: ['#3f51b5', '#00b862', '#a8385d']
    }
  }

  private propertiesReportChart(): void {
    this.legendReportTitle = 'Ultimas 10 lecturas';
    this.dataReports = [];
  }

  private getIDUser(): void {
    this._activatedRoute.params.subscribe(
      params => { this.idUser = params['idUser']; }
    );

    if (!this.idUser) {
      const user: User = JSON.parse(localStorage.getItem('user'));
      this.idUser = user.idUsuario;
    }
  }

  private async getLast(): Promise<void> {
    try {
      const data = await this._temperatureService.getLast(this.idUser);

      if (data['code'] === '200') {
        this.lastTP = data['data'];
        this.addData();
      }
    } catch (err) {
      console.log(<any>err);
    }
  }

  private async getTop(): Promise<void> {
    try {
      const data = await this._temperatureService.getTop(this.idUser);

      if (data['code'] === '200') {
        let dateHour: string;
        let series: any[];

        this.dataReports = [];
        this.dataReports = [...this.dataReports];

        data['data'].forEach(element => {
          dateHour = this._datepipe.transform(
            new Date(element.fechaHora),
            'd/MM/yy, h:mm:ss a'
          );

          series = [
            { 'name': 'Minima', 'value': element.minima },
            { 'name': 'Promedio', 'value': element.promedio },
            { 'name': 'Maxima', 'value': element.maxima }
          ];

          this.addReportData(dateHour, series);
        });
      }
    } catch (err) {
      console.log(<any>err);
    }
  }

  private addData() {
    this.data = [
      {
        'name': 'Minima',
        'value': this.lastTP.minima
      },
      {
        'name': 'Promedio',
        'value': this.lastTP.promedio
      },
      {
        'name': 'Maxima',
        'value': this.lastTP.maxima
      }
    ];
    this.data = [...this.data];
  }

  private addReportData(name: string, series: any[]) {
    const obj = { name, series };

    this.dataReports.push(obj);
    this.dataReports = [...this.dataReports];
  }
}
