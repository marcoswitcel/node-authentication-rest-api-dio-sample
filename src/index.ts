import express, { NextFunction, Request, Response } from 'express';
import usersRoute from './routes/users.route';

const app = express();

// Configurações
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cadastrando rotas
app.use(usersRoute);

app.use('/status', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send({ status: 'UP' });
});


// Inicializando o servidor
app.listen(3000, () => {
    console.log('Aplicação executando na porta: ' + 3000);
})
