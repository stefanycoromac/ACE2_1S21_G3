import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {
  public data: any[];

  constructor() {
    this.data = [
      {
        "name": "Germany",
        "value": 8940000
      },
      {
        "name": "USA",
        "value": 5000000
      }
    ];
  }

  ngOnInit(): void { }
}
