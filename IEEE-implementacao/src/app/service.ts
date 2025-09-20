import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Implementacao } from './lista/implementacao'; 

@Injectable({
  providedIn: 'root'
})
export class Service {

  private readonly apiUrl = 'http://localhost:8080/api/implementacoes';

  constructor(
    private http: HttpClient
  ) { }

  // aqui adiciona a url do back e faz as funções que chamam as urls especificas
  
  //GET
  getImplementacoes(): Observable<Implementacao[]> {
    return this.http.get<Implementacao[]>(this.apiUrl);
  }

  //POST
  criarImplementacao(implementacao: Implementacao): Observable<Implementacao> {
    return this.http.post<Implementacao>(this.apiUrl, implementacao);
  }

  //PUT
  atualizarImplementacao(id: number, implementacao: Implementacao): Observable<Implementacao> {
    const url = `${this.apiUrl}/${id}`; // Monta a URL: http://.../api/implementacoes/1
    return this.http.put<Implementacao>(url, implementacao);
  }

  //DELETE
  deletarImplementacao(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
