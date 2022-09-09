import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { QueryError } from '../errors/query.error';
import { IUser } from '../models/user.model';
import { userRepository } from '../repositories';

const usersRoute = Router();

usersRoute.get('/', async (req: Request, res: Response, next: NextFunction) => {
    const users = await userRepository.findAll();
    res.status(StatusCodes.OK).send(users);
});

usersRoute.get('/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
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

usersRoute.post('/', async (req: Request<{}, {}, Required<Pick<IUser,'username'|'password'>>>, res: Response, next: NextFunction) => {
    if (typeof req.body.username !== 'string' || typeof req.body.password !== 'string') {
        res.status(StatusCodes.UNPROCESSABLE_ENTITY).send({ message: 'Campos obrigatórios faltando' });
        return;
    }
    /**
     * @TODO João, falta uma camada de validação aqui, a validação acima atende algumas necessidades,
     * porém o código de validação deveria ser escrito de uma forma mais sustentável. Talvez usar
     * uma biblioteca para simplificar os trechos de validação?
     * @TODO João, outra coisa importanten, falta alterar o esquema para não aceitar nomes duplicados
     * e adicioanr essa verificação aqui antes de tentar inserir.
     */
    const newUser = req.body;
    const result = await userRepository.create(newUser);

    if (result instanceof QueryError) {
        next(result);
        return;
    }

    res.status(StatusCodes.CREATED).send({ uuid: result });
});

usersRoute.put('/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    if (typeof req.body.username !== 'string' || typeof req.body.password !== 'string') {
        res.status(StatusCodes.UNPROCESSABLE_ENTITY).send({ message: 'Campos obrigatórios faltando' });
        return;
    }

    const user: Required<IUser> = {
        ...req.body ,
        uuid: req.params.uuid
    };

    const result = await userRepository.update(user);

    if (result instanceof QueryError) {
        next(result);
        return;
    }

    res.status(StatusCodes.OK).send({ uuid: result });
});

usersRoute.delete('/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    const result = await userRepository.delete(uuid);

    if (result instanceof QueryError) {
        next(result);
        return;
    }

    res.sendStatus(StatusCodes.OK);
});

export default usersRoute;
