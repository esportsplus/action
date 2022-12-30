type Error = {
    message: string;
    path: string | number;
};

type ErrorTypes = Error | string;


export { Error, ErrorTypes }