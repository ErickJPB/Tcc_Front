import { Injectable, Injector } from '@angular/core';

import { CadUsers } from 'src/app/models/cad-users';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceBaseService } from '../service-base.service';
import { Endpoint } from 'src/app/shared/endpoint';
import { map } from 'rxjs/operators';
import { UserDtoResponse } from 'src/app/models/user-dto-response';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient,
    public injector: Injector,
    private servicebase:ServiceBaseService,){
        this.servicebase.GetApiBase();
  } 

  public CreateUser(user: CadUsers): Observable<CadUsers> {
    console.log(JSON.stringify(user));
    return this._http.post<CadUsers>(this.servicebase.apiURL + Endpoint.CriarUsuario, JSON.stringify(user), this.servicebase.httpOptions)
  }
    public UpdateUser(user: CadUsers): Observable<CadUsers> {
    
    return this._http.put<CadUsers>(this.servicebase.apiURL + Endpoint.UpdateUser, JSON.stringify(user), this.servicebase.httpOptions)
  }

  public GetAllUser(): Observable<UserDtoResponse[]> {
   
    return this._http.get<UserDtoResponse[]>(this.servicebase.apiURL + Endpoint.GetAllUsers, this.servicebase.httpOptions)
    .pipe(
      map(this.extrairRespostaItem));
  }
  protected extrairRespostaItem(resposta: any) {
    return resposta.items || {};
  }

  getCity(estado: number) {
    switch (estado) {
      case 1: {
        return [
          { label: 'Palhoça', value: 5 },
          { label: 'Lages', value: 6 },
          { label: 'Balneário Camboriú', value: 7 },
          { label: 'Brusque', value: 8 }
        ];
      }
      case 2: {
        return [
          { label: 'São Paulo', value: 9 },
          { label: 'Guarulhos', value: 10 },
          { label: 'Campinas', value: 11 },
          { label: 'São Bernardo do Campo', value: 12 }
        ];
      }
      case 3: {
        return [
          { label: 'Rio de Janeiro', value: 13 },
          { label: 'São Gonçalo', value: 14 },
          { label: 'Duque de Caxias', value: 15 },
          { label: 'Nova Iguaçu', value: 16 }
        ];
      }
      case 4: {
        return [
          { label: 'Belo Horizonte', value: 17 },
          { label: 'Uberlândia', value: 18 },
          { label: 'Contagem', value: 19 },
          { label: 'Juiz de Fora', value: 20 }
        ];
      }
    }
    return [];
  }

  getUserDocument(value) {
    const cpfField = { property: 'cpf', visible: true };
    const cnpjField = { property: 'cnpj', visible: true };
    const document = value.isJuridicPerson ? cnpjField : cpfField;

    return {
      fields: [document]
    };
  }
}