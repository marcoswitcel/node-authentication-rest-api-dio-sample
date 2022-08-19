import express, { NextFunction, Request, Response } from 'express';

const app = express();

app.use('/status', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send({ foo: 'bar' });
});

app.listen(3000, () => {
    console.log('Aplicação executando na porta: ' + 3000);
})
