import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { User } from 'src/app/models/user.model';
import { Test } from 'src/app/models/test.model';
import { Repetition } from 'src/app/models/repetition.model';
import { CourseNavetteService } from 'src/app/services/course-navette.service';
import { TsWeek } from 'src/app/models/ts-week.model';

@Component({
  selector: 'app-course-navette',
  templateUrl: './course-navette.component.html',
  styleUrls: ['./course-navette.component.css'],
  providers: [DatePipe]
})
export class CourseNavetteComponent implements OnInit, OnDestroy {
  public idUser: number;
  public lastTest: Test;
  public speedData: any[];
  public distanceData: any[];

  public displayedColumnsDetails: string[];
  public dataSourceDetail: any;
  public detailCourseNavette: Repetition[];
  @ViewChild('paginatorDetails', { static: true }) paginatorDetails: MatPaginator;

  public displayedColumnsHistory: string[];
  public dataSourceHistory: any;
  public history: Test[];
  @ViewChild('paginatorHistory', { static: true }) paginatorHistory: MatPaginator;

  public displayedColumnsFails: string[];
  public dataSourceFails: any;
  public fails: Test[];
  @ViewChild('paginatorFails', { static: true }) paginatorFails: MatPaginator;

  public displayedColumnsRend: string[];
  public dataSourceRend: any;
  public rend: Test[];
  @ViewChild('paginatorRend', { static: true }) paginatorRend: MatPaginator;

  public displayedColumnsTW: string[];
  public dataSourceTW: any;
  public tsWeek: TsWeek[];
  @ViewChild('paginatorTsWeek', { static: true }) paginatorTsWeek: MatPaginator;

  private subscription: Subscription;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _datepipe: DatePipe,
    private _courseNavetteService: CourseNavetteService,
  ) {
    this.tableInit();

    this.lastTest = new Test();
    this.initialMeditions();
  }

  ngOnInit(): void {
    this.getIDUser();
    this.dataInit();

    const source = interval(1000);
    this.subscription = source.subscribe(() => {
      this.getLast();
      this.getDetail();
      this.getHistory();
      this.getFails();
      this.getRends();
      this.getPerWeek();
    });
  }

  ngAfterViewInit() {
    this.dataSourceDetail.paginator = this.paginatorDetails;
    this.dataSourceHistory.paginator = this.paginatorHistory;
    this.dataSourceFails.paginator = this.paginatorFails;
    this.dataSourceRend.paginator = this.paginatorRend;
    this.dataSourceTW.paginator = this.paginatorTsWeek;
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  private tableInit(): void {
    this.dataSourceDetail = new MatTableDataSource<Repetition>();
    this.displayedColumnsDetails = ['numero', 'minVel', 'maxVel',
      'promedio', 'distancia'];
    this.detailCourseNavette = [];

    this.dataSourceHistory = new MatTableDataSource<Test>();
    this.displayedColumnsHistory = ['fecha', 'estado', 'repeticiones'];
    this.history = [];

    this.dataSourceFails = new MatTableDataSource<Test>();
    this.displayedColumnsFails = ['fecha', 'repeticiones'];
    this.fails = [];

    this.dataSourceRend = new MatTableDataSource<Test>();
    this.displayedColumnsRend = ['fecha', 'repeticiones'];
    this.rend = [];

    this.dataSourceTW = new MatTableDataSource<TsWeek>();
    this.displayedColumnsTW = ['inicio', 'dateWeek', 'repMax', 'repMin', 'promedio'];
    this.tsWeek = [];
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

  private dataInit(): void {
    this.dataSourceDetail.data = this.detailCourseNavette;
    this.dataSourceHistory.data = this.history;
    this.dataSourceFails.data = this.fails;
    this.dataSourceRend.data = this.rend;
    this.dataSourceTW.data = this.tsWeek;
  }

  private initialMeditions(): void {
    this.speedData = [
      {
        'name': 'Velocidad',
        'value': this.lastTest.velocidad
      }
    ];

    this.distanceData = [
      {
        'name': 'Distancia',
        'value': this.lastTest.distancia
      }
    ];
  }

  public getTotal(): number {
    return this.detailCourseNavette.map(t => t.distancia).reduce((acc, value) => acc + value, 0);
  }

  private async getLast(): Promise<void> {
    try {
      const data = await this._courseNavetteService.getLast(this.idUser);
      if (data['code'] === '200') {
        this.lastTest.idTest = data['data']['idTest'];
        this.lastTest.fechaInicio = data['data']['fechaInicio'];
      }

      const distance = await this._courseNavetteService.getLastDistance(this.idUser);
      if (distance['code'] === '200') {
        if (this.lastTest.distancia != distance['data']['medicion']) {
          this.lastTest.distancia = distance['data']['medicion'];

          this.distanceData = [];
          this.distanceData = [...this.distanceData];

          this.distanceData = [
            {
              'name': 'Distancia',
              'value': this.lastTest.distancia
            }
          ];
          this.distanceData = [...this.distanceData];
        }
      }

      const speed = await this._courseNavetteService.getLastSpeed(this.idUser);
      if (speed['code'] === '200') {
        if (this.lastTest.velocidad != speed['data']['medicion']) {
          this.lastTest.velocidad = speed['data']['medicion'];

          this.speedData = [];
          this.speedData = [...this.speedData];

          this.speedData = [
            {
              'name': 'Velocidad',
              'value': this.lastTest.velocidad
            }
          ];
          this.speedData = [...this.speedData];
        }
      }
    } catch (err) {
      console.log(<any>err);
    }
  }

  private async getDetail(): Promise<void> {
    try {
      const data = await this._courseNavetteService.getDetail(this.idUser);

      if (data['code'] === '200') {

        this.detailCourseNavette = [];
        let repetition: Repetition;

        data['data'].forEach(element => {
          repetition = element;
          this.detailCourseNavette.push(repetition);
          this.dataSourceDetail.data = this.detailCourseNavette;
        });
      }
    } catch (err) {
      console.log(<any>err);
    }
  }

  private async getHistory(): Promise<void> {
    try {
      const data = await this._courseNavetteService.getAll(this.idUser);

      if (data['code'] === '200') {

        this.history = [];
        let test: Test;
        let dateHour;

        data['data'].forEach(element => {
          test = element;
          dateHour = this._datepipe.transform(
            new Date(element.fechaInicio),
            'd/MM/yy, h:mm:ss a'
          );
          test.fechaInicio = dateHour;

          this.history.push(test);
          this.dataSourceHistory.data = this.history;
        });
      }
    } catch (err) {
      console.log(<any>err);
    }
  }

  private async getFails(): Promise<void> {
    try {
      const data = await this._courseNavetteService.getByStatus(this.idUser, 'FALLADO');

      if (data['code'] === '200') {

        this.fails = [];
        let test: Test;
        let dateHour;

        data['data'].forEach(element => {
          test = element;
          dateHour = this._datepipe.transform(
            new Date(element.fechaInicio),
            'd/MM/yy, h:mm:ss a'
          );
          test.fechaInicio = dateHour;

          this.fails.push(test);
          this.dataSourceFails.data = this.fails;
        });
      }
    } catch (err) {
      console.log(<any>err);
    }
  }

  private async getRends(): Promise<void> {
    try {
      const data = await this._courseNavetteService.getByStatus(this.idUser, 'RENDIDO');

      if (data['code'] === '200') {

        this.rend = [];
        let test: Test;
        let dateHour;

        data['data'].forEach(element => {
          test = element;
          dateHour = this._datepipe.transform(
            new Date(element.fechaInicio),
            'd/MM/yy, h:mm:ss a'
          );
          test.fechaInicio = dateHour;

          this.rend.push(test);
          this.dataSourceRend.data = this.rend;
        });
      }
    } catch (err) {
      console.log(<any>err);
    }
  }

  private async getPerWeek(): Promise<void> {
    try {
      const data = await this._courseNavetteService.getPerWeek(this.idUser);

      if (data['code'] === '200') {
        this.tsWeek = data['data'];
        this.dataSourceTW.data = this.tsWeek;
      }
    } catch (err) {
      console.log(<any>err);
    }
  }
}
