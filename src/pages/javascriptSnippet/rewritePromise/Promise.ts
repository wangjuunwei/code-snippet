import {Executor, onFulfilled, onRejected, onFinally, Reject, Resolve, Status} from "./type"

function isPromise(value: any): value is PromiseLike<any> {
    return (
        ((typeof value === 'object' && value !== null) || typeof value === 'function') && typeof value.then === 'function'
    )
}


function resolvePromise<T>(promise2: Rpromise<T>, x: T | PromiseLike<T>, resolve: Resolve<T>, reject: Reject) {
    // 不能引用同一个对象，不然会无限循环的
    if (promise2 === x) {
        const e = new TypeError(
            'TypeError: Chaining cycle detected for promise #<MyPromise>'
        )
        // 清空栈信息，不太清楚为什么 Promise 要清除这个，先不管了，继续往下
        e.stack = ''
        // 直接进入错误的回调
        return reject(e)
    }
    let called = false // 防止多次调用

    // 如果 x 为 Promise，通过上面的知识我们知道判断是否是个 Promise 或者像 Promise 我们是判断一个对象是否有 then 方法，可以发现在下面判断是否是对象或者函数中也有相同的判断，所以这里我们可以直接省略

    // 如果 x 是对象或函数
    if ((typeof x === 'object' && x != null) || typeof x === 'function') {
        try {
            /*
            存储了一个指向 x.then 的引用，然后测试并调用该引用，以避免多次访问 x.then 属性。这种预防措施确保了该属性的一致性，因为其值可能在检索调用时被改变。
            注：这里可以用我们封装的判断方法 isPromise 判断，但是既然跟着解决过程走，那么还是老老实实操作一下吧
            */
            // 手动转一下类型
            const then = (x as PromiseLike<T>).then
            if (typeof then === 'function') {
                // 这里其实就是调用传入的 Promise 的 then 方法，下面代码就是执行了 x.then(()=>{},()=>{})
                then.call(
                    x,
                    (y) => {
                        if (called) return
                        called = true
                        // 如果是 Promise，我们应该递归地获取到最终状态的值，传入相同的处理函数，不论是成功还是失败都能直接抛出到最外层
                        resolvePromise(promise2, y, resolve, reject)
                    },
                    (r) => {
                        if (called) return
                        called = true
                        // 如果传入的 Promise 被拒绝，直接抛出到最外层
                        reject(r)
                    }
                )
            } else {
                // 不是 Promise 对象，当做普通值处理
                resolve(x)
            }
        } catch (e) {
            // 如果中间有错误。直接变为拒绝态
            // 但是如果出现错误之前已经改变了状态，那么久不用管
            if (called) return
            called = true
            reject(e)
        }
    } else {
        // 普通值处理
        resolve(x)
    }
}


export default class Rpromise<T> {
    // 刚开始的状态
    status: Status = Status.PENDING

    // 保存Promise 的最终值
    private value!: T

    // 保存Promise reject 的原因
    private reason?: any

    // 成功的回掉
    private onFulfilledCallback: (() => void)[] = []

    // 失败的回掉
    private onRejectedCallback: (() => void)[] = []

    constructor(executor: Executor<T>) {
        try {
            executor(this._resolve.bind(this), this._reject.bind(this))
        } catch (e) {

            this._reject(e)
        }
    }

    private _resolve(value: T | PromiseLike<T>) {
        try {
            setTimeout(() => {
                if (isPromise(value)) {
                    value.then(this._resolve.bind(this), this._reject.bind(this))
                    return
                }

                if (this.status === Status.PENDING) {
                    this.status = Status.FULFILLED
                    this.value = value
                    this.onFulfilledCallback.forEach((fn) => fn())
                }

            })
        } catch (e) {

            this._reject(e)
        }
    }


    private _reject(reason: any) {

        setTimeout(() => {
            if (this.status === Status.PENDING) {
                this.status = Status.REJECTED
                this.reason = reason
                this.onRejectedCallback.forEach((fn) => fn())
            }
        })
    }


    public then<TResult1 = T, TResult2 = never>(onfulfilled?: onFulfilled<T, TResult1>, onrejected?: onRejected<TResult2>): Rpromise<TResult1 | TResult2> {

        const onfulfilledFn = typeof onfulfilled === 'function' ? onfulfilled : (v: T | TResult1) => v as TResult1

        const onrejectedFn = typeof onrejected === 'function' ? onrejected : (e: any) => {
            throw e
        }


        const promise2 = new Rpromise<TResult1 | TResult2>((resolve, reject) => {
            if (this.status === Status.FULFILLED) {
                setTimeout(() => {
                    try {
                        //  获取到 x，然后与要返回的 Promise 产生联系
                        let x = onfulfilledFn(this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            }
            if (this.status === Status.REJECTED) {
                setTimeout(() => {
                    try {
                        //  获取到 x，然后与要返回的 Promise 产生联系
                        let x = onrejectedFn(this.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            }
            if (this.status === Status.PENDING) {
                // 如果为 pending，需要将 onFulfilled 和 onRejected 函数都存放起来，状态确定后再依次执行
                // 执行回调的时候有 setTimeout，这里就不加了
                this.onFulfilledCallback.push(() => {
                    try {
                        let x = onfulfilledFn(this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
                this.onRejectedCallback.push(() => {
                    try {
                        let x = onrejectedFn(this.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            }
        })


        return promise2


        // if (this.status === Status.FULFILLED) {
        //     setTimeout(() => {
        //         onfulfilled!(this.value)
        //     })
        // }

        //
        // if (this.status === Status.REJECTED) {
        //     setTimeout(() => {
        //         onrejected!(this.reason)
        //     })
        // }
        //
        //
        // if (this.status === Status.PENDING) {
        //     this.onFulfilledCallback.push(() => {
        //         onfulfilled!(this.value)
        //     })
        //     this.onRejectedCallback.push(() => {
        //         onrejected!(this.reason)
        //     })
        // }
        //
        // return new Rpromise(() => {
        // })
    }


    static resolve(): Rpromise<void>
    static resolve<T>(value: T | PromiseLike<T>): Rpromise<T>
    static resolve<T>(value?: T | PromiseLike<T>): Rpromise<T> {
        if (value instanceof Rpromise) {
            return value
        }

        return new Rpromise((resolve) => {
            resolve(value!)
        })
    }


    static reject<T = never>(reason?: any): Rpromise<T> {


        return new Rpromise((resolve, reject) => {
            reject(reason)
        })
    }


    public finally(onfinally?: onFinally): Rpromise<T> {
        return this.then(
            (value) =>
                // 如果 onfinally 返回的是一个 thenable 也会等返回的 thenable 状态改变才会进行后续的 Promise
                Rpromise.resolve(
                    typeof onfinally === 'function' ? onfinally() : onfinally
                ).then(() => value),
            (reason) =>
                Rpromise.resolve(
                    typeof onfinally === 'function' ? onfinally() : onfinally
                ).then(() => {
                    throw reason
                })
        )
    }
}
