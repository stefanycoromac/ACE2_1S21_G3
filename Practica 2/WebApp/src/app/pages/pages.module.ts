import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { HeartComponent } from './heart/heart.component';
import { OxygenComponent } from './oxygen/oxygen.component';
import { ProfileComponent } from './profile/profile.component';
import { CourseNavetteComponent } from './course-navette/course-navette.component';
import { Vo2maxComponent } from './vo2max/vo2max.component';


@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    TemperatureComponent,
    HeartComponent,
    OxygenComponent,
    ProfileComponent,
    CourseNavetteComponent,
    Vo2maxComponent
  ],
  exports: [
    PagesComponent,
    DashboardComponent,
    TemperatureComponent,
    HeartComponent,
    OxygenComponent,
    ProfileComponent,
    CourseNavetteComponent,
    Vo2maxComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatTableModule,
    MatPaginatorModule,
    SharedModule,
    ComponentsModule
  ]
})
export class PagesModule { }
