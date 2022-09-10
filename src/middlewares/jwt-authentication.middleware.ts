import config from 'config';
import { NextFunction, Request, Response } from 'express';
import UnauthorizedError from '../errors/unauthorized.error';
import JWT from 'jsonwebtoken';
import { userRepository } from '../repositories';

const secretKey = config.get<string>('authentication.secretKey');

async function jwtAuthenticationMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const authorizationHeader = req.headers.authorization;

        if (typeof authorizationHeader === 'undefined') {
            throw new UnauthorizedError('Header "authorization" não presente');
        } 

        const [type, jwtToken] = authorizationHeader.split(' ');

        if (type !== 'Bearer') {
            throw new UnauthorizedError('Tipo de autenticação não suportado');
        }

        if (!jwtToken) {
            throw new UnauthorizedError('JWT token não presente');
        }

        try {
            const payload = JWT.verify(jwtToken, secretKey);
            if (typeof payload !== 'object' || !payload.sub) {
                throw new UnauthorizedError('JWT token inválido')
            }

            const user = await userRepository.findById(payload.sub);

            if (!user) {
                throw new UnauthorizedError('Usuário associado ao JWT token não encontrado')
            }

            req.user = user;
            next();
        } catch (error) {
            throw (error instanceof UnauthorizedError) ? error : new UnauthorizedError('JWT token inválido, "sub" mal formatado');
        }
    } catch (error) {
        next(error);
    }
}

export default jwtAuthenticationMiddleware;
