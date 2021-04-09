import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Vo2MaxPageRoutingModule } from './vo2-max-routing.module';

import { Vo2MaxPage } from './vo2-max.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Vo2MaxPageRoutingModule
  ],
  declarations: [Vo2MaxPage]
})
export class Vo2MaxPageModule {}
