import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';

import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { HeartComponent } from './heart/heart.component';
import { OxygenComponent } from './oxygen/oxygen.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    TemperatureComponent,
    HeartComponent,
    OxygenComponent,
    ProfileComponent
  ],
  exports: [
    PagesComponent,
    DashboardComponent,
    TemperatureComponent,
    HeartComponent,
    OxygenComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatIconModule,
    MatSidenavModule,
    SharedModule,
    ComponentsModule
  ]
})
export class PagesModule { }
