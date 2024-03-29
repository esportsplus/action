class Response<T> {
    data: T;
    errors: { message: string, path?: string | number }[] = [];
    ok = true;


    constructor(data: T, errors?: Response<T>['errors']) {
        this.data = data;
        this.errors = errors || [];

        if (errors) {
            this.ok = errors.length === 0;
        }
    }


    error(input: Response<T>['errors'][0] | string) {
        let message,
            path;

        if (typeof input === 'string') {
            message = input;
        }
        else {
            message = input.message;
            path = input.path;
        }

        this.errors.push(path == undefined ? { message } : { message, path });
        this.ok = false;

        return this;
    }

    fork<T>(data: T) {
        return new Response<T>(data, this.errors);
    }

    toJSON() {
        return {
            data: this.data,
            errors: this.errors,
            ok: this.ok
        };
    }
}


export default <T>(data?: T, errors?: Response<T>['errors']) => {
    return new Response(data, errors);
};
export { Response };