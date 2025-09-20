import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Implementacao, Status } from '../lista/implementacao';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { operate } from 'rxjs/internal/util/lift';
import { Service } from '../service';

@Component({
  selector: 'app-modal-add',
  imports: [
    MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, ReactiveFormsModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule,
  ],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
  ],
  templateUrl: './modal-add.html',
  styleUrl: './modal-add.css'
})
export class ModalAdd implements OnInit {
  readonly dialogRef = inject(MatDialogRef<ModalAdd>);
  form!: FormGroup;
  title: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Implementacao,
    private formBuilder: FormBuilder,
    private servico: Service
  ) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.data ? this.title = "Editar" : this.title = "Adicionar";
    this.data ? this.editForm(this.data) : this.createForm();
  }

  public createForm() {
    this.form = this.formBuilder.group({
      id: [],
      idProjeto: [, Validators.required],
      descricao: ['', Validators.required],
      dataInicio: ['', Validators.required],
      dataFim: [],
      desenvolvedorResponsavel: ['', Validators.required],
      versaoGerada: ['', Validators.required],
      status: [, Validators.required]
    });
  }

  editForm(data: Implementacao) {
    this.createForm();
    this.form.patchValue({
      id: data.id,
      idProjeto: data.idProjeto,
      descricao: data.descricao,
      dataInicio: data.dataInicio,
      dataFim: data.dataFim,
      desenvolvedorResp: data.desenvolvedorResponsavel,
      versaoGerada: data.versaoGerada,
      status: data.status
    });
  }

  submitForm() {

    if (this.form.invalid) return;

     // Pega todos os valores do formulário
    const formValue: Implementacao = this.form.getRawValue();

    // Verifica se está em modo de EDIÇÃO (se 'data' foi passado para o modal)
    if (this.data && this.data.id) {
      // Chama o serviço de ATUALIZAÇÃO
      this.servico.atualizarImplementacao(this.data.id, formValue)
        .subscribe({
          next: () => {
            console.log('Implementação atualizada com sucesso!');
            this.dialogRef.close(true); // Fecha o modal e sinaliza sucesso
          },
          error: (err) => console.error('Erro ao atualizar:', err)
        });
    } else {
      // Se não, está em modo de CRIAÇÃO
      // Chama o serviço de CRIAÇÃO
      this.servico.criarImplementacao(formValue)
        .subscribe({
          next: () => {
            console.log('Implementação criada com sucesso!');
            this.dialogRef.close(true); // Fecha o modal e sinaliza sucesso
          },
          error: (err) => console.error('Erro ao criar:', err)
        });
    }
  }

  close() {
    this.dialogRef.close();
  }

  selectValue(option1: any, option2: any) {
    return option1 && option2 && option1 === option2;
  }
}
