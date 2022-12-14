# Microsserviço de Autenticação escrito em TypeScript e rodando com NodeJS
## (Exemplo básico)

Esse repositório contém um implementação básica, meramente para estudo e prática, de uma sistema de autenticação com NodeJS.

## Ambiente de desenvolvimento

Lista de versões usadas, deve funcionar com algumas versões mais e e mais novas.

* NodeJS: 16.14.2
* TypeScript: 4.7.4

## Estrutura do projeto

* Pasta `src`: Nesta pasta você encontrará o código fonte da aplicação, escrito com [TypeScript](https://www.typescriptlang.org/).
* Pasta `dist`: Nesta pasta você encontrará a aplicação que será executada, ela é gerada a partir do código fonte. Para gerá-la execute o comando `npm run build`.
* Pasta `config`: Nesta pasta você encontrará um arquivo de configuração do projeto.

## Comando usados para inicializar e configurar o projeto

```bash
# Inicializando o projeto com o gerenciador NPM
npm init
# Instalando o TypeScript globalmente
npm install -g typescript
# Criando arquivo de configuração para o TypeScript
tsc --init

# Bibliotecas/Dependências
npm install --save express
npm install --save http-status-codes
npm install --save pg
npm install --save jsonwebtoken
npm install --save config
npm install --save-dev typescript
npm install --save-dev @types/node
npm install --save-dev @types/pg
npm install --save-dev @types/express
npm install --save-dev @types/jsonwebtoken
npm install --save-dev @types/config
npm install --save-dev tsconfig-paths
npm install --save-dev ts-node-dev
```

## Referências

* Link do curso na DIO: [https://web.dio.me/course/aplicando-o-estilo-arquitetural-rest-com-nodejs/learning/1faf1482-06fa-4552-aa29-d0fc5c594929](https://web.dio.me/course/aplicando-o-estilo-arquitetural-rest-com-nodejs/learning/1faf1482-06fa-4552-aa29-d0fc5c594929)
* Link do repositório referência disponibilizado pelo instrutor: [https://github.com/RenanJPaula/dio-node-user-authentication-api](https://github.com/RenanJPaula/dio-node-user-authentication-api)
* Página do Docker que explica um pouco sobre o comando `docker compose up` e os arquivos `docker-compose.yml`: [https://docs.docker.com/compose/](https://docs.docker.com/compose/)
* Página da imagem oficial do [PostgreSQL](https://www.postgresql.org/) no Docker Hub: [https://hub.docker.com/_/postgres](https://hub.docker.com/_/postgres)
* Um tutorial de referência que consultei para validar e entender melhor o setup com PostgreSQL: [https://geshan.com.np/blog/2021/12/docker-postgres/](https://geshan.com.np/blog/2021/12/docker-postgres/)
* Tipos utilitários do Typescript: [https://www.typescriptlang.org/docs/handbook/utility-types.html](https://www.typescriptlang.org/docs/handbook/utility-types.html)
* Explicação sobre Basic Authentication: [https://swagger.io/docs/specification/2-0/authentication/basic-authentication/#:~:text=Basic%20authentication%20is%20a%20very,%2Dencoded%20username%3Apassword%20string.](https://swagger.io/docs/specification/2-0/authentication/basic-authentication/#:~:text=Basic%20authentication%20is%20a%20very,%2Dencoded%20username%3Apassword%20string.)
* Página do NPM do pacote `tsconfig-paths` para mais explicações: [https://www.npmjs.com/package/tsconfig-paths](https://www.npmjs.com/package/tsconfig-paths)
