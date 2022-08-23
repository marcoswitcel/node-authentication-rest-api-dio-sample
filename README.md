# Microserviço de Autenticação com NodeJS e TypeScript (Exemplo básico)

Esse repositório contém um implementação básica, meramente para estudo e prática, de uma sistema de autenticação com NodeJS.

## Ambiente de desenvolvimento

Lista de versões usadas, deve funcionar com algumas versões mais e e mais novas.

* NodeJS: 16.14.2
* TypeScript: 4.7.4

## Estrutura do projeto

* Pasta `src`: Nesta pasta você encontrará o código fonte da aplicação, escrito com [TypeScript](https://www.typescriptlang.org/).
* Pasta `dist`: Nesta pasta você encontrará a aplicação que será executada, ela é gerada a partir do código fonte. Para gerá-la execute o comando `npm run build`.

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
npm install --save-dev typescript
npm install --save-dev @types/node
npm install --save-dev @types/express
npm install --save-dev ts-node-dev
```

## Referências

* Link do curso na DIO: [https://web.dio.me/track/spring-framework-experience](https://web.dio.me/track/spring-framework-experience)
* Link do repositório referência disponibilizado pelo instrutor: [https://github.com/RenanJPaula/dio-node-user-authentication-api](https://github.com/RenanJPaula/dio-node-user-authentication-api)
