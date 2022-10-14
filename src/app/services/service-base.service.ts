import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';



@Injectable({
  providedIn: 'root'
})
export class ServiceBaseService {

  constructor(private _http: HttpClient, private cookie: CookieService)
   {

   }

  private data:JSON;
   apiURL: string;
  result:any
  urlToJson = '../assets/config.json';
  token:any;


    public GetApiBase()  {
     this._http.get<any>(this.urlToJson).subscribe(response => {
      this.apiURL = response["apiBase"]; //"https://easymarketserviceapideploy.azurewebsites.net/v1/";
      });
  }

  public  getCookie2(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0){ 
          var teste = JSON.parse(c.substring(nameEQ.length,c.length))["token"];
          console.log(teste); 
             return JSON.parse(c.substring(nameEQ.length,c.length))["token"];}
    }
   
    return null;
}

public getCookie(name) {
  if (this.cookie.get(name) === null || this.cookie.get(name) =='' ) return null;
  const token = JSON.parse(this.cookie.get(name));
    return token['token'];
}


public httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json',
                              'Authorization': `Bearer ${this.getCookie("oAuthToken")}` })
                             
}


}
