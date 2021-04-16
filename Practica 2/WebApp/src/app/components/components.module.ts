import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { LineChartComponent } from './line-chart/line-chart.component';
import { VerticalBarChartComponent } from './vertical-bar-chart/vertical-bar-chart.component';
import { GroupedVerticalBarChartComponent } from './grouped-vertical-bar-chart/grouped-vertical-bar-chart.component';
import { PieGridChartComponent } from './pie-grid-chart/pie-grid-chart.component';


@NgModule({
  declarations: [
    LineChartComponent,
    VerticalBarChartComponent,
    GroupedVerticalBarChartComponent,
    PieGridChartComponent,
  ],
  exports: [
    LineChartComponent,
    VerticalBarChartComponent,
    GroupedVerticalBarChartComponent,
    PieGridChartComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    NgxChartsModule
  ]
})
export class ComponentsModule { }
