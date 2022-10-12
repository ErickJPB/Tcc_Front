import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { PoTableColumn, PoTableAction, PoModalComponent, PoDynamicFormField, PoNotification, PoToasterType, PoNotificationService } from '@po-ui/ng-components';

import { PoPageDynamicSearchFilters } from '@po-ui/ng-templates';
import { take, finalize, map } from 'rxjs/operators';
import { EntradaserviceService } from 'src/app/services/entradaservice/entradaservice.service';
import { Entradas } from 'src/app/models/entradas/entradas';
import { EntradaItems } from 'src/app/models/entradas/entrada-items';
import { Produtos } from 'src/app/models/Produtos/produtos';
import { UntypedFormGroup, UntypedFormBuilder, Validators, NgForm } from '@angular/forms';
import { ProdutosService } from 'src/app/services/produtos/produtos.service';
import { ProdutoPesquisarRequestDto } from 'src/app/models/Produtos/produto-pesquisar-request-dto';
import { async } from '@angular/core/testing';
import { EntradaSelectItem } from 'src/app/models/entradas/entrada-select-item';

@Component({
  selector: 'app-cad-entradas',
  templateUrl: './cad-entradas.component.html',
  styleUrls: ['./cad-entradas.component.css']
})
export class CadEntradasComponent implements OnInit {
  
  @ViewChild(PoModalComponent, { static: true }) poModal: PoModalComponent;

  @ViewChild('barrasId') el:ElementRef;
  

  columns: Array<PoTableColumn>;
   Entradas: Array<any>;
   EntradasForm: Entradas[];
   EntradaItems:Array<any>;
   EntradaItemsView :EntradaItems[];
   loading:boolean;
   actionsRight = true;
   dynamicForm:NgForm;
   quickSearchWidth: number = 3;
   itemView: Entradas[];
   columnsProdutosPesquisa: Array<PoTableColumn>;
   columnsProdutosgrade:Array<PoTableColumn>;
   itemsProdutos:Produtos[];
   barras:string;
   descricao:string;
   modalteste:PoModalComponent;
   listProdutos:EntradaSelectItem[] =[];
   idRegister:number;

  constructor(public poNotification: PoNotificationService,private entradaService :EntradaserviceService ,private produtoService:ProdutosService) { 

     
  }

 
  public readonly filters: Array<PoPageDynamicSearchFilters> = [
    { property: 'numeroNota', gridColumns: 6 },
    { property: 'descricao', gridColumns: 6 },
    { property: 'fornecedor', gridColumns: 6 }
  ];

  ngOnInit(): void {
    this.columns = this.getColumns();
    this.columnsProdutosPesquisa =this.getColumnsProdutosPesquisa();
    this.columnsProdutosgrade=this.getColumnsProdutosGrade();
    
  }
Confirm(){
  this.poModal.close();
}
  actions: Array<any> = [
    { action: this.visualizar.bind(this), icon: 'po-icon-info', label: 'Visualizar' },
    { action: this.remove.bind(this), icon: 'po-icon po-icon-delete', label: 'Cancelar' }
  ];

  visualizar(item){
    const list = [];
    list.push(item);
    this.itemView = list;
    this.EntradaItemsView = this.EntradaItems.filter(x =>x.EntradasId ===item.Id);
    console.log(this.EntradaItemsView);
      this.poModal.open();
  }
  remove(item){

  }
  decreaseTotal(row: any) {
    if (row.value) {
      //this.total -= row.value;
    }
  }
  intevalo = setInterval( ()=>{
    this.Entradas = this.getItems(); 
   },1000);

  getColumns(): Array<PoTableColumn> {
    return [
      { property: 'DataNota', label:'Data Documento', type: 'dateTime', width: '12%' },
      { property: 'NumeroNota', label:'Nota Fiscal', type: 'number', width: '8%' },
      { property: 'fornecedor' , label:'Fornecedor' ,width: '40%'},
      { property: 'DataCadastro', label: 'Data Cadastro', type: 'dateTime', visible:true },
     
      
    ];
  }

  getItems(){
    this.entradaService.getAllEntradas()
    .pipe(
      take(2),
      finalize(()=>{})
    ).subscribe(entradaList=>{
      this.Entradas =[];
      this.EntradaItems =[];
      entradaList.forEach(dados=>{
        if(dados ==null) this.Entradas =[];
        else{
        this.Entradas.push({
          Id:dados.Id, NumeroNota:dados.NumeroNota,
          DataCadastro:dados.DataCadastro, DataNota: dados.DataNota ,fornecedorId:dados.fornecedorId,
          ValorTotal:dados.ValorTotal, items:dados.items
        })

       dados.items.forEach(element => {
        this.EntradaItems.push({
          Id:element.Id, EntradasId:element.EntradasId, ProdutosId:element.ProdutoId,
          PrecoCompra:element.precoCompra, quantidade:element.quantidade , name:"Produtos"
        })
      
       });
        };
      })
    })
    return this.Entradas;
  }
  fields: Array<PoDynamicFormField> = [
    {
      property: "Id",
      label: "Codigo id",
      gridColumns: 1,
      gridSmColumns: 6,
      disabled: true,
      key:true,
      type:"number"
    },
    {
      property: "ChaveDeAcesso",
      label: "Chave de acesso",
      gridColumns: 10,
      gridSmColumns: 6,
      icon:'po-icon po-icon-stock'
    },
      {
      property: "NumeroNota",
      label: "Numero da nota",
      gridColumns: 2,
      gridSmColumns: 4,
      
    },
    {
      property: 'Fornecedor',
      label: "fornecedor",
      gridColumns: 6,
      options: [
        { label: 'EuroFarma', value: 1 },
        { label: 'Solfarma', value: 2 },
        { label: 'EMS', value: 3 },
        { label: 'GERMED', value: 4 }
      ],
      optionsMulti: true
    },
    {
      property: "ValorTotal",
      label: "Valor total da nota",
      gridColumns: 2,
      gridSmColumns: 6,
      icon:"po-icon po-icon-finance"
    },
   
    {
      property: "DataNota",
      label: "Data Emissão",
      gridColumns: 4,
      gridSmColumns: 6,
      type: 'date',
      format: 'mm/dd/yyyy',
    }
  ]

  getColumnsProdutosGrade(): Array<PoTableColumn> {
    return [
      { property: 'ProdutoId', type: 'number', width: '8%' },
      { property: 'Descricao' , label:'Descrição'},
      { property: 'precoCompra' ,  label:'Preço de compra'},
      { property: 'quantidade', label: 'Quantidade', type: 'number', width: '15%', visible: true },
    ];
  }
  getColumnsProdutosPesquisa(): Array<PoTableColumn> {
    return [
      { property: 'ProdutoId', type: 'number', width: '8%' },
      { property: 'descricao' , label:'Descrição'},
      { property: 'Fabricante' , label:'Fabticante'},
      { property: 'precoVenda' ,  label:'Preço de Venda'},
      { property: 'dataCadastro', label: 'Data Cadastro', type: 'dateTime', visible:true },
      { property: 'estoque', label: 'Estoque', type: 'number', width: '15%', visible: true },
      
      {
        property: 'status',
        type: 'boolean',
        width: '8%',
        labels: [
          { value: 'true', color: 'color-11', label: 'Ativo' },
          { value: 'false', color: 'color-08', label: 'Inativo' },
          
        ]
      }
    ];
  }

  onClick(barras,descricao ) {

  var request :ProdutoPesquisarRequestDto={
    codigo:barras ,
    descricao: descricao
   }; 
   if(request.codigo ==null || request.codigo ==+"") request.codigo=0;
   console.log(request);
   this.itemsProdutos=  this.getProdutos(request);
console.log(this.itemsProdutos);
  
  }

  abrirModal(modal){
    this.modalteste = modal;
    this.modalteste.open();
  }

  
  ConfirmModalProdutos(quantidade, precoCompra){
    this.SelectedUser(quantidade,precoCompra);
    
  this.modalteste.close();
  }

  getProdutos(request :ProdutoPesquisarRequestDto){
    this.produtoService.getProdutosIdOuDescricao(request)
    .pipe(
      take(1),
      finalize(()=>{})
    ).subscribe(produtoList=>{
     
      this.itemsProdutos =[];
      produtoList.forEach(dados=>{
        this.itemsProdutos.push({
          Id:dados.Id, descricao:dados.descricao, estoque:dados.estoque,precoVenda:dados.precoVenda,
          status:dados.status, Fabricante:dados.Fabricante, dataCadastro:dados.dataCadastro
        })
      })
      this.loading =false;
    })

    return this.itemsProdutos;
  }

  private SelectedUser(quantidade, precoCompra) {
    quantidade ==null? 0: quantidade;
    precoCompra ==null? 0 :precoCompra;
    const selecttedProd = this.itemsProdutos.find(produtos => produtos['$selected']);
    var message = "Produto  " + selecttedProd.descricao + " adicionado"
   
    var entradaSelectItem : EntradaSelectItem ={
        ProdutoId : selecttedProd.Id,
        Descricao : selecttedProd.descricao,
        precoCompra : precoCompra,
        quantidade :quantidade,
    };
    var PrdutoJaInserido = this.listProdutos.filter(x=>x.ProdutoId===selecttedProd.Id);
    if(PrdutoJaInserido.length >0){
      var message = "Produto  " + selecttedProd.descricao + " já inserido."
      this.showNotification(message, 1500, PoToasterType.Warning)
    }
    else {
    this.listProdutos.push(entradaSelectItem);
    this.showNotification(message, 1500, PoToasterType.Success)
    }
  }
  showNotification(message, duration, type) {
    const poNotification: PoNotification = {
      message: message,
      orientation: undefined,
      action: undefined,
      actionLabel: '',
      duration: duration,

      
      
    };
    switch (type) {
      case PoToasterType.Success: {
        this.poNotification.success(poNotification);
        break;
      }
      case PoToasterType.Error: {
        this.poNotification.error(poNotification);
        break;
      }
      case PoToasterType.Warning: {
        this.poNotification.warning(poNotification);
        break;
      }
      case PoToasterType.Information: {
        this.poNotification.information(poNotification);
        break;
      }
      default: {
        this.poNotification.success(poNotification);
        break;
      }
    }
}

getForm(form: NgForm){
this.dynamicForm = form;
var EntradasModel : Entradas ;
EntradasModel =  this.dynamicForm.form.value;

alert(this.listProdutos.length)
if(this.listProdutos.length <= 0){
  var message = "Por favor inclua ao menos um item!"
this.showNotification(message, 1500, PoToasterType.Warning)
return null;
}
else{
this.listProdutos.forEach(dados=>{
  var entradaItemsModel: EntradaItems={
    ProdutoId : dados.ProdutoId,
    precoCompra: dados.precoCompra,
    quantidade: dados.quantidade,
    Id : null,
    EntradasId: null
  }
  EntradasModel.items =[];
  EntradasModel.items.push(entradaItemsModel);

});

 this.entradaService.InsertEntradas(EntradasModel)
        .pipe(
          take(2),
          finalize(() => { })
        ).subscribe(x => {
          this.poNotification.success(x["retorno"]);
          
          this.idRegister = x["idRegister"];
          //this.retoreForm();
          
        });
      }
}
}
