import { Component, OnInit } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx'
import { AlertController } from '@ionic/angular'
import { ModalController } from '@ionic/angular'
import { DevicesListPage } from '../devices-list/devices-list.page'

@Component({
  selector: 'app-vo2-max',
  templateUrl: './vo2-max.page.html',
  styleUrls: ['./vo2-max.page.scss'],
})
export class Vo2MaxPage implements OnInit {

  private devices: any; 
  private modal: ModalController; 
  private bluetoothSerial: BluetoothSerial;

  constructor(private bluetooth: BluetoothSerial, private alertController: AlertController, private modalController: ModalController) {
    this.modal = modalController; 
    this.bluetoothSerial = bluetooth; 
  }

  ngOnInit() {
  }

  async showDevicesList(){
    const modal =  await this.modalController.create({
      component: DevicesListPage,
      swipeToClose: true, 
      componentProps:{
        'devices': this.devices, 
        'modalController': this.modal, 
        'bluetoothSerial': this.bluetoothSerial
      }
    }); 
    return await modal.present(); 
  }

}
