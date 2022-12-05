const response = (): {
    data: Record<string, any>,
    messages: Record<string, string[]>
} => {
    return {
        data: {},
        messages: {
            error: [],
            success: [],
            info: [],
            warning: []
        }
    };
};


export default { response };
export { response };