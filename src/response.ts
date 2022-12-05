class Response {
    data: Record<string, any> = {};
    messages: Record<string, [string, number | undefined][]> = {};


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


export default () => new Response();
export { Response };