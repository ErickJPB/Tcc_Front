import { Injectable, Injector, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceBaseService } from '../service-base.service';
import { Observable } from 'rxjs';
import { Produtos } from 'src/app/models/Produtos/produtos';
import { Endpoint } from 'src/app/shared/endpoint';
import { map } from 'rxjs/operators';
import { ProdutoPesquisarRequestDto } from 'src/app/models/Produtos/produto-pesquisar-request-dto';
import { request } from 'express';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class ProdutosService implements OnInit {

  constructor(private _http: HttpClient,
    public injector: Injector,
    private cookie: CookieService
  ) {
   
  }

  private servicebase =new ServiceBaseService(this._http,this.cookie)

  ngOnInit(){
    this.servicebase.GetApiBase();
  }

  public  getEndpointProdutos(){
	const url = "https://easymarketserviceapi20221208192441.azurewebsites.net/v1/";	  
    return url  +  Endpoint.GetAllProdutos 
  }
  public getAllProdutos():Observable<Produtos[]>{
    const url = "https://easymarketserviceapi20221208192441.azurewebsites.net/v1/";
	this.servicebase.GetApiBase();     
    return this._http.get<Produtos[]>(url  +  Endpoint.GetAllProdutos , this.servicebase.httpOptions)
    .pipe(                             
      map(this.extrairRespostaItem));
  }

  public getProdutosIdOuDescricao(request: ProdutoPesquisarRequestDto){
	const url = "https://easymarketserviceapi20221208192441.azurewebsites.net/v1/";	  
    this.servicebase.GetApiBase();     
    return this._http.post<Produtos[]>(url  +  Endpoint.GetProdutosIdOuDescricao ,JSON.stringify(request), this.servicebase.httpOptions)
    .pipe(                             
      map(this.extrairRespostaItem));
  }
  public CreateProduto(produtos:Produtos):Observable<Produtos>{
	const url = "https://easymarketserviceapi20221208192441.azurewebsites.net/v1/";	  
        return this._http.post<Produtos>(url + Endpoint.CreateProduto, JSON.stringify(produtos),this.servicebase.httpOptions)
  }

  public UpdadeProduto(produtos:Produtos):Observable<Produtos>{
	const url = "https://easymarketserviceapi20221208192441.azurewebsites.net/v1/";	  
    return this._http.put<Produtos>(url + Endpoint.UpdateProduto , JSON.stringify(produtos), this.servicebase.httpOptions)
  }

  public ExcluirProduto(produtos:Produtos):Observable<Produtos>{
	const url = "https://easymarketserviceapi20221208192441.azurewebsites.net/v1/";	  
    return this._http.post<Produtos>(url + Endpoint.ExcluirProduto, JSON.stringify(produtos), this.servicebase.httpOptions)
  }

  protected extrairRespostaItem(resposta: any) {
    return resposta.items || {};
  }


}
