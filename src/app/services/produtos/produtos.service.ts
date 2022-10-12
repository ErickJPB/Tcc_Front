import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceBaseService } from '../service-base.service';
import { Observable } from 'rxjs';
import { Produtos } from 'src/app/models/Produtos/produtos';
import { Endpoint } from 'src/app/shared/endpoint';
import { map } from 'rxjs/operators';
import { ProdutoPesquisarRequestDto } from 'src/app/models/Produtos/produto-pesquisar-request-dto';
import { request } from 'express';


@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  constructor(private _http: HttpClient,
    public injector: Injector,
    private servicebase: ServiceBaseService,
  ) {
    this.servicebase.GetApiBase();
  }

  public  getEndpointProdutos(){
    return this.servicebase.apiURL  +  Endpoint.GetAllProdutos 
  }
  public getAllProdutos():Observable<Produtos[]>{
    this.servicebase.GetApiBase();     
    return this._http.get<Produtos[]>(this.servicebase.apiURL  +  Endpoint.GetAllProdutos , this.servicebase.httpOptions)
    .pipe(                             
      map(this.extrairRespostaItem));
  }

  public getProdutosIdOuDescricao(request: ProdutoPesquisarRequestDto){
    this.servicebase.GetApiBase();     
    return this._http.post<Produtos[]>(this.servicebase.apiURL  +  Endpoint.GetProdutosIdOuDescricao ,JSON.stringify(request), this.servicebase.httpOptions)
    .pipe(                             
      map(this.extrairRespostaItem));
  }
  public CreateProduto(produtos:Produtos):Observable<Produtos>{
        return this._http.post<Produtos>(this.servicebase.apiURL + Endpoint.CreateProduto, JSON.stringify(produtos),this.servicebase.httpOptions)
  }

  public UpdadeProduto(produtos:Produtos):Observable<Produtos>{
    return this._http.put<Produtos>(this.servicebase.apiURL + Endpoint.UpdateProduto , JSON.stringify(produtos), this.servicebase.httpOptions)
  }

  public ExcluirProduto(produtos:Produtos):Observable<Produtos>{
    return this._http.post<Produtos>(this.servicebase.apiURL + Endpoint.ExcluirProduto, JSON.stringify(produtos), this.servicebase.httpOptions)
  }

  protected extrairRespostaItem(resposta: any) {
    return resposta.items || {};
  }


}
