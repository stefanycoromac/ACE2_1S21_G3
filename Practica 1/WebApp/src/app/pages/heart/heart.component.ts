import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-heart',
  templateUrl: './heart.component.html',
  styleUrls: ['./heart.component.css']
})
export class HeartComponent implements OnInit {
  public dateNow: any;
  public counter = 0;
  public data: any[];

  public showXAxis: boolean;
  public xAxisLabel: string;
  public showXAxisLabel: boolean;

  public showYAxis: boolean;
  public yAxisLabel: string;
  public showYAxisLabel: boolean;

  public legendTitle: string;
  public showLegend: boolean;
  public legendPosition: string;

  public showGridLines: boolean;
  public roundDomains: boolean;
  public autoScale: boolean;

  constructor() {
    this.dateNow = Date.now();
    this.counter = 0;
    this.data = [{
      "name": "BPM",
      "series": this.initialData()
    }];


    this.showXAxis = true;
    this.xAxisLabel = 'X';
    this.showXAxisLabel = false;

    this.showYAxis = true;
    this.yAxisLabel = 'Y';
    this.showYAxisLabel = false;

    this.showGridLines = true;
    this.roundDomains = false;
    this.autoScale = true;

    this.legendTitle = 'BPM';
    this.showLegend = false;
    this.legendPosition = 'below';
  }

  ngOnInit(): void {
    // const source = interval(1000);
    // this.subscription = source.subscribe(val => this.addData());
  }

  private subscription: Subscription;
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  private initialData(): any[] {
    const initialData: any[] = [];
    for (let index = -25; index < 0; index++) {
      initialData.push({
        "name": index,
        //"value": 0
        "value": this.getRandomArbitrary(1, 100)
      });
    }

    return initialData;
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
    print
  }

  private getRandomArbitrary(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
}
