import { Error, ErrorTypes } from './types';


class Response<T> {
    private okay?: boolean;


    // Data bucket
    data: T;

    // Validation + manual input errors
    // - UI determines when/where/how to display these errors ( if at all )
    errors: Error[] = [];

    // Alert messages
    messages: Record<string, string[]> = {
        error: [],
        info: [],
        success: [],
        warning: []
    };


    constructor(data: T, errors?: ErrorTypes[]) {
        this.data = data;

        for (let error of (errors || [])) {
            this.error(error);
        }
    }


    get ok() {
        if (this.okay !== undefined) {
            return this.okay;
        }

        return (this.errors.length + this.messages.error.length) === 0;
    }

    set ok(value: boolean) {
        this.okay = value;
    }


    error(value: ErrorTypes) {
        if (typeof value === 'string') {
            this.messages.error.push(value);
        }
        else {
            this.errors.push({
                message: value.message,
                path: value.path
            });
        }

        return this;
    }

    fork<T>(data: T, everything = false) {
        let response = factory(data, this.errors);

        if (everything) {
            if (this.ok !== undefined) {
                response.ok = this.ok;
            }

            for (let key in this.messages) {
                response.messages[key] = [...this.messages[key]];
            }
        }

        return response;
    }

    info(value: string) {
        this.messages.info.push(value);
        return this;
    }

    success(value: string) {
        this.messages.success.push(value);
        return this;
    }

    warning(value: string) {
        this.messages.warning.push(value);
        return this;
    }
}


const factory = <T = Record<string, unknown>>(data?: T, errors?: ErrorTypes[]) => {
    return new Response(data || {} as T, errors);
};


export default factory;
export { Response };