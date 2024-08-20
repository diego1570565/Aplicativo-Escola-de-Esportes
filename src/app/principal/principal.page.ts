import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular'; // Importe do 'storage-angular'

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})

export class PrincipalPage implements OnInit {
  nomeSalvo: string = '';

  constructor(private storage: Storage) { } // Construtor corrigido

  async ngOnInit() {
    // Verifica se o banco de dados foi criado, caso contrário, cria
    await this.storage.create();
    
    // Obtém o nome salvo no armazenamento
    this.nomeSalvo = await this.storage.get('nome');
  }
}
