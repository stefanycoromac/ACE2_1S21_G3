import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { OxygenComponent } from './oxygen/oxygen.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { HeartComponent } from './heart/heart.component';
import { CourseNavetteComponent } from './course-navette/course-navette.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'oxygen', component: OxygenComponent },
      { path: 'oxygen/:idUser', component: OxygenComponent },
      { path: 'temperature', component: TemperatureComponent },
      { path: 'temperature/:idUser', component: TemperatureComponent },
      { path: 'heart-rate', component: HeartComponent },
      { path: 'heart-rate/:idUser', component: HeartComponent },
      { path: 'course-navette', component: CourseNavetteComponent },
      { path: 'course-navette/:idUser', component: CourseNavetteComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PagesRoutingModule { }
