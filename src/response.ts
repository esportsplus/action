class Response {
    data: Record<string, any> = {};
    messages: Record<string, [string, number | undefined][]> = {};


    constructor(data: Response['data']) {
        this.data = data;
    }


    error(message: string, seconds?: number) {
        this.messages.errors.push([message, seconds]);
    }

    info(message: string, seconds?: number) {
        this.messages.info.push([message, seconds]);
    }

    success(message: string, seconds?: number) {
        this.messages.success.push([message, seconds]);
    }

    warning(message: string, seconds?: number) {
        this.messages.warning.push([message, seconds]);
    }
}


export default ({ data }: {
    data?: Response['data'],
    errors?: { message: string, path: (string | number) }[]
} = {}) => {
    let response = new Response(data || {});

    // Parse validation errors once you decide on inline errors vs floating alert message or both?

    return response;
};
export { Response };