import type { Response as R, ResponseError } from './types';


class Response<T, F = undefined> {
    data: T | F;
    errors: ResponseError[] = [];
    ok: boolean = true;


    constructor(data: T | F, errors?: ResponseError[]) {
        this.data = data;

        if (errors) {
            this.errors = errors;
            this.ok = errors.length === 0;
        }
    }


    error(error: ResponseError | string): R<T, F> {
        let message,
            path;

        if (typeof error === 'string') {
            message = error;
        }
        else {
            message = error.message;
            path = error.path;
        }

        this.errors.push(path == undefined ? { message } : { message, path });
        this.ok = false;

        return this as unknown as R<T, F>;
    }

    fork<U, V = undefined>(data: U | V): R<U, V> {
        return new Response<U, V>(data, this.errors) as unknown as R<U, V>;
    }

    toJSON() {
        return {
            data: this.data,
            errors: this.errors,
            ok: this.ok
        };
    }
}


function factory(): R<undefined>;
function factory<T>(data: T, errors?: ResponseError[]): R<T>;
function factory<T, F = undefined>(data: T | F, errors?: ResponseError[]): R<T, F>;
function factory<T, F = undefined>(data?: T | F, errors?: ResponseError[]): R<T | undefined, F> {
    return new Response<T | undefined, F>(data, errors) as unknown as R<T | undefined, F>;
}


export default factory;
export type { Response };