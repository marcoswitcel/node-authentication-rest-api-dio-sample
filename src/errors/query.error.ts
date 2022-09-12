import { ApplicationError } from './application.error';

export class QueryError extends ApplicationError {

    contextError?: unknown;

    constructor(message: string, contextError?: unknown) {
        super(message);
        if (typeof contextError !== 'undefined') {
            this.contextError = contextError;
        }
    }
}
