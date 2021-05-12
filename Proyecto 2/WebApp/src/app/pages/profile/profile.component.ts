import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public user: User;

  constructor(
    private _userService: UserService
  ) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit(): void { }

  public async update() {
    try {
      const data = await this._userService.update(this.user);

      if (data['code'] === '200') {
        localStorage.setItem('user', JSON.stringify(this.user));
      }
    } catch (err) {
      console.log(<any>err);
    }
  }
}
