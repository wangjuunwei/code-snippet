import {CommonHttpTemplate, CommonHttpTemplateConfig, ErrorType} from '../types/index'

import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";

import {message} from 'antd'

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

                const token = localStorage.getItem('token')

                if (token) {
                    config.headers.common['Authorization'] = 'Bearer ' + token
                }
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
            (response: AxiosResponse) => {
                let {data, config} = response
                if (config.url === '/user/login' && data.data) {
                    localStorage.setItem('token', data.data.token)
                }
                // if (data.code&&data.code === -666) {
                //
                //     Modal.warning({
                //         title: '提示',
                //         content: '当前登陆已失效',
                //         onOk: () => setTimeout(() => window.location.href = '/')
                //     })
                //
                //     // debugger
                //     // setTimeout(() => window.location.href = '/', 0)
                //
                // }

                if (this.commonHttpTemplateConfig.responseInterceptors) {
                    return this.commonHttpTemplateConfig.responseInterceptors(response);
                }
                return response;
            },
            (error: Error) => this.httpError('PROMISE-HTTP-ERROR', error)
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
        message.error('网络异常')
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
