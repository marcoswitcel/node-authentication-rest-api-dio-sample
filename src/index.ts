import express from 'express';
import databaseConnection from './data-source/database-connection';
import globalErrorHandler from './middlewares/global-error-handler.middleware';
import authorizationRoute from './routes/authorization.route';
import statusRoute from './routes/status.route';
import usersRoute from './routes/users.route';

const app = express();

// Configurações
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cadastrando rotas
app.use(statusRoute);
app.use(usersRoute);
app.use(authorizationRoute);

// Configurando error handler
app.use(globalErrorHandler);

// Inicializando o servidor
const server = app.listen(3000, () => {
    console.log('Aplicação executando na porta: ' + 3000);
});

// Operações executadas no encerramento do programa
process.on('SIGTERM', () => {
    databaseConnection.end(() => {
        console.log('Conexão com a base de dados encerrada!');
    });
    server.close(() => {
        console.log('Aplicação encerrada');
    });
});
