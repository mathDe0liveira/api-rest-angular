import { CommonModule } from '@angular/common';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { Implementacao } from '../lista/implementacao';
import { Service } from '../service';

@Component({
  selector: 'app-modal-delete',
  imports: [
    MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent,
    CommonModule
  ],
  templateUrl: './modal-delete.html',
  styleUrl: './modal-delete.css'
})
export class ModalDelete {
  readonly dialogRef = inject(MatDialogRef<ModalDelete>);
  id!: number;
  projeto!: number

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Implementacao,
    private servico: Service
  ) {
  }

  close() {
    this.dialogRef.close();
  }

  delete() {
    // aqui vai a função do serviço do delete

      // Garante que temos um ID para deletar
    if (this.data && this.data.id) {
      // Chama o método do serviço, passando o ID do objeto recebido
      this.servico.deletarImplementacao(this.data.id)
        .subscribe({
          next: () => {
            console.log('Implementação deletada com sucesso!');
            // Fecha o modal e retorna 'true' para o componente da lista
            this.dialogRef.close(true);
          },
          
          error: (err) => {
            console.error('Erro ao deletar a implementação:', err);
            // Fecha o modal retornando 'false' em caso de erro
            this.dialogRef.close(false);
          }
        });
    }
  }
}
