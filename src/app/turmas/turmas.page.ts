import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-turmas',
  templateUrl: './turmas.page.html',
  styleUrls: ['./turmas.page.scss'],
})
export class TurmasPage implements OnInit {
  turmas: any[] = [];
  uniqueTurmas: Set<string> = new Set();
  selectedTurma: any = null;
  searchBarContent: string = '';
  isLoading: boolean = false;
  selectedDisciplina: any = null;
  selectedHorario: any = null;


  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getTurmas('');
  }

  getTurmas(value: any) {
    this.isLoading = true; // Show progress bar
    const url = 'https://vitalimodas.com/API/Escola_Esportes/Turmas/busca.php?value=' + value;
    this.http.get<any[]>(url).subscribe(
      (data) => {
        console.log(data);
  
        const turmaMap = new Map();
        data.forEach((turma) => {
          const disciplina = turma.Descrição;
  
          if (!turmaMap.has(disciplina)) {
            turmaMap.set(disciplina, []);
          }
  
          turmaMap.get(disciplina).push(turma);
        });
  
        // Convert map to array format
        this.turmas = Array.from(turmaMap, ([Disciplina, Details]) => ({
          Disciplina,
          Details
        }));
  
        console.log(this.turmas);
        this.isLoading = false; // Hide progress bar
      },
      (error) => {
        console.error('Error fetching data:', error);
        this.isLoading = false; // Hide progress bar
      }
    );
  }
  
  
  
  logProgressBarContent() {
    console.log('Progress Bar Clicked:', 'The progress bar is currently indeterminate');
  }

  selectDisciplina(turma : any) {
    if (this.selectedDisciplina === turma) {
      this.selectedDisciplina = null;
      this.selectedHorario = null;
    } else {
      this.selectedDisciplina = turma;
      this.selectedHorario = null;
    }
  }
  
  selectHorario(horario : any) {
    if (this.selectedHorario === horario) {
      this.selectedHorario = null;
    } else {
      this.selectedHorario = horario;
    }
  }

  selectTurma(turma: any) {
    this.selectedTurma = this.selectedTurma === turma ? null : turma;
  }

  logSearchContent(event: any) {
    this.searchBarContent = event.target.value;
    console.log('Search Bar Content:', this.searchBarContent);
    this.getTurmas(event.target.value);
  }
}


