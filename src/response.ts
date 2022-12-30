class Response<T> {
    private okay?: boolean;


    // Data bucket
    data: T;

    // Input errors ( validation + manual input errors )
    // - UI determines when/where/how to display these errors ( if at all )
    input = {
        error: [] as { message: string, path: (string | number) }[]
    };

    // Alert messages
    messages: Record<string, string[]> = {
        error: [],
        info: [],
        success: [],
        warning: []
    };


    constructor(data: T, errors?: { message: string, path: (string | number) }[]) {
        this.data = data;
        this.input = {
            error: errors || []
        };
    }


    get ok() {
        if (this.okay !== undefined) {
            return this.okay;
        }

        return (this.input.error.length + this.messages.error.length) === 0;
    }

    set ok(value: boolean) {
        this.okay = value;
    }


    error(message: string, path?: number | string) {
        if (path) {
            this.input.error.push({ message, path });
        }
        else {
            this.messages.error.push(message);
        }

        return this;
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


export default <T = Record<string, unknown>>(data?: T, errors?: { message: string, path: (string | number) }[]) => {
    return new Response(data || {} as T, errors);
};
export { Response };