import { Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Implementacao, Status } from './implementacao';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ModalAdd } from '../modal-add/modal-add';
import { CommonModule } from '@angular/common';
import { ModalDelete } from '../modal-delete/modal-delete';
import { Service } from '../service';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [
    MatTableModule, 
    MatToolbarModule, 
    MatIconModule, 
    MatMenuModule, 
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDialogModule,
    CommonModule
  ],
  templateUrl: './lista.html',
  styleUrl: './lista.css'
})

export class Lista implements OnInit {
  displayedColumns: string[] = ['id', 'idProjeto', 'descricao', 'dataInicio', 'dataFim', 'desenvolvedorResponsavel', 'versaoGerada', 'status', 'acao'];
  data: Implementacao[] = [];
  readonly dialog = inject(MatDialog);
  statusTextValue!: string;

  constructor(
    private servico: Service
  ){}

  ngOnInit(): void {
    this.carregarImplementacoes();
  }

  carregarImplementacoes(): void {
    this.servico.getImplementacoes().subscribe(dadosRecebidos => {
      this.data = dadosRecebidos;
      console.log('Dados recebidos do backend:', dadosRecebidos);
    });
  }

  public add(): void {
    const dialogRef = this.dialog.open(ModalAdd, { width: '550px' });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { // Se o modal retornou 'true' (indicando sucesso)
        this.carregarImplementacoes(); // Recarrega a lista
      }
    });
  }

  public edit(data: Implementacao): void {
    const dialogRef = this.dialog.open(ModalAdd, {
      width: '550px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.carregarImplementacoes();
      }
    });
  }

  public delete(data: Implementacao): void {
    const dialogRef = this.dialog.open(ModalDelete, {
      width: '250px',
      data: data 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.carregarImplementacoes();
      }
    });
  }

  public conversaoStatusParaTexto(status: Status): string {
    // Adicionamos o tipo de retorno explícito ': string'
    if (Number(status) === Status.Andamento) {
      return "Em andamento";
    }
    // Se não for 'Em andamento', retorna 'Teste' por padrão.
    return "Teste";
  }
}
