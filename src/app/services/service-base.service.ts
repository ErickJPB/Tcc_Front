import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceBaseService {

  constructor(private _http: HttpClient)
   {

   }

  private data:JSON;
   apiURL: string;
  result:any
  urlToJson = '../assets/config.json';


    public GetApiBase()  {
     this._http.get<any>(this.urlToJson).subscribe(response => {
      this.apiURL = response["apiBase"];
      });
  }

  public  getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0){ 
          console.log(c.substring(nameEQ.length,c.length)["token"]); 
             return JSON.parse(c.substring(nameEQ.length,c.length))["token"];}
    }
    return null;
}

public httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json',
                              'Authorization': `Bearer ${this.getCookie("oAuthToken")}` })
}


}
