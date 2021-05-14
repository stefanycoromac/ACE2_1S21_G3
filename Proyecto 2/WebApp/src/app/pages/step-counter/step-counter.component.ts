import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { User } from 'src/app/models/user.model';
import { ExerciseService } from 'src/app/services/exercise.service';
import { Exercise } from 'src/app/models/exercise.model';

declare function FluidMeter(): void;

@Component({
  selector: 'app-step-counter',
  templateUrl: './step-counter.component.html',
  styles: [],
  providers: [DatePipe]
})
export class StepCounterComponent implements OnInit {
  public chartoptions: {};
  public stepChart: any;
  public caloriesChart: any;

  public idUser: number;
  public lastSession: Exercise;
  public sessionTime: string;

  public dataReports: any[];
  public xAxisLabel: string;
  public yAxisLabel: string;
  public legendReportTitle: string;
  public scheme: any;

  private subscription: Subscription;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _datepipe: DatePipe,
    private _exerciseService: ExerciseService
  ) {
    this.chartoptions = {};
    this.stepChart = new FluidMeter();
    this.caloriesChart = new FluidMeter();

    this.lastSession = new Exercise();
    this.sessionTime = '0 Dias 0 Horas 0 Minutos';
  }

  ngOnInit(): void {
    this.getIDUser();

    this.initChart();
    this.reportProperties();

    const source = interval(2500);
    this.subscription = source.subscribe(() => {
      this.getLast();
      this.getTop();
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  private initChart(): void {
    this.chartoptions = {
      drawPercentageSign: true,
      drawBubbles: true,
      size: this.size(),
      borderWidth: 20,
      backgroundColor: "#0e1726",
      foregroundColor: "#272159",
      foregroundFluidLayer: {
        fillStyle: "#4e31a5",
        angularSpeed: 100,
        maxAmplitude: 12,
        frequency: 30,
        horizontalSpeed: -150
      },
      backgroundFluidLayer: {
        fillStyle: "#272159",
        angularSpeed: 100,
        maxAmplitude: 9,
        frequency: 30,
        horizontalSpeed: 150
      }
    };

    this.stepChart.init({
      targetContainer: document.getElementById("fluid-meter-steps"),
      fillPercentage: 0,
      options: this.chartoptions
    });

    this.caloriesChart.init({
      targetContainer: document.getElementById("fluid-meter-calories"),
      fillPercentage: 0,
      options: this.chartoptions
    });
  }

  private reportProperties(): void {
    this.xAxisLabel = 'Fecha';
    this.yAxisLabel = 'Medición';
    this.legendReportTitle = 'Ultimas 10 lecturas';
    this.dataReports = [];

    this.scheme = {
      domain: ['#3f51b5', '#00b862', '#ffd54f', '#a8385d']
    }
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
      const data = await this._exerciseService.getLast(this.idUser);

      if (data['code'] === '200') {
        this.lastSession = data['data'];
        this.stepChart.setPercentage(
          this.lastSession.noPasos * 100 / this.lastSession.metaPasos
        );

        this.caloriesChart.setPercentage(
          this.lastSession.caloriasQuemadas * 100 / this.lastSession.metaCalorias
        );

        this.lastSession.fechaInicio = new Date(this.lastSession.fechaInicio);
        this.lastSession.fechaFin = new Date(this.lastSession.fechaFin);

        this.getTime(this.lastSession.fechaFin, this.lastSession.fechaInicio);
      }
    } catch (err) {
      console.log(<any>err);
    }
  }

  private getTime(finalDate: Date, initDate: Date): void {
    let seconds = (finalDate.getTime() - initDate.getTime()) / 1000;
    let days = 0 ;
    let hours = Math.floor(seconds / 3600);
    if (hours >= 24){
        days = Math.floor(hours / 24);
        hours = hours % 24;
    }
    let minutes = Math.floor((seconds/60) % 60);
    let seconds2 =  Math.floor(seconds % 60);
    this.sessionTime = `${days} Dias ${hours} Horas ${minutes} Minutos`;
  }

  private async getTop(): Promise<void> {
    try {
      const data = await this._exerciseService.getTop(this.idUser);

      if (data['code'] === '200') {
        let dateHour: string;
        let series: any[];

        this.dataReports = [];
        this.dataReports = [...this.dataReports];

        data['data'].forEach(element => {
          dateHour = this._datepipe.transform(
            new Date(element.fechaInicio),
            'd/MM/yy, h:mm:ss a'
          );

          series = [
            { 'name': 'Pasos', 'value': element.noPasos },
            { 'name': 'Meta de Pasos', 'value': element.metaPasos },
            { 'name': 'Calorias Quemadas', 'value': element.caloriasQuemadas },
            { 'name': 'Meta de Calorias', 'value': element.metaCalorias },
          ];

          this.addReportData(dateHour, series);
        });
      }
    } catch (err) {
      console.log(<any>err);
    }
  }

  private addReportData(name: string, series: any[]) {
    const obj = { name, series };

    this.dataReports.push(obj);
    this.dataReports = [...this.dataReports];
  }

  @HostListener('window:resize', ['$event'])
  public size(_event?: any): Number {
    const size = (window.innerHeight * 0.6).toFixed()
    return Number(size);
  }
}
