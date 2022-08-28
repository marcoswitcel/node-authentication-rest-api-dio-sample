
export class QueryError extends Error {

    contextError?: unknown;

    constructor(message: string, contextError?: unknown) {
        super(message);
        if (typeof contextError !== 'undefined') {
            this.contextError = contextError;
        }
    }
}
