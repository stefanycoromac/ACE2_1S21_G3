import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public rightPanel: boolean;

  constructor() {
    this.rightPanel = false;
  }

  ngOnInit(): void {
  }

  public switchPanel(): void {
    this.rightPanel = !this.rightPanel;
  }
}
