import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { LineChartComponent } from './line-chart/line-chart.component';
import { VerticalBarChartComponent } from './vertical-bar-chart/vertical-bar-chart.component';
import { GroupedVerticalBarChartComponent } from './grouped-vertical-bar-chart/grouped-vertical-bar-chart.component';
import { PieGridChartComponent } from './pie-grid-chart/pie-grid-chart.component';
import { DetailTestTableComponent } from './detail-test-table/detail-test-table.component';


@NgModule({
  declarations: [
    LineChartComponent,
    VerticalBarChartComponent,
    GroupedVerticalBarChartComponent,
    PieGridChartComponent,
    DetailTestTableComponent,
  ],
  exports: [
    LineChartComponent,
    VerticalBarChartComponent,
    GroupedVerticalBarChartComponent,
    PieGridChartComponent,
    DetailTestTableComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    MatTableModule,
    MatPaginatorModule,
  ]
})
export class ComponentsModule { }
