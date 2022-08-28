import express from 'express';
import globalErrorHandler from './middlewares/global-error-handler.middleware';
import statusRoute from './routes/status.route';
import usersRoute from './routes/users.route';

const app = express();

// Configurações
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cadastrando rotas
app.use(statusRoute);
app.use(usersRoute);

// Configurando error handler
app.use(globalErrorHandler);

// Inicializando o servidor
app.listen(3000, () => {
    console.log('Aplicação executando na porta: ' + 3000);
})
