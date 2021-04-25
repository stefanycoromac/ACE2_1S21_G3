import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { User } from 'src/app/models/user.model';
import { VO2MAX } from 'src/app/models/vo2max.model';
import { Vo2maxService } from 'src/app/services/vo2max.service';

@Component({
  selector: 'app-vo2max',
  templateUrl: './vo2max.component.html',
  styleUrls: ['./vo2max.component.css'],
  providers: [DatePipe]
})
export class Vo2maxComponent implements OnInit, AfterViewInit, OnDestroy {
  public idUser: number;
  public vo2max: VO2MAX;

  public data: any[];

  public displayedColumns: string[];
  public dataSource: MatTableDataSource<VO2MAX>;
  public record: VO2MAX[];
  @ViewChild('paginatorRecord', { static: true }) paginatorRecord: MatPaginator;

  public dateNow: Date;
  public milliSecondsInASecond: number;
  public minutesInAnHour: number
  public SecondsInAMinute: number;

  public timeDifference: number;
  public secondsToDday: number;
  public minutesToDday: number;

  private subscription: Subscription;
  private timerSub: Subscription;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _datepipe: DatePipe,
    private _vo2maxService: Vo2maxService,
  ) {
    this.initTimer();

    this.data = [{
      'name': 'ml',
      'series': this.initialData()
    }];

    this.dataSource = new MatTableDataSource<VO2MAX>();
    this.displayedColumns = ['fecha', 'avgInh', 'avgExh', 'medicion', 'actions'];
    this.record = [];

    this.vo2max = new VO2MAX();
  }

  ngOnInit(): void {
    this.getIDUser();
    this.dataSource.data = this.record;

    const source = interval(1500);
    this.subscription = source.subscribe(() => {
      this.get();
      this.getDetail();
      this.getHistory();
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginatorRecord;
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.timerSub?.unsubscribe();
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

  private initTimer(): void {
    this.milliSecondsInASecond = 1000;
    this.minutesInAnHour = 60;
    this.SecondsInAMinute = 60;

    this.minutesToDday = 5;
    this.secondsToDday = 0;
  }

  private async get(): Promise<void> {
    if (this.vo2max.idVO2MAX === undefined) {
      this.vo2max = await this.getLast();
    } else {
      this.vo2max = await this.getSpecific();
    }

    const statusVO2 = this.vo2max.estado;
    if (statusVO2 !== undefined) {
      if (statusVO2 == true && this.vo2max.estado == false) {
        this.stopTimer();
      } else if (this.vo2max.estado == true && statusVO2 == false) {
        this.activateTimer();
      }
    } else {
      if (this.vo2max.estado == true) {
        this.activateTimer();
      }
    }
  }

  private async getDetail(): Promise<void> {
    try {
      if (this.vo2max.idVO2MAX !== undefined) {
        const data = await this._vo2maxService.getDetail(this.vo2max.idVO2MAX);

        if (data['code'] === '200') {
          this.data[0].series = this.initialData();
          this.data = [...this.data];

          data['data'].forEach(element => {
            this.addData(element.minuto, element.medicion);
          });
        }
      }
    } catch (err) {
      console.log(<any>err);
    }
  }

  private addData(minuto: number, medicion: number): void {
    this.data[0].series.shift();

    const obj = { 'name': minuto, 'value': medicion };

    this.data[0].series.push(obj);
    this.data = [...this.data];
  }

  private async getHistory(): Promise<void> {
    try {
      const data = await this._vo2maxService.get(this.idUser);

      if (data['code'] === '200') {

        this.record = [];
        let vo2max: VO2MAX;
        let dateHour;

        data['data'].forEach(element => {
          vo2max = element;
          dateHour = this._datepipe.transform(
            new Date(element.fecha),
            'd/MM/yy, h:mm:ss a'
          );
          vo2max.fecha = dateHour;

          this.record.push(vo2max);
          this.dataSource.data = this.record;
        });
      }
    } catch (err) {
      console.log(<any>err);
    }
  }

  private async getLast(): Promise<VO2MAX> {
    try {
      const data = await this._vo2maxService.getLast(this.idUser);

      if (data['code'] === '200') {
        return data['data'];
      }

      return this.vo2max;
    } catch (err) {
      console.log(<any>err);
    }
  }

  private async getSpecific(): Promise<VO2MAX> {
    try {
      const data = await this._vo2maxService
        .getSpecific(this.idUser, this.vo2max.idVO2MAX);

      if (data['code'] === '200') {
        return data['data'];
      }
    } catch (err) {
      console.log(<any>err);
    }
  }

  public updateVO2Max(idVO2MAX: number): void {
    this.vo2max.idVO2MAX = idVO2MAX
  }

  private activateTimer() {
    this.dateNow = new Date();
    this.dateNow.setMinutes(this.dateNow.getMinutes() + 5);

    this.timerSub = interval(1000).subscribe(
      () => {
        this.getTimeDifference();

        if (this.minutesToDday <= 0 && this.secondsToDday <= 0) {
          this.minutesToDday = 5;
          this.secondsToDday = 0;

          this.timerSub.unsubscribe();
        }
      }
    );
  }

  private stopTimer() {
    this.timerSub?.unsubscribe();
    this.initTimer();
  }

  private getTimeDifference() {
    this.timeDifference = this.dateNow.getTime() - new Date().getTime();
    this.allocateTimeUnits(this.timeDifference);
  }

  private allocateTimeUnits(timeDifference) {
    this.secondsToDday = Math.floor(
      (timeDifference) / (this.milliSecondsInASecond) % this.SecondsInAMinute);

    this.minutesToDday = Math.floor(
      (timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour) % this.SecondsInAMinute);
  }
}
