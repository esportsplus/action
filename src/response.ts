type Error = {
    message: string;
    path: string | number;
};


function factory<T = Record<string, unknown>>(data?: T, errors?: Error[]) {
    return new Response(data || {} as T, errors);
};


class Response<T> {
    private okay?: boolean;


    // Data bucket
    data: T;

    // Input errors ( validation + manual input errors )
    // - UI determines when/where/how to display these errors ( if at all )
    input = {
        errors: [] as Error[]
    };

    // Alert messages
    messages: Record<string, string[]> = {
        error: [],
        info: [],
        success: [],
        warning: []
    };


    constructor(data: T, errors?: Error[]) {
        this.data = data;
        this.input = {
            errors: errors || []
        };
    }


    get ok() {
        if (this.okay !== undefined) {
            return this.okay;
        }

        return (this.input.errors.length + this.messages.error.length) === 0;
    }

    set ok(value: boolean) {
        this.okay = value;
    }


    error(message: string | Error) {
        if (typeof message === 'string') {
            this.messages.error.push(message);
        }
        else {
            this.input.errors.push(message);
        }

        return this;
    }

    fork<U>(data?: U, errors?: Error[]) {
        return factory(data || this.data, errors || this.input.errors);
    }

    info(message: string) {
        this.messages.info.push(message);
        return this;
    }

    success(message: string) {
        this.messages.success.push(message);
        return this;
    }

    warning(message: string) {
        this.messages.warning.push(message);
        return this;
    }
}


export default factory;
export { Response };