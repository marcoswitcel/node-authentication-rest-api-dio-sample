import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { QueryError } from '../errors/query.error';
import UnauthorizedError from '../errors/unauthorized.error';

function globalErrorHandler(error: unknown, req: Request, res: Response, next: NextFunction) {
    if (error instanceof QueryError) {
        res.sendStatus(StatusCodes.BAD_REQUEST);
    } else if (error instanceof UnauthorizedError) {
        res.sendStatus(StatusCodes.UNAUTHORIZED);
    } else {
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }

    console.error(error);
}

export default globalErrorHandler;
