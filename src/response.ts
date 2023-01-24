import { Error } from './types';


class Response<T> {
    private okay?: boolean;


    // Data bucket
    data: T;

    // Validation + manual input errors
    // - UI determines when/where/how to display these errors ( if at all )
    errors: Error[] = [];


    constructor(data: T, errors?: Error[]) {
        this.data = data;
        this.errors = errors || [];
    }


    get ok() {
        if (this.okay !== undefined) {
            return this.okay;
        }

        return this.errors.length === 0;
    }

    set ok(value: boolean) {
        this.okay = value;
    }


    error(value: Error) {
        this.errors.push({
            message: value.message,
            path: value.path
        });

        return this;
    }

    fork<T>(data: T) {
        let response = factory(data, this.errors);

        if (this.ok !== undefined) {
            response.ok = this.ok;
        }

        return response;
    }

    toJSON() {
        return {
            data: this.data,
            errors: this.errors
        };
    }
}


const factory = <T = Record<string, unknown>>(data?: T, errors?: Error[]) => {
    return new Response(data || {} as T, errors);
};


export default factory;
export { Response };