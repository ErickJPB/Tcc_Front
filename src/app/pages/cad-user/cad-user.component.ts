import { Component, OnInit, ViewChild } from '@angular/core';

import {
  PoDynamicFormField,
  PoDynamicFormFieldChanged,
  PoDynamicFormValidation,
  PoNotificationService,
  PoTableColumn,
  PoSelectOption,
  PoMultiselectOption,
  PoModalComponent,
  PoNotification,
  PoNotificationModule,
  PoToasterType,
  PoDynamicFormLoad
} from '@po-ui/ng-components';
import { UserService } from 'src/app/services/UserService/user.service';
import { NgForm } from '@angular/forms';
import { CadUsers } from 'src/app/models/cad-users';
import { ServiceBaseService } from 'src/app/services/service-base.service';
import { take, finalize, map } from 'rxjs/operators';
import { EnumPermissao } from 'src/app/shared/Enums/enum-permissao';
import { EnumEdit } from 'src/app/shared/Enums/enum-edit';
import { uuid } from '@po-ui/ng-components/lib/utils/util';
import { PoPageDynamicSearchFilters, PoPageDynamicTableActions, PoPageDynamicTableCustomAction, PoPageDynamicTableCustomTableAction } from '@po-ui/ng-templates';
import { UserDtoResponse } from 'src/app/models/user-dto-response';


@Component({
  selector: 'app-cad-user',
  templateUrl: './cad-user.component.html',
  styleUrls: ['./cad-user.component.css']
})
export class CadUserComponent implements OnInit {
  @ViewChild('optionsForm', { static: true }) form: NgForm;
  @ViewChild(PoModalComponent, { static: true }) poModal: PoModalComponent;

  size;
  hiringProcesses: Array<UserDtoResponse>;
  hiringProcessesColumns: Array<PoTableColumn>;
  users: CadUsers;
  listUsers: UserDtoResponse[] = [];
  dadosSegmentoMultiselect: PoMultiselectOption[] = [];
  validateFields: Array<string> = ['email'];
  dynamicForm: NgForm;
  searchForm: NgForm;
  ngForm: NgForm;
  edit: boolean = false;
  PermissaoString: string;
  labelButton: string;
  private idRegister: string;
  IsNew:boolean=false;


  constructor(public poNotification: PoNotificationService, private registerService: UserService) { 
    
  }


  novoCad() {
    this.users = {
      nome: "",
      dataNascimento: null,
      cpf: "",
      email: "",
      endereco: "",
      estado: "",
      genero: "",
      number: "",
      password: "",
      cidade: "",
      permissao: "",
      telefone: ""
    }
    this.labelButton = "Salvar";
    this.idRegister = null;
    this.edit = false;
    this.IsNew =true;


  }

  public getForm(form: NgForm) {

    this.dynamicForm = form;
    this.users = this.dynamicForm.form.value;
    console.log(this.idRegister)
    if (this.idRegister == null) {

      this.registerService.CreateUser(this.users)
        .pipe(
          take(2),
          finalize(() => { })
        ).subscribe(x => {
          this.poNotification.success('Cadastro salvo com sucesso!');
          this.edit = true;
          this.idRegister = x["idRegister"];
          this.labelButton = "Alterar";
        });
    }
    else {
      console.log(this.idRegister)
      this.users.Id = this.idRegister.toString();
      console.log(this.users.Id);
      this.registerService.UpdateUser(this.users).
        pipe(
          take(1),
          finalize(() => { })
        ).subscribe(x => {
          this.showNotification(x["retorno"] , 1000, PoToasterType.Success);
        })
    }
  }
  public getvalue() {
    var teste2 = document.getElementById("dynamicForm");
    console.log(teste2);
  }

  public getSearch(form: NgForm) {
    this.searchForm = form.value;
    console.log(this.searchForm);
    this.getvalue();
  }
  fieldsSearch: Array<PoDynamicFormField> = [
    {
      property: 'filterUser',
      gridColumns: 6,
      gridSmColumns: 12,
      label: 'Pesquisa Usuario',
      optional: false,
      searchService: 'https://localhost:44386/v1/getUsers',
      columns: [
        { property: 'nome', label: 'Nome' },
        { property: 'email', label: 'e-mail' }
      ],
      format: ['Id', 'nome'],
      fieldLabel: 'nome',
      fieldValue: 'email',

    }
  ];

  fields: Array<PoDynamicFormField> = [
    {
      property: 'nome',
      divider: 'Dados Pessoais',
      required: true,
      disabled: this.IsNew,
      minLength: 4,
      maxLength: 50,
      gridColumns: 6,
      gridSmColumns: 12,
      order: 1,
      placeholder: 'informe seu nome'
    },
    {
      property: 'dataNascimento',
      
      label: 'Data de nascimento',
      type: 'date',
      format: 'mm/dd/yyyy',
      gridColumns: 6,
      gridSmColumns: 12,
      maxValue: '2010-01-01',
      errorMessage: 'The date must be before the year 2010.',
      order: -1
    },
    { property: 'cpf', required: true, label: 'CPF', mask: '999.999.999-99', gridColumns: 6, gridSmColumns: 12, visible: false },
    { property: 'cnpj', label: 'CNPJ', mask: '99.999.999/9999-99', gridColumns: 6, gridSmColumns: 12, visible: false },
    { property: 'genero', label: "Gênero", gridColumns: 6, gridSmColumns: 12, options: ['Homem', 'Mulher', 'Outro'], order: 2 },

    {
      property: 'password',
      
      label: 'Senha secreta',
      gridColumns: 6,
      required: true,
      secret: true,
      pattern: '[a-zA]{5}[Z0-9]{3}',
      errorMessage: 'deve conter  5 letras e  3 números',
      placeholder: 'Defina sua senha'
    },
    {
      property: 'email',
      
      label: "E-mail",
      divider: 'Contato',
      required: true,
      gridColumns: 6,
      icon: 'po-icon-mail',
      pattern: '[@]{1}',
      errorMessage: 'Deve ser um e-mail',
    },
    { property: 'telefone', label: "Telefone", mask: '(99) 99999-9999', gridColumns: 6 },
    { property: 'endereco', label: "Endereço",  gridColumns: 6 },
    {
      property: 'number',
      
      label: 'Número',
      type: 'number',
      gridColumns: 6,
      maxValue: 10000,
      errorMessage: 'Numero Inválido'
    },
    {
      property: 'estado',
      
      label: "Estado",
      gridColumns: 6,
      options: [
        { label: 'Santa Catarina', value: 1 },
        { label: 'São Paulo', value: 2 },
        { label: 'Rio de Janeiro', value: 3 },
        { label: 'Minas Gerais', value: 4 }
      ]
    },
    { property: 'cidade',  label: 'Cidade',  gridColumns: 6 },

    {
      property: 'permissao',
      
      label: 'Permissão',
      divider: 'Permissões',
      required: true,
      gridColumns: 6,
      gridSmColumns: 12,
      optional: false,
      options: [
        { label: 'Administrador', value: 1 },
        { label: 'Gerente', value: 2 },
        { label: 'Operacional', value: 3 },
        { label: 'Pdv', value: 4 }],
      optionsMulti: false
    },

  ];



  ngOnInit() {
    this.users = {
      nome: "",
      dataNascimento: null,
      cpf: "",
      email: "",
      endereco: "",
      estado: "",
      genero: "",
      number: "",
      password: "",
      cidade: "",
      permissao: "",
      telefone: ""
    }
    this.labelButton = "Salvar";
    this.size = "auto";
    this.IsNew =false;

  }

  onChangeFields(changedValue: PoDynamicFormFieldChanged): PoDynamicFormValidation {
    console.log(changedValue.value.estado);
    return {
      value: { cidade: undefined },
      fields: [
        {
          property: 'cidade',
          gridColumns: 6,
          options: this.registerService.getCity(changedValue.value.estado),
          disabled: false
        }
      ]
    };

  }

  onLoadFields(value: any) {
    return this.registerService.getUserDocument(value);

  }



  public readonly filters: Array<PoPageDynamicSearchFilters> = [
    { property: 'email', gridColumns: 6 },
    { property: 'id', gridColumns: 6 },
    { property: 'cpf', gridColumns: 6 }
  ];

  getColumns(): Array<PoTableColumn> {
    return [
      {
        property: 'nome',
        label: 'Nome',
      },
      { property: 'email', label: 'E-mail', type: 'string' },
      { property: 'cpf', label: 'Cpf' },
      { property: 'RolesId', label: 'Tipo de usuario', type: 'string' },
      { property: 'Id', label: 'Id' },

    ];
  }
  isHideLoading: boolean;
  getItems() {
    this.registerService.GetAllUser()
      .pipe(
        take(1),
        finalize(() => { this.isHideLoading = true }
        )
      ).subscribe(userlist => {

        userlist.forEach(dados => {
          this.returnPermissaoString(dados)
          this.listUsers.push(
            {
              nome: dados.nome, email: dados.email, cpf: dados.cpf, Id: dados.Id, RolesId: this.PermissaoString,
              Genero: dados.Genero, cidade: dados.cidade, datanascimento: dados.datanascimento, estado: dados.estado
              , number: dados.number, endereco: dados.endereco, Password: dados.Password
            })


        });
      })

    return this.listUsers;
  };

  public clickbtnPesquisar() {
    this.hiringProcessesColumns = this.getColumns();
    this.listUsers = [];
    this.isHideLoading = false;
    this.hiringProcesses = this.getItems();
  }

  public Confirm() {
    this.poModal.close();
    this.SelectedUser()
  }

  private SelectedUser() {
    const selecttedUser = this.hiringProcesses.find(user => user['$selected']);
    var message = "Usuário " + selecttedUser.nome + " Selecionado"
    this.showNotification(message, 1500, PoToasterType.Success)
    this.users = {
      nome: selecttedUser.nome,
      dataNascimento: new Date(selecttedUser.datanascimento.toString()),
      cpf: selecttedUser.cpf,
      email: selecttedUser.email,
      endereco: selecttedUser.endereco,
      estado: selecttedUser.estado,
      genero: selecttedUser.Genero,
      number: selecttedUser.number,
      password: selecttedUser.Password,
      cidade: selecttedUser.cidade,
      permissao: this.returnPermissaoInt(selecttedUser),
      telefone: ""

    }
    if (selecttedUser.Id != null) {
      this.labelButton = "Alterar";
      this.edit = true;
      this.idRegister = selecttedUser.Id;

    }
  }
  public restaurarGeneroInt(dados) {
    var genero: number;
    switch (dados.Genero) {
      case "Homem":
        genero = 1
        break;
      case "Mulher":
        genero = 2;
        break
      default:
        genero = 3;
    }
    return genero;
  }

  public returnPermissaoString(dados) {
    switch (dados.RolesId) {
      case "1":
        this.PermissaoString = "Adminstrador";
        break;
      case "2":
        this.PermissaoString = "Gerente";
        break;
      case "3":
        this.PermissaoString = "Operacional";
        break;
      default:
        this.PermissaoString = "Pdv";
    }

  }

  public returnPermissaoInt(dados) {
    switch (dados.RolesId) {
      case "Adminstrador":
        this.PermissaoString = "1";
        break;
      case "Gerente":
        this.PermissaoString = "2";
        break;
      case "Operacional":
        this.PermissaoString = "3";
        break;
      default:
        this.PermissaoString = "4";
    }
    return this.PermissaoString;

  }

  showNotification(message, duration, type) {
    const poNotification: PoNotification = {
      message: message,
      orientation: undefined,
      action: undefined,
      actionLabel: '',
      duration: duration
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


}