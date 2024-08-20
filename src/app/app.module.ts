import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ModalContentPage } from './conferir/conferir.page';
import { IonicStorageModule } from '@ionic/storage-angular'; 

@NgModule({
  declarations: [AppComponent, ModalContentPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot() // Configura o módulo de storage
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
