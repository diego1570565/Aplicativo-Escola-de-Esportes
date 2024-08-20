import { Component } from '@angular/core';
import { MenuController, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular'; // Importe do 'storage-angular'


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  nome: string = '';
  senha: string = '';

  constructor(
    private menuCtrl: MenuController,
    private http: HttpClient,
    private alertController: AlertController,
    private storage: Storage // Alterado para 'Storage'
  ) {
    this.initStorage(); // Chama o método para inicializar o armazenamento
  }

  abrirMenu() {
    this.menuCtrl.open();
  }

  async initStorage() {
    await this.storage.create(); // Cria o banco de dados se ainda não existir
  }
  async login() {

    const nome = this.nome;
    const senha = this.senha;

    const url = `https://vitalimodas.com/API/Escola_Esportes/Usuarios/login.php`; 

    try {
      const response: any = await this.http.post(url, { nome, senha }).toPromise();
      console.log(response);

      if (response.status === "success") {

        await this.storage.set('nome', this.nome);

        const alert = await this.alertController.create({
          header: 'Sucesso!',
          message: response.message,
          buttons: ['OK']
        });

        await alert.present();

        location.assign('principal')

      } else if (response.status === "error") {
        
        const alert = await this.alertController.create({
          header: 'Erro!',
          message: 'Verifique o Login e a Senha !!!',
          buttons: ['OK']
        });

        await alert.present();
      } else {
        const alert = await this.alertController.create({
          header: 'Erro!',
          message: 'Erro desconhecido ao tentar fazer login.',
          buttons: ['OK']
        });
        await alert.present();
      }

    } catch (error: any) {
      if (error instanceof HttpErrorResponse) {
        const alert = await this.alertController.create({
          header: 'Erro!',
          message: error.message,
          buttons: ['OK']
        });
        await alert.present();
      } else {
        const alert = await this.alertController.create({
          header: 'Erro!',
          message: 'Outro tipo de erro: ' + error,
          buttons: ['OK']
        });
        await alert.present();
      }
    }
  }
}
