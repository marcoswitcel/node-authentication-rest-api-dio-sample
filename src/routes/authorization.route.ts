import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import basicAuthenticationMiddleware from '../middlewares/basic-authentication.middleware';

const authorizationRoute = Router();

authorizationRoute.post('/token', basicAuthenticationMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    // @TODO João, implementar endpoint que gera o token
    res.status(StatusCodes.OK).json({ 'message' : 'passei pelo basic' });
});

export default authorizationRoute;
