import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { QueryError } from '../errors/query.error';
import { userRepository } from '../repositories';

const usersRoute = Router();

usersRoute.get('/users', async (req: Request, res: Response, next: NextFunction) => {
    const users = await userRepository.findAll();
    res.status(StatusCodes.OK).send(users);
});

usersRoute.get('/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const { uuid } = req.params;
    try {
        const user = await userRepository.findById(uuid);
        res.status(user ? StatusCodes.OK : StatusCodes.NOT_FOUND)
            .send(user ? user : { message: `Usuário com uuid: '${uuid}' não encontrado `});
    } catch (error) {
        if (error instanceof QueryError) {
            res.status(StatusCodes.NOT_FOUND)
                .send({ message: `O uuid: '${uuid}' não é válido`});
        } else {
            next(error);
        }
    }
});

usersRoute.post('/users', (req: Request, res: Response, next: NextFunction) => {
    // @TODO pendente desenvolvimento
    const newUser = req.body;
    res.status(StatusCodes.CREATED).send(newUser);
});

usersRoute.put('/users/:uuid', (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    // @TODO pendente desenvolvimento
    const uuid = req.params.uuid;
    const user = req.body;
    res.status(StatusCodes.OK).send({ ...user, uuid });
});

usersRoute.delete('/users/:uuid', (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    // @TODO pendente desenvolvimento
    res.sendStatus(StatusCodes.OK);
});

export default usersRoute;
