import { Response as response } from './response';


type Payload<T extends Record<string, unknown>> = {
    data?: T['data'],
    errors?: { message: string, path: (string | number) }[]
};

type Response = typeof response;


export { Payload, Response };