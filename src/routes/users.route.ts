import { NextFunction, Request, Response, Router } from 'express';

const usersRoute = Router();

usersRoute.get('/users', (req: Request, res: Response, next: NextFunction) => {
    const users = [{}];
    res.status(200).send(users);
});

usersRoute.get('/users/:uuid', (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    res.status(200).send(req.params.uuid);;
});

export default usersRoute;
