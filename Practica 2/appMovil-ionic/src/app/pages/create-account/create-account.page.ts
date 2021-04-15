import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ModalController } from '@ionic/angular';

import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {

  @Input() modalController: ModalController;

  public user: User;

  constructor(
    private _router: Router,
    private _userService: UserService
  ) {
    this.user = new User();
  }

  ngOnInit() { }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  public async signup() {
    try {
      const data = await this._userService.signup(this.user);

      if (data['code'] === '200') {
        this.user = this.user;

        localStorage.setItem('user', JSON.stringify(<User>data['data']));
        this.dismiss();
        this._router.navigate(['/vo2-max']);
      }
    } catch (err) {
      console.log(<any>err);
    }
  }
}
