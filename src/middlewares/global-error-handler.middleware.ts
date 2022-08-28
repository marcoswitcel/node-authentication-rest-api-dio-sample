import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { QueryError } from '../errors/query.error';

function globalErrorHandler(error: unknown, req: Request, res: Response, next: NextFunction) {
    if (error instanceof QueryError) {
        res.sendStatus(StatusCodes.BAD_REQUEST);
    } else {
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export default globalErrorHandler;
