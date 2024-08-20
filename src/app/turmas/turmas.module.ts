import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TurmasPageRoutingModule } from './turmas-routing.module';

import { TurmasPage } from './turmas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TurmasPageRoutingModule
  ],
  declarations: [TurmasPage]
})
export class TurmasPageModule {}
