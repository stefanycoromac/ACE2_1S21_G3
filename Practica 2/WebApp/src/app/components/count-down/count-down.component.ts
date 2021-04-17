import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.css']
})
export class CountDownComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  public dateNow: Date;
  public milliSecondsInASecond: number;
  public hoursInADay: number;
  public minutesInAnHour: number
  public SecondsInAMinute: number;

  public timeDifference: number;
  public secondsToDday: number;
  public minutesToDday: number;

  constructor() {
    this.milliSecondsInASecond = 1000;
    this.hoursInADay = 24;
    this.minutesInAnHour = 60;
    this.SecondsInAMinute = 60;
  }

  ngOnInit() {
    this.activate();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  private activate() {
    this.dateNow = new Date();
    this.dateNow.setMinutes(this.dateNow.getMinutes() + 5);

    this.subscription = interval(1000).subscribe(
      () => {
        this.getTimeDifference();

        if (this.minutesToDday <= 0 && this.secondsToDday <= 0) {
          this.subscription.unsubscribe();
        }
      }
    );
  }

  private getTimeDifference() {
    this.timeDifference = this.dateNow.getTime() - new Date().getTime();
    this.allocateTimeUnits(this.timeDifference);
  }

  private allocateTimeUnits(timeDifference) {
    this.secondsToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond) % this.SecondsInAMinute);
    this.minutesToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour) % this.SecondsInAMinute);
  }
}
