import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TurmasPage } from './turmas.page';

const routes: Routes = [
  {
    path: '',
    component: TurmasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TurmasPageRoutingModule {}
