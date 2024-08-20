import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SegmentValue } from '@ionic/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.page.html',
  styleUrls: ['./registros.page.scss'],
})
export class RegistrosPage implements OnInit {
  diasDaSemana = ["Domingo", "Segunda-feira", "Terca-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sabado"];
  turmas: any[] = [];
  filteredTurmas: string[] = [];
  horarios: { [key: string]: { [key: string]: string[] } } = {};
  selectedDia: string = '';
  selectedTurma: string = '';
  somenteTurma:string = '';
  data: string = '';
  availableHorarios: string[] = [];
  mostrarRegistros: boolean = true;
  isRegistrarDisabled: boolean = true;
  selectedSegment: string = 'Registros';
  alunos: any[] = [];
  isLoading: boolean = false;
  isToastOpen = false;
  selectedHorario : string = '';
  horario: string = '';

  constructor(private http: HttpClient, private toastController: ToastController) { }

  ngOnInit() {

    this.fetchData();


    setInterval(
      () => {
        if (
          this.selectedDia &&
          this.selectedTurma &&
          this.alunos.length > 0
        ) {
          this.isRegistrarDisabled = false;
        } else {
          this.isRegistrarDisabled = true;
        }
      }, 250
    )

  }

  fetchData() {
    const url = 'https://vitalimodas.com/API/Escola_Esportes/Horarios/busca.php?value=';
  
    this.http.get<any[]>(url).subscribe(
      (data) => {
        this.turmas = data;
        console.log(data);

        data.forEach((item) => {
          const dia = item['Dias da Semana'];
          const turma = item['Descrição'];
          const horario = item['Hora Inicial'];
          
          if (!this.horarios[dia]) {
            this.horarios[dia] = {};
          }
          if (!this.horarios[dia][turma]) {
            this.horarios[dia][turma] = [];
          }
          this.horarios[dia][turma].push(horario);
        });

        this.updateRegistrarButton();
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }


  onDateChange(event: any) {
    this.isLoading = true;
    this.selectedTurma = '';
    this.selectedHorario = '';
    this.availableHorarios = [];
    this.data = event.target.value;

    const selectedDate = new Date(event.target.value);
    const selectedDay = this.diasDaSemana[selectedDate.getDay() + 1];

    this.selectedDia = selectedDay;
    console.log(selectedDay)
    this.filteredTurmas = Object.keys(this.horarios[selectedDay] || {});

    this.updateRegistrarButton();

    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }


  alternarVisualizacao(segmento: SegmentValue | undefined) {
    if (segmento === 'Registros') {
      this.mostrarRegistros = true;
    } else if (segmento === 'Registrar') {
      this.mostrarRegistros = false;

      this.verificar_se_existem_registros()
    }
  }

  onTurmaChange() {
    console.log(this.selectedDia)
    if (this.selectedDia && this.selectedTurma) {
      const horariosSet = new Set(this.horarios[this.selectedDia][this.selectedTurma] || []);
      this.availableHorarios = Array.from(horariosSet);
      this.selectedHorario = this.availableHorarios[0] ;
    } else {
      this.availableHorarios = [];
    }
    this.updateRegistrarButton();

    if (this.selectedHorario) {
      this.getAlunos();
    }
    this.updateRegistrarButton();
  }
  

  verificar_se_existem_registros() {
    this.isLoading = true;
    
    const url = `https://vitalimodas.com/API/Escola_Esportes/Registros/verificar_registros.php`;
    
    // Converte a string da data em um objeto Date, adiciona 1 dia e formata de volta para string
    let data = new Date(this.data);
    data.setDate(data.getDate() + 1);
    const novaData = data.toISOString().split('T')[0]; // Formata para YYYY-MM-DD
  
    const alunoHorarios = {
      turma: this.selectedTurma,
      horario: this.horario,
      data: novaData // Envia a nova data com 1 dia a mais
    };
    
    this.http.post<any[]>(url, alunoHorarios).subscribe(
      response => {
        console.log('Resposta da API:', response);
        if (Array.isArray(response) && response.length > 0) {
          this.AlertaRegistrosExistentes();
        } else {
          console.log('Primeiro Registro')
        }
      },
      error => {
        console.error('Erro ao enviar dados para a API:', error);
      },
      () => {
        this.isLoading = false; // Esconder a barra de progresso após a conclusão da requisição
      }
    );
  }
  

  updateRegistrarButton() {
    this.isRegistrarDisabled = this.availableHorarios.length === 0;
  }

  async AlertaSemAlunos() {
    const toast = await this.toastController.create({
      message: 'Não há alunos dessa modalidade nesse dia!',
      duration: 1500,
      position: 'bottom',
    });

    await toast.present();
  }

  async AlertaRegistrosExistentes() {
    const toast = await this.toastController.create({
      message: 'Atualizando Registro Existente!',
      duration: 1500,
      position: 'bottom',
    });

    await toast.present();
  }


  async AlertaSalvar() {
    const toast = await this.toastController.create({
      message: 'Sucesso!',
      duration: 1500,
      position: 'bottom',
    });

    await toast.present();

  }

  async AlertaDados() {
    const toast = await this.toastController.create({
      message: 'Preencha todos os Dados!',
      duration: 1500,
      position: 'bottom',
    });
    await toast.present();
  }



  getAlunos() {
    this.isLoading = true;
  
    const url = `https://vitalimodas.com/API/Escola_Esportes/Turmas/busca.php?value=`;
    this.http.get<any[]>(url).subscribe(
      (data) => {
        console.log(data);
  
        // EXEMPLO this.selectedTurma = "Hidroginastica / 10:00:00-12:50:00"
        const disciplina = this.selectedTurma
        const horaInicial = this.selectedHorario
  
        console.log('Disciplina:', disciplina);
        console.log('Hora Inicial:', horaInicial);
      
  
        // Filtrar os alunos pela disciplina, hora inicial e hora final
        const filteredAlunos = data.filter(aluno => 
          aluno['Descrição'].trim() === disciplina.trim() &&
          aluno['Hora Inicial'].trim() === horaInicial.trim() 
        );
  
        this.alunos = filteredAlunos;
        console.log(this.alunos)
        setTimeout(() => {
          if (this.alunos.length > 0) {
            this.isLoading = false;
            console.log('alunos');
            console.log(this.alunos);
          } else {
            this.AlertaSemAlunos();
            this.isLoading = false;
          }
        }, 2000);
      },
      (error) => {
        console.error('Error fetching data:', error);
        this.isLoading = false;
      }
    );
  }
  
  salvar() {
   
      const selectedAlunos = this.alunos.filter(aluno => aluno.checked);
       
      let turma = this.selectedTurma.split(' / ')[0];
      let horario = this.selectedHorario
  

      const alunoHorarios = selectedAlunos.map(aluno => ({
        nomeAluno: aluno['Nome do Aluno'],
        diaSemana: this.selectedDia,
        turma: turma,
        horario: horario,
        data: new Date(this.data) // Converter a string para um objeto Date
      }));

      alunoHorarios.forEach(aluno => aluno.data.setDate(aluno.data.getDate() + 1));

      console.log('Aluno Horários:', alunoHorarios);

      const url = 'https://vitalimodas.com/API/Escola_Esportes/Registros/adicionar_registros.php';

      this.http.post(url, { alunos: alunoHorarios }) // Enviar os dados dentro de um objeto
        .subscribe(
          response => {
            console.log('Resposta da API:', response);
            if (response == 'Dados inseridos com sucesso!') {
              this.AlertaSalvar();

              setTimeout(
                () => {
                  location.reload()
                }, 1500
              )

            } else if (response == 'Registro atualizado com sucesso!') {

              this.AlertaSalvar();

              setTimeout(
                () => {
                  location.reload()
                }, 1500
              )

            }
          },
          error => {
            console.error('Erro ao enviar dados para a API:', error);
            this.AlertaDados();
          }
        );
    } 

}