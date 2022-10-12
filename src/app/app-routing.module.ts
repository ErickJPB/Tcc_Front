import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponentComponent } from './pages/home-component/home-component.component';
import { AppComponent } from './app.component';
import { MasterComponent } from './pages/master/master.component';
import { LoginComponent } from './pages/login/login.component';
import { CadUserComponent } from './pages/cad-user/cad-user.component';
import { RouterGuardGuard } from './shared/routerGuard/router-guard.guard';
import { CadProdutoComponent } from './pages/cad-produto/cad-produto.component';
import { CadEntradasComponent } from './pages/cad-entradas/cad-entradas.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';


const routes: Routes = [
  { path: "", component: LoginComponent ,
  children:[
    {
      path: "login", component:LoginComponent
    }
  ]

},
  {
   path: "home", 
  component: HomeComponentComponent,
  canActivate:[RouterGuardGuard],
  children: [
    {
      path:"cadUsuario",
      component: CadUserComponent,
    },
    {
      path:"Produtos",
      component:CadProdutoComponent,
    },
    {
      path:"entradas",
      component:CadEntradasComponent,
    },
    {
      path:"dashboard",
      component:DashboardComponent,
    }
  ]
  
  
 },
  
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,{
      
    })
  ],

  exports: [RouterModule]
})
export class AppRoutingModule { }
