import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/services/user.service';
import { OxygenService } from 'src/app/services/oxygen.service';
import { TemperatureService } from 'src/app/services/temperature.service';
import { HeartRateService } from 'src/app/services/heart-rate.service';

import { User } from 'src/app/models/user.model';
import { Oxygen } from 'src/app/models/oxygen.model';
import { Temperature } from 'src/app/models/temperature.model';
import { HeartRate } from 'src/app/models/heart-rate.model';
import { Exercise } from 'src/app/models/exercise.model';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public idUser: number;
  public userType: number;

  public lastOxygen: Oxygen;
  public oxygenData: any[];

  public lastTemperature: Temperature;
  public temperatureData: any[];
  public scheme: any;

  public lastHeartRate: HeartRate;
  public heartRateData: any[];

  public lastExcercie: Exercise;
  public exerciseData: any[];

  public athletes: User[];

  constructor(
    private _userService: UserService,
    private _oxygenService: OxygenService,
    private _temperatureService: TemperatureService,
    private _hearRateService: HeartRateService,
    private _exerciseService: ExerciseService,
  ) {
    this.initialData();
  }

  ngOnInit(): void {
    this.getIDUser();

    this.getLastOxygen();
    this.getLastTemperature();
    this.getLastHeartRate();
    this.getLastExercise();

    if (this.userType)
      this.getCoaching();
  }

  private initialData(): void {
    this.lastOxygen = new Oxygen();
    this.oxygenData = [
      {
        'name': '%',
        'value': this.lastOxygen.medicion
      }
    ];

    this.lastTemperature = new Temperature();
    this.temperatureData = [
      {
        'name': 'Minima °C',
        'value': this.lastTemperature.minima
      },
      {
        'name': 'Promedio °C',
        'value': this.lastTemperature.promedio
      },
      {
        'name': 'Maxima °C',
        'value': this.lastTemperature.maxima
      }
    ];
    this.scheme = {
      domain: ['#3f51b5', '#00b862', '#a8385d']
    }

    this.lastHeartRate = new HeartRate();
    this.heartRateData = [
      {
        'name': 'BPM',
        'value': this.lastHeartRate.medicion
      }
    ];

    this.lastExcercie = new Exercise();
    this.exerciseData = [
      {
        'name': '%',
        'value': 0
      }
    ];
  }

  private getIDUser(): void {
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.idUser = user.idUsuario;
    this.userType = user.tipo;
  }

  private async getLastOxygen(): Promise<void> {
    try {
      const data = await this._oxygenService.getLast(this.idUser);

      if (data['code'] === '200') {
        this.lastOxygen.fechaHora = data['data']['fechaHora'];
        this.lastOxygen.medicion = data['data']['medicion'];

        this.oxygenData = [
          {
            'name': '%',
            'value': this.lastOxygen.medicion
          }
        ];
        this.oxygenData = [...this.oxygenData];
      }
    } catch (err) {
      console.log(<any>err);
    }
  }

  private async getLastTemperature(): Promise<void> {
    try {
      const data = await this._temperatureService.getLast(this.idUser);

      if (data['code'] === '200') {
        this.lastTemperature.fechaHora = data['data']['fechaHora'];
        this.lastTemperature.promedio = data['data']['promedio'];
        this.lastTemperature.minima = data['data']['minima'];
        this.lastTemperature.maxima = data['data']['maxima'];

        this.temperatureData = [
          {
            'name': 'Minima °C',
            'value': this.lastTemperature.minima
          },
          {
            'name': 'Promedio °C',
            'value': this.lastTemperature.promedio
          },
          {
            'name': 'Maxima °C',
            'value': this.lastTemperature.maxima
          }
        ];
        this.temperatureData = [...this.temperatureData];
      }
    } catch (err) {
      console.log(<any>err);
    }
  }

  private async getLastHeartRate(): Promise<void> {
    try {
      const data = await this._hearRateService.getLast(this.idUser);

      if (data['code'] === '200') {
        this.lastHeartRate.fechaHora = data['data']['fechaHora'];
        this.lastHeartRate.medicion = data['data']['medicion'];

        this.heartRateData = [
          {
            'name': 'BPM',
            'value': this.lastHeartRate.medicion
          }
        ];
        this.heartRateData = [...this.heartRateData];
      }
    } catch (err) {
      console.log(<any>err);
    }
  }

  private async getLastExercise(): Promise<void> {
    try {
      const data = await this._exerciseService.getLast(this.idUser);

      if (data['code'] === '200') {
        this.lastExcercie = data['data'];

        if (this.lastExcercie.noPasos != 0) {
          this.exerciseData = [
            {
              'name': '%',
              'value': this.lastExcercie.noPasos * 100 / this.lastExcercie.metaPasos
            }
          ];
        } else {
          this.exerciseData = [
            {
              'name': '%',
              'value': 0
            }
          ];
        }
      }
    } catch (err) {
      console.log(<any>err);
    }
  }

  private async getCoaching() {
    try {
      const data = await this._userService.getCoaching(this.idUser);

      if (data['code'] === '200')
        this.athletes = data['data'];

    } catch (err) {
      console.log(<any>err);
    }
  }
}
