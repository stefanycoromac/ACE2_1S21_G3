import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Vo2MaxPage } from './vo2-max.page';

const routes: Routes = [
  {
    path: '',
    component: Vo2MaxPage,
    children: [
        {
          path:'realTime', 
          loadChildren: '../real-time/real-time.module#RealTimePageModule'
        },        
        {
          path: 'reports', 
          loadChildren: '../reports/reports.module#ReportsPageModule'
        },
        {
          path: 'home', 
          loadChildren: '../home/home.module#HomePageModule'
        },
        {
          path: '',
          redirectTo: 'home',
          pathMatch: 'full'
        },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Vo2MaxPageRoutingModule {}
