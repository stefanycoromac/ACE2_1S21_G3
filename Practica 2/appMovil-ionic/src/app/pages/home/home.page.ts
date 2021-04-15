import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public user: User;

  constructor(
    private _userService: UserService
  ) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {
    this.getUser();
  }

  public async update() {
    try {
      const data = await this._userService.update(this.user);

      if (data['code'] === '200') {
      }
    } catch (err) {
      console.log(<any>err);
    }
  }

  private async getUser(): Promise<void> {
    try {
      const data = await this._userService.get(this.user.idUsuario);

      if (data['code'] === '200') {
        this.user = data['data'];
      }
    } catch (err) {
      console.log(<any>err);
    }
  }
}
