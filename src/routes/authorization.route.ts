import config from 'config';
import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import JWT from 'jsonwebtoken';
import UnauthorizedError from '../errors/unauthorized.error';
import basicAuthenticationMiddleware from '../middlewares/basic-authentication.middleware';

const authorizationRoute = Router();
const secretKey = config.get<string>('authentication.secretKey');

authorizationRoute.post('/token', basicAuthenticationMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;

        if (!user) {
            throw new UnauthorizedError('Usuário não associado!');
        }

        const payload = { username: user.username };
        const options = { subject: user.uuid };
        const jwtToken = JWT.sign(payload, secretKey, options);

        res.status(StatusCodes.OK).json({ token: jwtToken })
    } catch (error) {
        next(error);
    }
});

export default authorizationRoute;
