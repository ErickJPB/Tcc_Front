import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceBaseService } from '../service-base.service';
import { Observable } from 'rxjs';
import { Entradas } from 'src/app/models/entradas/entradas';
import { Endpoint } from 'src/app/shared/endpoint';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EntradaserviceService {

  constructor(private _http: HttpClient,
    public injector: Injector,
    private servicebase: ServiceBaseService,) {

    this.servicebase.GetApiBase();
   }


   public getAllEntradas():Observable<Entradas[]>{
    this.servicebase.GetApiBase();  
	const url = "https://easymarketserviceapideploy.azurewebsites.net/v1/";	
    return this._http.get<Entradas[]>(url  +  Endpoint.GetAllEntradas , this.servicebase.httpOptions)
    .pipe(                             
      map(this.extrairRespostaItem));
    }

    public InsertEntradas(entradas:Entradas):Observable<Entradas>{
	  const url = "https://easymarketserviceapideploy.azurewebsites.net/v1/";		
      return this._http.post<Entradas>(url + Endpoint.InsertEntradas, JSON.stringify(entradas),this.servicebase.httpOptions)
}

    
  protected extrairRespostaItem(resposta: any) {
    
    return resposta.items || {};
  }
}
