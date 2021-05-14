import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { User } from 'src/app/models/user.model';
import { ExerciseService } from 'src/app/services/exercise.service';

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
  public lastSession: {};

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

    this.lastSession = {};
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
      fillPercentage: 50,
      options: this.chartoptions
    });

    this.caloriesChart.init({
      targetContainer: document.getElementById("fluid-meter-calories"),
      fillPercentage: 50,
      options: this.chartoptions
    });

    // for (let index = 0; index < 100; index++) {
    //   this.stepChart.setPercentage(index / 5);
    // }
  }

  private reportProperties(): void {
    this.xAxisLabel = 'Estado';
    this.yAxisLabel = 'Temperatura';
    this.legendReportTitle = 'Ultimas 10 lecturas';
    this.dataReports = [];

    this.scheme = {
      domain: ['#3f51b5', '#00b862', '#a8385d']
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
        this.stepChart.setPercentage(this.lastSession['noPasos']);
        this.caloriesChart.setPercentage(this.lastSession['caloriasQuemadas']);
      }
    } catch (err) {
      console.log(<any>err);
    }
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
            new Date(element.fechaHora),
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
    const size = (window.innerHeight * 0.59).toFixed()
    return Number(size);
  }
}
