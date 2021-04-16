import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public rightPanel: boolean;

  public user: User;
  public userSignup: User;

  constructor(
    private _router: Router,
    private _userService: UserService
  ) {
    this.rightPanel = false;

    this.user = new User();
    this.userSignup = new User();
  }

  ngOnInit(): void { }

  public switchPanel(): void {
    this.rightPanel = !this.rightPanel;
  }

  public async signin() {
    try {
      const data = await this._userService.authenticate(this.user);

      if (data['code'] === '200') {
        localStorage.setItem('user', JSON.stringify(<User>data['data']));
        this._router.navigate(['/dashboard']);
      }
    } catch (err) {
      console.log(<any>err);
    }
  }

  public async signup() {
    try {
      const data = await this._userService.signup(this.userSignup);

      if (data['code'] === '200') {
        this.user = this.userSignup;
        this.signin();
      }
    } catch (err) {
      console.log(<any>err);
    }
  }
}
