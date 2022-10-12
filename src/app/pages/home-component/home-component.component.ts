import { Component, OnInit } from '@angular/core';
import { PoDialogService, PoMenuPanelItem, PoToolbarAction, PoNotificationService, PoToolbarProfile, PoSelectOption } from '@po-ui/ng-components';
import { Router, ActivatedRoute } from '@angular/router';
import { ProdutosService } from 'src/app/services/produtos/produtos.service';
import { take, finalize, map } from 'rxjs/operators';
import { Produtos } from 'src/app/models/Produtos/produtos';


@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
   providers: [PoDialogService],

})

export class HomeComponentComponent implements OnInit {
  constructor( private activatedRoute: ActivatedRoute,private router: Router, private poAlert: PoDialogService , private service:ProdutosService, private poDialog: PoDialogService, private poNotification: PoNotificationService) { }
  

  ngOnInit(): void {
    
    
  }
  
  title: string = '';
  

  public readonly menuItems: Array<PoMenuPanelItem> = [
    { label: 'Inicio', action: this.changeTitle.bind(this), icon: 'po-icon-home' },
    { label: 'Usuário', action: this.changeTitle.bind(this), icon: 'po-icon-user' },
    { label: 'Produtos', action: this.changeTitle.bind(this), icon: 'po-icon po-icon-stock'},
    { label: 'Finaceiro', action: this.changeTitle.bind(this), icon: 'po-icon-money' },
    { label: 'Entradas', action: this.changeTitle.bind(this), icon: 'po-icon-news' },
    { label: 'Configurações', action: this.changeTitle.bind(this), icon: 'po-icon-settings' }
  ];

  changeTitle(menu: PoMenuPanelItem) {
    this.title = menu.label;
    switch(menu.label){
      case "Usuário":
        this.router.navigate(['home/cadUsuario']);
        break;
        case "Produtos":
          this.router.navigate(['home/Produtos']);
          break;
        case "Entradas":
          this.router.navigate(['home/entradas']);
          break;
        default:
          this.router.navigate(['home/dashboard']);
    }
   
   
  }
  notificationActions: Array<PoToolbarAction> = [
  
    { icon: 'po-icon-message', label: 'Nova Mensagem', type: 'danger', action: item => this.openDialog(item) }
  ];

  onClickNotification(item: PoToolbarAction) {
    window.open('https://github.com/po-ui/po-angular/blob/master/CHANGELOG.md', '_blank');

    item.type = 'default';
  }
   openDialog(item: PoToolbarAction) {
    this.poDialog.alert({
      title: 'Bem-Vindo',
      message: `Seja Bem vindo ao EasyMarket`,
      ok: undefined
    });

    item.type = 'default';
  }
  profile: PoToolbarProfile = {
    avatar: 'https://via.placeholder.com/48x48?text=AVATAR',
    title: this.getCookie("oAuthToken")["nome"]
  };
  profileActions: Array<PoToolbarAction> = [
    { icon: 'po-icon-user', label: 'Dados Usuario', action: item => this.showAction(item) },
    { icon: 'po-icon-company', label: 'Dados Empresa', action: item => this.showAction(item) },
    { icon: 'po-icon-settings', label: 'Configurações', action: item => this.showAction(item) },
    { icon: 'po-icon-exit', label: 'Sair', type: 'danger', separator: true, action: item => this.showAction(item) }
  ];

 
  showAction(item: PoToolbarAction): void {
    if(item.label==="Sair"){
      document.cookie = "test=;expires=" + new Date(0).toUTCString()
      this.router.navigate(['login']);
    }
    //this.poNotification.success(`Action clicked: ${item.label}`);
  }
    getNotificationNumber() {
    return this.notificationActions.filter(not => not.type === 'danger').length;
  }



  public  getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0){  
             return JSON.parse(c.substring(nameEQ.length,c.length))["user"];}
    }
    return null;
}


 
}
