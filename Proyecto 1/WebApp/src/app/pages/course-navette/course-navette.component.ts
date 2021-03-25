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

@Component({
  selector: 'app-course-navette',
  templateUrl: './course-navette.component.html',
  styleUrls: ['./course-navette.component.css'],
  providers: [DatePipe]
})
export class CourseNavetteComponent implements OnInit, OnDestroy {
  public idUser: number;
  public lastTest: Test;

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

  private subscription: Subscription;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _datepipe: DatePipe,
    private _courseNavetteService: CourseNavetteService,
  ) {
    this.tableInit();

    this.lastTest = new Test();
  }

  ngOnInit(): void {
    this.getIDUser();
    this.dataInit();

    const source = interval(2500);
    this.subscription = source.subscribe(() => {
      this.getLast();
      this.getDetail();
    });
  }

  ngAfterViewInit() {
    this.dataSourceDetail.paginator = this.paginatorDetails;
    this.dataSourceHistory.paginator = this.paginatorHistory;
    this.dataSourceFails.paginator = this.paginatorFails;
    this.dataSourceRend.paginator = this.paginatorRend;
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
  }

  public getTotal(): number {
    return this.detailCourseNavette.map(t => t.distancia).reduce((acc, value) => acc + value, 0);
  }

  private async getLast(): Promise<void> {
    try {
      const data = await this._courseNavetteService.getLast(this.idUser);

      if (data['code'] === '200') {
        this.lastTest.idTest = data['data']['idTest'];
        this.lastTest.estado = data['data']['estado'];
        this.lastTest.fechaInicio = data['data']['fechaInicio'];
        this.lastTest.fechaFin = data['data']['fechaFin'];
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

    } catch (err) {
      console.log(<any>err);
    }
  }

  public cont: number = 0;
  private addDetailTest(): void {
    const rep = new Repetition();
    rep.maxVel = Math.floor(Math.random() * 100);
    rep.minVel = Math.floor(Math.random() * 100);
    rep.promedio = (rep.maxVel + rep.minVel) / 2;
    rep.distancia = Math.floor(Math.random() * 21);
    rep.idRepeticion = this.cont;

    this.detailCourseNavette.push(rep);
    this.dataSourceDetail.data = this.detailCourseNavette;

    const ts = new Test();
    ts.repeticiones = this.cont * 2;
    this.history.push(ts);
    this.dataSourceHistory.data = this.history;

    const ts2 = new Test();
    ts2.repeticiones = this.cont;
    this.fails.push(ts2);
    this.dataSourceFails.data = this.fails;

    const ts3 = new Test();
    ts3.repeticiones = this.cont * 4;
    this.rend.push(ts3);
    this.dataSourceRend.data = this.rend;

    this.cont++
  }
}
