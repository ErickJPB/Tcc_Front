import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoModule } from '@po-ui/ng-components';
import { RouterModule } from '@angular/router';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponentComponent } from './pages/home-component/home-component.component';
import { MasterComponent } from './pages/master/master.component';
import { LoginComponent } from './pages/login/login.component';
import { CadUserComponent } from './pages/cad-user/cad-user.component';
import { CadProdutoComponent } from './pages/cad-produto/cad-produto.component';
import { CadEntradasComponent } from './pages/cad-entradas/cad-entradas.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';



@NgModule({
  declarations: [
    HomeComponentComponent,
    MasterComponent,
    AppComponent,
    LoginComponent,
    CadUserComponent,
    CadProdutoComponent,
    CadEntradasComponent,
    DashboardComponent,

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PoModule,
    RouterModule.forRoot([]),
    PoTemplatesModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
