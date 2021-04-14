import { Component, OnInit, Input} from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {

  @Input() modalController: ModalController; 

  constructor() { }

  ngOnInit() {
  }

  dismiss(){
    this.modalController.dismiss({
      'dismissed': true
    }); 
  }
}
