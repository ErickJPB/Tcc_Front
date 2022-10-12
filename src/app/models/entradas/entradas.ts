import { EntradaItems } from './entrada-items';


export class Entradas {
    Id:number
    NumeroNota:number;
    DataCadastro:Date;
    DataNota:Date;
    fornecedorId:number;
    ValorTotal:number;
    ChaveDeAcesso:string;
    items:EntradaItems[];
}


