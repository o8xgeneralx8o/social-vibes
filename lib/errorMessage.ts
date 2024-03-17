export default function errorMessage(msg: string, details: unknown = {}) {
    return {
        error: {
            msg,
            details
        }
    }
}