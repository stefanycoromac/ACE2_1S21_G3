import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DevicesListPageRoutingModule } from './devices-list-routing.module';

import { DevicesListPage } from './devices-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DevicesListPageRoutingModule
  ],
  declarations: [DevicesListPage]
})
export class DevicesListPageModule {}
