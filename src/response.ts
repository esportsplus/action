import { Payload } from './types';


class Response<T extends Payload<T>> {
    data: T;
    messages: Record<string, [string, number | undefined][]> = {};


    constructor(data: T) {
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


export default <T extends Payload<T>>(payload: T) => {
    let response = new Response(payload);

    // Parse validation errors once you decide on inline errors vs floating alert message or both?

    return response;
};
export { Response };