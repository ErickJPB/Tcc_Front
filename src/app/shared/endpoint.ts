export class ConfigApi {
    static ConfigPath = 'assets/config.json';
}

export class Endpoint {
    static Autenticacao="login";
    static CriarUsuario="CreateUser";
    static GetAllUsers="getUsers";
    static UpdateUser="updateUser";
    static GetAllProdutos="getProdutos";
    static GetProdutosIdOuDescricao="GetProdutosIdOuDescricao";
    static CreateProduto="creteProduto";
    static UpdateProduto="updateProduto";
    static ExcluirProduto='excluirProduto';
    static GetAllEntradas="buscarEntradas";
    static InsertEntradas="InsertEntradas";
}
