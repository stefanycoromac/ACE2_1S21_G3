import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-step-counter',
  templateUrl: './step-counter.component.html',
  styles: [
  ]
})
export class StepCounterComponent implements OnInit {

  public stepData: any[];
  public stepGoal: number;

  constructor() {
    this.stepData = [
      {
        'name': 'Pasos',
        'value': 10
      }
    ];
    this.stepGoal = 0;
  }

  ngOnInit(): void {
  }

  saveGoal(): void {

  }

}
