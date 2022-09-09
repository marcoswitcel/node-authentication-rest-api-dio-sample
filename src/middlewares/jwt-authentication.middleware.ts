import { NextFunction, Request, Response } from 'express';

async function jwtAuthenticationMiddleware(req: Request, res: Response, next: NextFunction) {
    /**
     * @TODO João, terminar de implementar o middleware que checa a presença de token e
     * permite a continuação da request
     */
    next();
}

export default jwtAuthenticationMiddleware;
