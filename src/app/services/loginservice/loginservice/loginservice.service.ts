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
    private servicebase: ServiceBaseService,
  ) {
    this.servicebase.GetApiBase();
  }


  public postUser(user: User): Observable<User> {
    console.log(JSON.stringify(user));
    return this._http.post<User>(this.servicebase.apiURL + Endpoint.Autenticacao, JSON.stringify(user), this.servicebase.httpOptions)
  }
  public getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

}
