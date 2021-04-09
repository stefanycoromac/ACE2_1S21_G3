import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular'; 


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user:string; 
  password: string; 

  private users = [
    {
      user: 'avla', 
      password: '1234'
    }, 
    {
      user: 'admin', 
      password: 'admin'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

  login(){
    
  }
}
