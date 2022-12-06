import { Response } from './response';


type Payload<T extends Record<string, unknown>> = {
    data?: T['data'],
    errors?: { message: string, path: (string | number) }[]
};


export { Payload, Response };