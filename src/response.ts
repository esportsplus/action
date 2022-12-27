class Response<T> {
    private okay?: boolean;


    // Data bucket
    data: T;
    // Input errors
    // - UI determines when/where/how to display these errors ( if at all )
    input = {
        error: function(error: { message: string, path: (string | number) }) {
            this.errors.push(error);
            return this;
        },
        errors: [] as { message: string, path: (string | number) }[]
    };
    // Alert messages
    messages: Record<string, string[]> = {
        error: [],
        info: [],
        success: [],
        warning: []
    };


    constructor(data: T) {
        this.data = data || {} as T;
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


    error(messages: string) {
        this.messages.error.push(messages);
        return this;
    }

    info(messages: string) {
        this.messages.info.push(messages);
        return this;
    }

    success(messages: string) {
        this.messages.success.push(messages);
        return this;
    }

    warning(messages: string) {
        this.messages.warning.push(messages);
        return this;
    }
}


export default <T>(data: T, errors?: { message: string, path: (string | number) }[]) => {
    let response = new Response(data);

    if (errors) {
        response.input.errors = errors;
    }

    return response;
};
export { Response };