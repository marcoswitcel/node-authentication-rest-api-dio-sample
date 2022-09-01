import { NextFunction, Request, Response } from 'express';
import UnauthorizedError from '../errors/unauthorized.error';

async function basicAuthenticationMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        // @TODO João, terminar de implementar esse middleware
        throw new UnauthorizedError('Testando');
    } catch (error) {
        next(error);
    }
}

export default basicAuthenticationMiddleware;
