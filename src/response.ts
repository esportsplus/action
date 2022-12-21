import { Payload } from './types';


class Response<T extends Payload<T>> {
    data: T['data'];
    errors: Record<string,any>[];
    messages: Record<string, string[]> = {
        error: [],
        info: [],
        success: [],
        warning: []
    };


    constructor({ data, errors }: T) {
        this.data = data || {};
        this.errors = errors || [];
    }


    get failed() {
        return this.errors.length > 0 || this.messages.error.length > 0;
    }


    error(...messages: string[]) {
        this.messages.error.push(...messages);
    }

    info(...messages: string[]) {
        this.messages.info.push(...messages);
    }

    success(...messages: string[]) {
        this.messages.success.push(...messages);
    }

    warning(...messages: string[]) {
        this.messages.warning.push(...messages);
    }
}


export default <T extends Payload<T>>(data: T = {} as T) => new Response(data);
export { Response };