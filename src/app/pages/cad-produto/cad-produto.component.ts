import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { PoDynamicFormField, PoTableColumn, PoTableColumnLabel, PoModalComponent, PoTableColumnSort, PoTableColumnSortType, PoNotificationService, PoTableAction, PoTableComponent, PoTab } from '@po-ui/ng-components';
import { Produtos } from 'src/app/models/Produtos/produtos';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { take, finalize, map } from 'rxjs/operators';
import { ProdutosService } from 'src/app/services/produtos/produtos.service';
import { NgForm } from '@angular/forms';
import { trigger } from '@angular/animations';

@Component({
  selector: 'app-cad-produto',
  templateUrl: './cad-produto.component.html',
  styleUrls: ['./cad-produto.component.css']
})
export class CadProdutoComponent implements OnInit {
  @ViewChild(PoModalComponent, { static: true }) poModal: PoModalComponent;
  @ViewChild('iconTemplate', { static: true } ) iconTemplate : TemplateRef<void>;
  @ViewChild(PoTableComponent, { static: true }) poTable: PoTableComponent;
  
  showMoreDisabled: boolean = false
   produtos : Produtos={
  Id:0,
  Fabricante:"",
  dataCadastro:null,
  descricao:"",
  estoque:0,
  status:null,
  precoVenda:null
  }
 
   items: Array<any>;
   columns: Array<PoTableColumn>;
   listProdutos:Produtos[] =[];
   loading:boolean;
   dynamicForm:NgForm;
   idRegister:number;
   total: number = 0;
   detail: any;
   tab1:boolean=true;
   tab2:boolean=false;
   tabs: Array<PoTab> = [];
   nameBotao:string ="Salvar";
   DisableBotaoLimpar:boolean=true;
   // produtos: any;


  constructor( public poNotification: PoNotificationService,private router: Router, private service:ProdutosService ) {
 
   }

  ngOnInit(): void {
    this.columns  = this.getColumns();
   
  }
  oncLickLimpar(form: NgForm){
    this.retoreForm();
    this.DisableBotaoLimpar=true;
    this.nameBotao="Salvar";
  }

  onClickTab(tab: PoTab) {
      if(tab.label== "Novo cadastro"){
        this.tab2 =true;
        this.tab1 =false;
        
      }
      else{
        this.tab1 =true;
        this.tab2 =false;
        
      }
  }
  actions: Array<PoTableAction> = [
    { action: this.editar.bind(this), icon: 'po-icon-edit', label: 'Editar' },
    { action: this.visualizar.bind(this), icon: 'po-icon-info', label: 'Visualizar' },
    { action: this.remove.bind(this), icon: 'po-icon po-icon-delete', label: 'Remove' }
  ];
  discount(item) {
    if (!item.disableDiscount) {
      const updatedItem = { ...item, value: item.value - item.value * 0.2, disableDiscount: true };
      this.poTable.updateItem(item, updatedItem);
    }
  }
  visualizar(item){
    this.detail = item;
    this.poModal.open();
  }
  editar(item) {
    this.detail = item;
    console.log(this.detail)
    this.tab1=false;
    this.tab2=true;
    this.produtos = this.detail;
    if(this.produtos.Id >0){
      this.nameBotao="Alterar"
      this.DisableBotaoLimpar=false;
    }
  }
 
  remove(item) {
    this.poTable.removeItem(item);
    this.produtos = item;
    this.service.ExcluirProduto(this.produtos).
    pipe(
      take(1),
      finalize(()=>{})
    ).subscribe(x=>{
      this.poNotification.success(x["retorno"]);
    })

  }
   intevalo = setInterval( ()=>{
    this.items = this.getItems(); 
     
   },1000);


  
   private retoreForm(){
    this.produtos.Id=0;
    this.produtos.Fabricante="";
    this.produtos.dataCadastro=null;
    this.produtos.descricao="";
    this.produtos.estoque=0;
    this.produtos.status=null;
    this.produtos.precoVenda=null;
  }
  decreaseTotal(row: any) {
    if (row.value) {
      this.total -= row.value;
    }
  }

  getColumns(): Array<PoTableColumn> {
    return [
      { property: 'Id', type: 'number', width: '8%' },
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

  getItems(){
    this.service.getAllProdutos()
    .pipe(
      take(1),
      finalize(()=>{})
    ).subscribe(produtoList=>{
      this.listProdutos =[];
      produtoList.forEach(dados=>{
        this.listProdutos.push({
          Id:dados.Id, descricao:dados.descricao, estoque:dados.estoque,precoVenda:dados.precoVenda,
          status:dados.status, Fabricante:dados.Fabricante, dataCadastro:dados.dataCadastro
        })
      })
      this.loading =false;
    })
    return this.listProdutos;
  }



  public getForm(form: NgForm) {

    this.dynamicForm = form;
   console.log(this.produtos.Id)
    
    if (this.produtos.Id==0 ||this.produtos.Id ==null ) {
      this.produtos = this.dynamicForm.form.value;
      this.service.CreateProduto(this.produtos)
        .pipe(
          take(2),
          finalize(() => { })
        ).subscribe(x => {
          this.poNotification.success(x["retorno"]);
          
          this.idRegister = x["idRegister"];
          this.retoreForm();
          
        });
    }
    else{
      console.log(this.produtos.dataCadastro);
      
      this.service.UpdadeProduto(this.produtos)
      .pipe(
        take(1),
        finalize(()=>{})
      ).subscribe(x=>{
        this.poNotification.success(x["retorno"]);
        this.idRegister = x["idRegister"];
      })

    }
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
      property: "descricao",
      label: "Descricao",
      gridColumns: 10,
      gridSmColumns: 6,
      icon:'po-icon po-icon-stock'
    },

    {
      property: "Fabricante",
      label: "Fabricante",
      gridColumns: 8,
      gridSmColumns: 6,
      icon:"po-icon po-icon-manufacture"
    },
    {
      property: "precoVenda",
      label: "Preço de Venda",
      gridColumns: 2,
      gridSmColumns: 6,
      icon:"po-icon po-icon-finance"
    },
    {
      property: "estoque",
      label: "Estoque",
      gridColumns: 1,
      gridSmColumns: 6,
      icon:'po-icon po-icon-clipboard'
    },
    {
      property: "Status",
      label: "Status",
      gridColumns: 4,
      gridSmColumns: 6,
      options: [
        { label: 'Ativo', value: 1 },
        { label: 'Inativo', value: 2 },
      
      ]
    },
  ]

}
