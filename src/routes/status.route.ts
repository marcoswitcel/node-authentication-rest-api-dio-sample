import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';

const statusRoute = Router();

statusRoute.use('/status', (req: Request, res: Response, next: NextFunction) => {
    res.status(StatusCodes.OK).send({ status: 'UP' });
});

export default statusRoute;
