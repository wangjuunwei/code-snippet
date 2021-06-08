## Promise TypeScript 版本

### 1、then的链式调用
```js
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
```
