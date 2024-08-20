import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'principal',
    loadChildren: () => import('./principal/principal.module').then( m => m.PrincipalPageModule)
  },
  {
    path: 'turmas',
    loadChildren: () => import('./turmas/turmas.module').then( m => m.TurmasPageModule)
  },

  {
    path: 'registros',
    loadChildren: () => import('./registros/registros.module').then( m => m.RegistrosPageModule)
  },
  {
    path: 'conferir',
    loadChildren: () => import('./conferir/conferir.module').then( m => m.ConferirPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
