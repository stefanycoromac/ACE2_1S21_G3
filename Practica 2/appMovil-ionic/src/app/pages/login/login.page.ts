import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { CreateAccountPage } from '../create-account/create-account.page'

import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public user: User;

  constructor(
    private modalController: ModalController,
    private _router: Router,
    private _userService: UserService
  ) {
    this.user = new User();
  }

  ngOnInit() { }

  public async signin() {
    try {
      const data = await this._userService.authenticate(this.user);

      if (data['code'] === '200') {
        localStorage.setItem('user', JSON.stringify(<User>data['data']));
        this._router.navigate(['/vo2-max']);
      }
    } catch (err) {
      console.log(<any>err);
    }
  }

  async showCreateAccount() {
    const modal = await this.modalController.create({
      component: CreateAccountPage,
      componentProps: {
        'modalController': this.modalController
      }
    });

    return await modal.present();
  }
}
