import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular'; 
import { CreateAccountPage } from '../create-account/create-account.page'


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user:string; 
  password: string; 
  
  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  login(){
    
  }

  async showCreateAccount(){
    const modal =  await this.modalController.create({
      component: CreateAccountPage, 
      componentProps: {
        'modalController': this.modalController
      }
    }); 

    return await modal.present(); 
  }
}
