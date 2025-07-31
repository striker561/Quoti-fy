export class BadRequestError extends Error {
    status = 400;
}

export class TooManyRequestsError extends Error {
    status = 429;
}

export class InternalServerError extends Error {
    status = 500;
}

export function isHttpError(err: unknown): err is { status: number; message: string } {
    return (
        typeof err === "object" &&
        err !== null &&
        "status" in err &&
        "message" in err &&
        typeof (err).status === "number" &&
        typeof (err).message === "string"
    );
}
