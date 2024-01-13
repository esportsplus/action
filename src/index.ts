class Response<T extends Record<PropertyKey, unknown>> {
    data: T;
    errors: {
        message: string;
        path: string | number;
    }[] = [];
    ok = true;


    constructor(data: T, errors?: Response<T>['errors']) {
        this.data = data;
        this.errors = errors || [];

        if (errors) {
            this.ok = errors.length === 0;
        }
    }


    error({ message, path }: Response<T>['errors'][0]) {
        this.errors.push({ message, path });
        this.ok = false;

        return this;
    }

    fork(data: T) {
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


export default function factory<T extends Record<PropertyKey, unknown>>(data?: T, errors?: Response<T>['errors']) {
    return new Response(data || {} as T, errors);
};
export { Response };