import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController, ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-conferir',
  templateUrl: './conferir.page.html',
  styleUrls: ['./conferir.page.scss'],
})
export class ConferirPage implements OnInit {
  items: any[] = [];

  private apiUrl = 'https://vitalimodas.com/API/Escola_Esportes/Registros/buscar_registros.php';
  private deleteUrl = 'https://vitalimodas.com/API/Escola_Esportes/Registros/deletar_registros.php';
  
  selectedTurma: string = '';
  selectedData: string = '';
  selectedHorario: string = '';
  alunosList: string[] = [];
  isLoading: boolean = false;
  noRecordsFound = false; // Add this property

  constructor(
    private http: HttpClient,
    private modalController: ModalController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.fetchData();
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1); // Adiciona 1 dia à data
  
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
  
    return `${day}/${month}/${year}`;
  }

  async openModal(item: any) {
    this.selectedTurma = item.Turma;
    this.selectedData = item.Data;
    this.selectedHorario = item.Horario;
    this.alunosList = item.Alunos.replace(/"/g, '').split(', ');

    const modal = await this.modalController.create({
      component: ModalContentPage,
      componentProps: {
        turma: this.selectedTurma,
        data: this.selectedData,
        horario: this.selectedHorario,
        alunos: this.alunosList
      }
    });
    return await modal.present();
  }

  fetchData() {
    this.isLoading = true; // Show progress bar
    this.http.get<any[]>(this.apiUrl).subscribe(
      (data) => {
        console.log(data[0]);
        if (Array.isArray(data[0]) && data[0].length > 0) {
          this.items = data[0].map(item => ({
            ...item,
            Data: this.formatDate(item.Data)
          }));
          this.noRecordsFound = false; // Hide the message
        } else {
          this.noRecordsFound = true; // Show the message
          this.AlertaDados();
          this.items = [];
        }
      },
      (error) => {
        console.error('Erro ao buscar os registros:', error);
      },
      () => {
        this.isLoading = false; // Hide progress bar after the request is completed
      }
    );


  }

  async dismissModal() {
    await this.modalController.dismiss();
  }

  deleteItem(id: number) {
    this.isLoading = true; // Mostrar barra de progresso
    console.log('ID do item a ser deletado:', id);
  
    const id_envio = id.toString();
  
    console.log(id_envio);
    const body = { id: id_envio }; // Certifique-se de que o nome da propriedade seja o mesmo esperado pela API
  
    console.log('Dados a serem enviados para a API:', id_envio); // Adicione este console.log para verificar os dados enviados
  
    this.http.post(this.deleteUrl, body).subscribe(
      (response) => {
        console.log('Item deletado na API:', response);
        this.fetchData();
        setTimeout(() => {
          this.isLoading = false; // Esconder barra de progresso
        }, 1000);
      },
      (error) => {
        console.error('Erro ao deletar item na API:', error);
        this.fetchData();
      }
    );
  }
  

  async AlertaDados() {
    const toast = await this.toastController.create({
      message: 'Nenhum dado encontrado!',
      duration: 1500,
      position: 'bottom',
    });
    await toast.present();
  }
}

@Component({
  selector: 'modal-content',
  template: `
      <ion-header>
        <ion-toolbar>
          <ion-title>{{ turma }} - {{ data }} - {{ horario }}</ion-title>
          <ion-buttons slot="end">
            <ion-button (click)="dismissModal()">Fechar</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <ion-item *ngFor="let aluno of alunos">
            <ion-label (click)="confirmDelete(aluno, turma, data, horario)">{{ aluno }}</ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    `
})
export class ModalContentPage implements OnInit {
  turma: string = '';
  data: string = '';
  horario: string = '';
  alunos: string[] = [];
  items: any[] = [];
  selectedTurma: string = '';
  selectedData: string = '';
  selectedHorario: string = '';
  alunosList: string[] = [];
  isLoading: boolean = false;
  noRecordsFound = false; 

  private apiUrl = 'https://vitalimodas.com/API/Escola_Esportes/Registros/buscar_registros.php';
  private deleteAlunos = 'https://vitalimodas.com/API/Escola_Esportes/Registros/apagar_alunos_registros.php';
  private buscarAlunosNaoCadastrados = 'http://192.168.156.150:81/API/AplicativoEE/Registros/buscar_alunos_registros.php';

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private http: HttpClient 
  ) { }

  ngOnInit() { }

  async dismissModal() {
    await this.modalController.dismiss();
  }

  adicionar(turma : string, data : string, horario : string){
    const formData = new FormData();

 
    formData.append('turma', turma);
    formData.append('data', data);
    formData.append('horario', horario);

    console.log('Dados a serem enviados para a API:', formData); // Adicione este console.log para verificar os dados enviados

    this.http.post(this.buscarAlunosNaoCadastrados, formData).subscribe(
      (response) => {
        console.log('Item deletado na API:', response);
        this.isLoading = false;
      },
      (error) => {
        console.error('Erro ao deletar item na API:', error);
        this.isLoading = false;
      }
    );
  }

  async confirmDelete(aluno: string, turma: string, data: string, horario: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar exclusão',
      message: `Você tem certeza que deseja apagar ${aluno}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Ação de exclusão cancelada');
          },
        },
        {
          text: 'Apagar',
          role: 'destructive',
          handler: () => {
            this.apagar(aluno, turma, data, horario);
          },
        },
      ],
    });

    await alert.present();
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1); // Adiciona 1 dia à data
  
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
  
    return `${day}/${month}/${year}`;
  }
  fetchData() {
    this.isLoading = true; // Show progress bar
    this.http.get<any[]>(this.apiUrl).subscribe(
      (data) => {
        console.log(data);
        if (Array.isArray(data) && data.length > 0) {
          this.items = data
            .map(item => ({
              ...item,
              Data: this.formatDate(item.Data)
            }))
            .sort((a, b) => a.Alunos.localeCompare(b.Alunos)); // Ordena pela string do nome dos alunos
          this.noRecordsFound = false; // Hide the message
        } else {
          this.noRecordsFound = true; // Show the message
          this.items = [];
        }
      },
      (error) => {
        console.error('Erro ao buscar os registros:', error);
      },
      () => {
        this.isLoading = false; // Hide progress bar after the request is completed
      }
    );
  }
  

  apagar(aluno: string, turma: string, data: string, horario: string) {
    this.alunos = this.alunos.filter(item => item !== aluno);

    this.isLoading = true; // Show progress bar
    console.log('ID do item a ser deletado:', aluno, turma, data, horario);

    const formData = new FormData();

    formData.append('aluno', aluno); 
    formData.append('turma', turma);
    formData.append('data', data);
    formData.append('horario', horario);

    this.http.post(this.deleteAlunos, formData).subscribe(
      (response) => {
        console.log('Resposta da API:', response);
        this.fetchData() 
        this.isLoading = false; // Hide progress bar
      },
      (error) => {
        console.error('Erro ao deletar item na API:', error);
        this.isLoading = false; // Hide progress bar
      }
    );
  }
}



