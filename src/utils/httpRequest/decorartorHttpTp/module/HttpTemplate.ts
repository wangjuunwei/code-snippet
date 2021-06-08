import {CommonHttpTemplate, CommonHttpTemplateConfig, ErrorType} from '../types/index'

import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import {Reject, Resolve} from "../../../../pages/javascriptSnippet/rewritePromise/type";
import Rpromise from "../../../../pages/javascriptSnippet/rewritePromise/Promise";

class HttpBaseTemplate extends CommonHttpTemplate {
    public commonHttpTemplateConfig: CommonHttpTemplateConfig;

    constructor(props: CommonHttpTemplateConfig) {
        super(props);
        this.commonHttpTemplateConfig = props;

        this.httpInstance = this.createHttp(props);

        this.requestInterceptors(this.httpInstance)

        this.responseInterceptors(this.httpInstance)
    }

    /**
     * 请求拦截器
     * @param instance
     */
    public requestInterceptors(instance: AxiosInstance): AxiosInstance {

        instance.interceptors.request.use(
            (config: AxiosRequestConfig) => {
                if (this.commonHttpTemplateConfig.requestInterceptors) {
                    return this.commonHttpTemplateConfig.requestInterceptors(config)
                }
                return config
            },
            (error: Error) => this.httpError('REQUEST-INTERCEPTORS-ERROR', error)
        )
        return instance
    }

    /**
     * 数据响应拦截器
     * @param instance
     */
    public responseInterceptors(instance: AxiosInstance): AxiosInstance {
        instance.interceptors.response.use(
            (config: AxiosResponse) => {
                if (this.commonHttpTemplateConfig.responseInterceptors) {
                    return this.commonHttpTemplateConfig.responseInterceptors(config);
                }
                return config;
            },
            (error: Error) => this.httpError('PROMISE-HTTP-ERROR' ,error)
        )
        return instance;
    }


    /**
     * http实例创建
     * @param props
     */
    public createHttp(props: CommonHttpTemplateConfig): AxiosInstance {

        return axios.create({...props});
    }

    /**
     * 错误回调
     * @param errorType
     * @param error
     */
    public httpError(errorType: ErrorType, error: Error) {
        console.log(error);
    }

}

/**
 * 构建http 实例
 * @param config<CommonHttpTemplateConfig> 拦截器 错误捕获等
 * @constructor
 */
const HttpTemplate = (() => {
    let instance: any = null
    return (config: CommonHttpTemplateConfig): HttpBaseTemplate => {
        if (!instance) {
            instance = new HttpBaseTemplate(config)
        }
        return instance;
    }
})()
export default HttpTemplate




function resolvePromise<T>(promise2: Rpromise<T>, x: T | PromiseLike<T>, resolve: Resolve<T>, reject: Reject) {


    if (promise2 === x) {
        const e = new Error('TypeError: Chaining cycle detected for promise #<MyPromise>')
        e.stack = ''
        return reject(e)
    }
    let called = false

    if ((typeof x === 'object' && x != null) || typeof x === 'function') {
        try {
            const then = (x as PromiseLike<T>).then

            if (typeof then === 'function') {
                then.call(
                    x,
                    (y: T | PromiseLike<T>) => {
                        if (called) return
                        called = true
                        // 如果是 Promise，我们应该递归地获取到最终状态的值，传入相同的处理函数，不论是成功还是失败都能直接抛出到最外层
                        resolvePromise(promise2, y, resolve, reject)
                    },
                    (r: any) => {
                        if (called) return
                        called = true
                        // 如果传入的 Promise 被拒绝，直接抛出到最外层
                        reject(r)
                    }
                );
            } else {
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
