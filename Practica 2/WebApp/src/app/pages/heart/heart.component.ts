import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { User } from 'src/app/models/user.model';
import { HeartRate } from 'src/app/models/heart-rate.model';
import { HeartRateService } from 'src/app/services/heart-rate.service';

@Component({
  selector: 'app-heart',
  templateUrl: './heart.component.html',
  styleUrls: ['./heart.component.css'],
  providers: [DatePipe]
})
export class HeartComponent implements OnInit, OnDestroy {
  public idUser: number;
  public lastHR: HeartRate;

  private subscription: Subscription;

  public counter: number;
  public data: any[];

  public dataReports: any[];
  public xAxisLabel: string;
  public yAxisLabel: string;
  public legendTitle: string;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _datepipe: DatePipe,
    private _hearRateService: HeartRateService,
  ) {
    this.counter = 0;
    this.data = [{
      'name': 'BPM',
      'series': this.initialData()
    }];

    this.reportProperties();

    this.lastHR = new HeartRate();
  }

  ngOnInit(): void {
    this.getIDUser();

    const source = interval(2500);
    this.subscription = source.subscribe(() => {
      this.getLast();
      this.getTop();
      this.getDetail();
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

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

  private getIDUser(): void {
    this._activatedRoute.params.subscribe(
      params => { this.idUser = params['idUser']; }
    );

    if (!this.idUser) {
      const user: User = JSON.parse(localStorage.getItem('user'));
      this.idUser = user.idUsuario;
    }
  }

  private reportProperties(): void {
    this.xAxisLabel = 'Fecha';
    this.yAxisLabel = 'Promedio BPM';
    this.legendTitle = 'Ultimas 10 lecturas';
    this.dataReports = [];
  }

  private async getLast(): Promise<void> {
    try {
      const data = await this._hearRateService.getLast(this.idUser);

      if (data['code'] === '200') {
        this.lastHR.fechaHora = data['data']['fechaHora'];
        this.lastHR.medicion = data['data']['medicion'];
      }
    } catch (err) {
      console.log(<any>err);
    }
  }

  private async getDetail(): Promise<void> {
    try {
      const data = await this._hearRateService.getDetail(this.idUser);

      if (data['code'] === '200') {
        this.data[0].series = this.initialData();
        this.data = [...this.data];

        this.counter = 0;
        data['data'].forEach(element => {
          this.addData(element.medicion);
        });
      }
    } catch (err) {
      console.log(<any>err);
    }
  }

  private addData(value: number): void {
    this.data[0].series.shift();

    const obj = { 'name': this.counter++, value };

    this.data[0].series.push(obj);
    this.data = [...this.data];
  }

  private async getTop(): Promise<void> {
    try {
      const data = await this._hearRateService.getTop(this.idUser);

      if (data['code'] === '200') {
        this.dataReports = [];
        this.dataReports = [...this.dataReports];

        let dateHour;
        data['data'].forEach(element => {
          dateHour = this._datepipe.transform(
            new Date(element.fechaHora),
            'd/MM/yy, h:mm:ss a'
          );

          this.addReportData(dateHour, element.medicion);
        });
      }
    } catch (err) {
      console.log(<any>err);
    }
  }

  private addReportData(name: string, value: number) {
    const obj = { name, value };

    this.dataReports.push(obj);
    this.dataReports = [...this.dataReports];
  }
}
