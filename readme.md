# Desafio BackEnd - NodeJS - OW Interactive 2020

## Sobre a OW Interactive

Fazemos parte do universo digital, focada em criar e desenvolver experiências interativas, integrando planejamento, criatividade e tecnologia. Conheça mais sobre nós em: [OW Interactive - Quem somos](http://www.owinteractive.com/quem-somos/).

## Pré-requisitos

- Javascript (ES6+);
- Banco de dados MariaDB, MySQL
- Servidor Nginx
- Conhecimentos sobre REST;
- Conhecimentos de Git.

## Desafio

### Etapa 1 - Cadastro de Usuarios

- Implementar endpoints para cadastro, edição e exclusão de usuarios.
- Implementar endpoint que liste todos os usuarios com possibilidade de busca por palavra chave (buscar no nome ou email)
- Implementar endpoints de login e logout.
- Implementar recuperação de senha por e-mail.

### Etapa 2 - Cadastro de Categorias/Produtos

- Implementar endpoints para cadastro, edição e exclusão de categorias.
- Implementar endpoint para listagem de categorias e os produtos dessas categorias com possibilidade de busca pelo nome da categoria ou de um produto que pertença a ela.
- Implementar endpoints para cadastro, edição e exclusão de produtos.
- Implementar endpoint para listagem de todos os produtos
- Implementar endpoint para adicionar ou remover saldo no estoque do produto
- Todo produto cadastrado precisa obrigatoriamente pertencer a uma categoria.
- Um categoria que possuir produtos não pode ser excluida.

### Etapa 3 - Cadastro/Cancelamento de Vendas

- Implementar endpoints para realizações de pedidos de venda
- Toda venda cadastrada deve subtrair a quantidade comprada do produto em seu estoque
- Implementar endpoint para cancelamento de pedidos de venda
- Ao cancelar um pedido o estoque do produto deve ser devolvido
- Um produto com pedido de venda não pode ser excluido.
- Listar todos os pedidos de venda trazendo todos os produtos e o total da venda com filtro por data de inicio e fim

### Etapa 4 - Autorização de usuários.

- Criar usuarios de dois tipos, Administradores e Clientes.
- Os usuarios Administradores tem acesso a todos os endpoints
- Os usuarios Clientes tem acesso a listagem de produtos e categorias
- Os usuarios Clientes não podem cadastrar, alterar ou excluir categorias e produtos
- Os usuarios Clientes podem fazer e cancelar vendas
- Ao listar as vendas logado como usuario exibir apenas as que foram feitas por ele

### Etapa 5 - Cliente para integração.

- Criar uma aplicação vue para integração dos dados
- Criar uma tela para cadastro, login, cadastro de categoria, de produtos e de venda
- Não é necessário criar um layout especifico pode usar um framework para agilizar (ex: bootstrap)

## Diferencial

- Documentação dos endpoints
- Uso de Query Scopes e Hooks do AdonisJS

## Conclusão

- Usar javascript ES6+
- Usar o AdonisJS (adonisjs.com)
- Validar todos os cadastros (min/max caracteres, tipos string/number, required, etc)

## Conclusão

Crie um fork e submeta ao Github o seu desafio. Após isso envie um e-mail para [letsrock@owinteractive.com](mailto:letsrock@owinteractive.com), com o assunto [DESAFIO FRONT-END] com o link para o seu desafio. Obrigado por participar e boa sorte =)
