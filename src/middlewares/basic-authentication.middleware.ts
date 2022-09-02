import { NextFunction, Request, Response } from 'express';
import { QueryError } from '../errors/query.error';
import UnauthorizedError from '../errors/unauthorized.error';
import { userRepository } from '../repositories';

async function basicAuthenticationMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const authorizationHeader  = req.headers['authorization'];

        if (!authorizationHeader) {
            throw new UnauthorizedError('Header "authorization" não presente');
        }

        const [type, encodedTokenData] = authorizationHeader.split(' ');

        if (type !== 'Basic') {
            throw new UnauthorizedError('Tipo de autenticação não suportado');
        }

        if (!encodedTokenData) {
            throw new UnauthorizedError('Credenciais não informadas');
        }

        const [username, password] = Buffer.from(encodedTokenData, 'base64')
            .toString('utf-8')
            .split(':');

        if (!username || !password) {
            throw new UnauthorizedError('Credenciais não preenchidas');
        }

        const result = await userRepository.findByUsernameAndPassword(username, password);

        if (!result) {
            throw new UnauthorizedError('Dados de acesso inválidos');
        }

        if (result instanceof QueryError) {
            throw result;
        }

        req.user = result;
        next();
    } catch (error) {
        next(error);
    }
}

export default basicAuthenticationMiddleware;
