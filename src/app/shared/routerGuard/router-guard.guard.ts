import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginserviceService } from 'src/app/services/loginservice/loginservice/loginservice.service';
import jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class RouterGuardGuard implements CanActivate {
loginServices:LoginserviceService;
decodeToken:any;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      var token = this.getCookie("oAuthToken");
      
      if(token!=null){
          this.decodeToken = this.getDecodedAccessToken(this.getCookie(
            "oAuthToken"));
            const expiryDate = new Date(+this.decodeToken.exp *1000);
            console.log(expiryDate);
            var dataAtual = new Date();
            if(dataAtual >= expiryDate){
              return false;
            }
        return true
    } 
    else {
      return false;
    }
    
  }
  public getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }
  public  getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
  
}
