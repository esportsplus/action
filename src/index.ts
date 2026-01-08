import type { Response as API, ResponseError } from './types';


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


    error(error: ResponseError | string): API<T, F> {
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

        return this as unknown as API<T, F>;
    }

    fork<U, V = undefined>(data: U | V): API<U, V> {
        return new Response<U, V>(data, this.errors) as unknown as API<U, V>;
    }

    toJSON() {
        return {
            data: this.data,
            errors: this.errors,
            ok: this.ok
        };
    }
}


function factory(): API<undefined>;
function factory<T>(data: T, errors?: ResponseError[]): API<T>;
function factory<T, F = undefined>(data: T | F, errors?: ResponseError[]): API<T, F>;
function factory<T, F = undefined>(data?: T | F, errors?: ResponseError[]): API<T | undefined, F> {
    return new Response<T | undefined, F>(data, errors) as unknown as API<T | undefined, F>;
}


export default factory;
export type { API as Response };