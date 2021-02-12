import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-heart',
  templateUrl: './heart.component.html',
  styleUrls: ['./heart.component.css']
})
export class HeartComponent implements OnInit {
  public counter = 0;
  public data: any[];

  public dataReports: any[];
  public xAxisLabel: string;
  public yAxisLabel: string;
  public legendTitle: string;

  constructor() {
    this.counter = 0;
    this.data = [{
      "name": "BPM",
      "series": this.initialData()
    }];

    this.reportProperties();
  }

  ngOnInit(): void {
    // const source = interval(1000);
    // this.subscription = source.subscribe(val => { this.addData(); this.addReportData(); });
  }

  private initialData(): any[] {
    const initialData: any[] = [];
    for (let index = -50; index < 0; index++) {
      initialData.push({
        "name": index,
        "value": 0
      });
    }

    return initialData;
  }

  private reportProperties(): void {
    this.xAxisLabel = "Fecha";
    this.yAxisLabel = "Promedio BPM";
    this.legendTitle = "Ultimas 10 lecturas";
    this.dataReports = [];
  }



  /* TEST */
  private subscription: Subscription;
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  private addData(): void {
    this.data[0].series.shift();

    const obj = {
      // "name": new Date().toLocaleString(),
      "name": this.counter++,
      "value": this.getRandomArbitrary(1, 100)
    }

    this.data[0].series.push(obj);
    this.data = [...this.data];
  }

  private getRandomArbitrary(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  private addReportData() {
    const obj = {
      "name": this.counter++,
      "value": this.getRandomArbitrary(1, 100)
    }

    this.dataReports.push(obj);
    this.dataReports = [...this.dataReports];
  }
}
