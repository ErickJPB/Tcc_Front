import { Injectable, Injector } from '@angular/core';
import { User } from 'src/app/models/user';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigApi, Endpoint } from 'src/app/shared/endpoint';
import { ServiceBaseService } from '../../service-base.service';



@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {
  result: any
  urlToJson = '../assets/config.json';
  constructor(private _http: HttpClient,
    public injector: Injector,
    public  servicebase :ServiceBaseService,
  ) {
    this.servicebase.GetApiBase();
  }


  public postUser(user: User): Observable<User> {
	  const url = "https://easymarketserviceapideploy.azurewebsites.net/v1/";
    return this._http.post<User>(url + Endpoint.Autenticacao, JSON.stringify(user), this.servicebase.httpOptions)
  }
  public getCookie(name) {
   return this.servicebase.getCookie(name);
  }

}
