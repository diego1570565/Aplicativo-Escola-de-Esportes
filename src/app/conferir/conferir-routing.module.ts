import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConferirPage } from './conferir.page';

const routes: Routes = [
  {
    path: '',
    component: ConferirPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConferirPageRoutingModule {}
