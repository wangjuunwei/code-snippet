export enum Status {
    PENDING = 'pending',
    FULFILLED = 'fulfilled',
    REJECTED = 'rejected'
}

export type Resolve<T> = (value: T | PromiseLike<T>) => void
export type Reject = (reason?: any) => void
export type Executor<T> = (resolve: Resolve<T>, reject: OmitThisParameter<(reason: any) => void>) => void


export type onFulfilled<T, TResult1> =
    | ((value: T) => TResult1 | PromiseLike<TResult1>)
    | undefined
    | null
export type onRejected<TResult2> =
    | ((reason: any) => TResult2 | PromiseLike<TResult2>)
    | undefined
    | null

export type onFinally = (() => void) | undefined | null



