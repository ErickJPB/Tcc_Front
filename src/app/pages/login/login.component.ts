import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take, finalize } from 'rxjs/operators';
import { PoNotificationService } from '@po-ui/ng-components';
import { PoPageLogin, PoPageLoginAuthenticationType, PoModalPasswordRecoveryType } from '@po-ui/ng-templates';

import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { LoginserviceService } from 'src/app/services/loginservice/loginservice/loginservice.service';
import { ServiceBaseService } from 'src/app/services/service-base.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}
authenticationType: PoPageLoginAuthenticationType.Basic;

user: User;
constructor(
  private poNotification: PoNotificationService,
  private router: Router,
  private serviceLogin: LoginserviceService,
  

) {
  
}
Autenticar(formData: PoPageLogin) {
  this.user = { login: formData.login, password: formData.password, remeberUser: formData.rememberUser.toString() };
  this.serviceLogin.postUser(this.user)
    .pipe(
      take(1),
      finalize(()=> {})
    )
    .subscribe(x => {
      this.poNotification.success("Autenticado com sucesso.");
      var obj = {
        user: x["user"],
        token: x["token"]
     };
      JSON.stringify(obj);
      this.setCookie("oAuthToken",  JSON.stringify(obj), 1);
      this.router.navigate([`/home/dashboard`])
    },
      error => {
      })
}



ngOnInit() {
 
}
setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}



}
