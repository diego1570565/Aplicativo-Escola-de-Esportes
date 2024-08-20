import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConferirPageRoutingModule } from './conferir-routing.module';

import { ConferirPage } from './conferir.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConferirPageRoutingModule
  ],
  declarations: [ConferirPage]
})
export class ConferirPageModule {}
