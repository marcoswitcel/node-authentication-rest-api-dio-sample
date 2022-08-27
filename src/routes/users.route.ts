import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { userRepository } from '../repositories';

const usersRoute = Router();

usersRoute.get('/users', async (req: Request, res: Response, next: NextFunction) => {
    const users = await userRepository.findAll();
    res.status(StatusCodes.OK).send(users);
});

usersRoute.get('/users/:uuid', (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    // @TODO pendente desenvolvimento
    res.status(StatusCodes.OK).send(req.params.uuid);;
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
