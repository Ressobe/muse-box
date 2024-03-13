export type SuccessResult<T> = [T, null];
export type ErrorResult<E extends Error> = [null, E];
export type Result<T, E extends Error> = SuccessResult<T> | ErrorResult<E>;
