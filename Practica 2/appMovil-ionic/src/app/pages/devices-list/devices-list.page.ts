import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial'
import { AlertController } from '@ionic/angular'

@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.page.html',
  styleUrls: ['./devices-list.page.scss'],
})
export class DevicesListPage implements OnInit {

  @Input() devices: []; 
  @Input() modalController: ModalController; 
  @Input() bluetoothSerial: BluetoothSerial; 

  constructor(private alertController: AlertController) { }

  ngOnInit() {
    this.initBluetooth(); 
  }

  dismiss(){
    this.modalController.dismiss({
      'dismissed': true
    }); 
  }

  initBluetooth(){
    this.bluetoothSerial.isEnabled().then(response=>{
      console.log('Bluetooth Encendido')
      this.isEnable('Bluetooth Encendido')
      this.devicesList();  
    }, error=>{
      console.log('Bluetooth Apagado')
      this.isEnable('Bluetooth Apagado')
      this.devicesList(); 
    }); 
  }

  devicesList(){
    this.bluetoothSerial.list().then(response=>{
      this.devices = response; 
    }, error =>{
      console.log('Error con la lista de Dispositivos ')
    }); 
  }

  async isEnable(msg){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Bluetooth',
      subHeader: 'Estado',
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }
  
  sendData(){
    this.bluetoothSerial.write('3').then(response =>{
      this.showAlert('Correcto')
    }, error =>{
      this.showAlert('Problema con el envio de datos')
    }); 
  }

  connect(address){
    this.bluetoothSerial.connect(address).subscribe(success =>{
      this.deviceConnect(); 
    }, error =>{
      this.showAlert('Ocurrio un error en la conexion'); 
    })
  }

  async deviceConnect(){
    this.bluetoothSerial.subscribe('/n').subscribe(success =>{
      this.showAlert('Dispositivo Conectado'); 
      this.showAlert(success); 
    }); 
  }

  async showAlert(msg){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Bluetooth',
      subHeader: 'Estado',
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }

}
