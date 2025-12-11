type ResponseError = { message: string; path?: string | number };

interface ResponseFail<T, F = undefined> extends ResponseMethods<T, F> {
    ok: false;
    data: F;
}

interface ResponseMethods<T, F> {
    errors: ResponseError[];
    error(error: ResponseError | string): Response<T, F>;
    fork<U, V = undefined>(data: U | V): Response<U, V>;
    toJSON(): { data: T | F; errors: ResponseError[]; ok: boolean };
}

interface ResponseOk<T, F = undefined> extends ResponseMethods<T, F> {
    ok: true;
    data: T;
}

type Response<T, F = undefined> = ResponseOk<T, F> | ResponseFail<T, F>;


export type { Response, ResponseError };