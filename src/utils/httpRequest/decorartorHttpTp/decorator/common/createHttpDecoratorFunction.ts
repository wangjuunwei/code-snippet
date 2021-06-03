import 'reflect-metadata'
import {
    HttpTemplateMethod,
    ResMethodKey,
    ReqMethodQuery,
    ReqMethodParams,
    ReqMethodData,
    ReqMethodHeaders,
    CommonHttpTemplate,
    ReqHttpTransformRequest,
    ReqMethodKeyData,
    ReqMethodKeyParams,
    ReqMethodKeyQuery, ReqHttpBaseUrl, ResHttpResponseType
} from "../../types";

import {AxiosInstance, AxiosResponse} from 'axios'
import HttpTemplate from "../../module/HttpTemplate";
import {isEmptyFunction} from '../../utils/check'

const httpClient: CommonHttpTemplate = HttpTemplate({})
const httpInstance: AxiosInstance = httpClient.getHttpInstance()
export const createHttpDecoratorFunction = (type: HttpTemplateMethod, url: string, data: any = {}, options: string[] = []) => {

    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const menthod: any = descriptor.value;
        // 保存原方法的值，方便后续步骤通过 apply 调用函数
        descriptor.value = async function (...argument: any) {
            // 获取之前通过一系列注解定义的元数据，包括请求参数，baseUrl 等等
            const {
                reqDataKey,
                reqParamsKey,
                responseType,
                reqQueryKey,
                baseUrl,
                reqHttpTransform,
                requestConfig,
                reqParamsIndex,
                reqQueryIndex,
                resIndex,
                reqDataIndex
            } = getMetadata(target, propertyKey)

            try {
                const args: Array<any> = [...argument]
                console.log("args===", args);
                let query: any = {};
                let params: any = {};
                let postData: any = {};
                let httpUrl = url;

                // 当存在 HttpQuery 注解时 会拿到被 HttpQuery 注解的参数, 拿到 httpBaseUrl
                // path 参数
                if (reqQueryIndex >= 0) {
                    const dataObj = getHttpData(type, httpUrl, args[reqQueryIndex], reqQueryKey);
                    query = dataObj.data;
                    httpUrl = dataObj.httpUrl;
                }
                // 当存在 HttpParams 注解时 会拿到被 HttpParams 注解的参数 拿到 httpBaseUrl
                if (reqParamsIndex >= 0) {
                    const dataObj = getHttpData(type, httpUrl, args[reqParamsIndex], reqParamsKey);
                    params = dataObj.data;
                    httpUrl = dataObj.httpUrl;
                }
                // post data数据
                if (reqDataIndex >= 0) {
                    const dataObj = getHttpData(type, httpUrl, args[reqDataIndex], reqDataKey);
                    httpUrl = dataObj.httpUrl;
                    postData = dataObj.data
                }

                const requestHttpConfig: any = [...requestConfig, ...options]
                const res: any = await requestData(type, baseUrl ? baseUrl + httpUrl : httpUrl, {
                    query,
                    params,
                    postData
                }, requestHttpConfig, reqHttpTransform, responseType)

                if (isEmptyFunction(menthod) || resIndex === undefined || resIndex < 0) {

                    return res

                }

                if (resIndex >= 0) args.splice(resIndex, 1, res)


                return menthod.apply(this, args)
            } catch (error) {
                console.warn(error);
                throw error
            }
        }

    }
}


function getMetadata(target: any, propertyKey: string) {
    const resIndex: number = Reflect.getOwnMetadata(ResMethodKey, target, propertyKey)
    const reqQueryIndex: number = Reflect.getOwnMetadata(ReqMethodQuery, target, propertyKey);
    const reqParamsIndex: number = Reflect.getOwnMetadata(ReqMethodParams, target, propertyKey);
    const reqDataIndex: number = Reflect.getOwnMetadata(ReqMethodData, target, propertyKey);
    const reqDataKey: string = Reflect.getOwnMetadata(ReqMethodKeyData, target, propertyKey);
    const reqParamsKey: string = Reflect.getOwnMetadata(ReqMethodKeyParams, target, propertyKey);
    const reqQueryKey: string = Reflect.getOwnMetadata(ReqMethodKeyQuery, target, propertyKey);
    const reqHttpTransform: number = Reflect.getOwnMetadata(ReqHttpTransformRequest, target, propertyKey);
    const baseUrl: string = Reflect.getOwnMetadata(ReqHttpBaseUrl, target, propertyKey);
    const responseType: ResponseType = Reflect.getOwnMetadata(ResHttpResponseType, target, propertyKey);
    const requestConfig: string[] = Reflect.getOwnMetadata(ReqMethodHeaders, target, propertyKey) || [];
    return {
        reqDataKey,
        reqParamsKey,
        responseType,
        reqQueryKey,
        baseUrl,
        reqHttpTransform,
        requestConfig,
        reqParamsIndex,
        reqQueryIndex,
        resIndex,
        reqDataIndex
    }
}

/**
 * 获取配置
 * @param options
 */

export const getConfig = (options: string[]) => {
    return options.reduce((preValue, header) => {

        const match = header.match(/([^:]+):\s*(.*)/);
        if (!match) {
            throw new Error(`Invalid header format for '${header}'`);
        }
        const [, name, value] = match
        if (!preValue[name]) {
            preValue[name] = '';
        }
        preValue[name] = value;
        return preValue;
    }, {} as Record<string, string>)
}


/**
 * 获取请求数据
 * @param type
 * @param httpUrl
 * @param data
 * @param key
 */
export const getHttpData = (type: HttpTemplateMethod, httpUrl: string, data: any, key?: string) => {
    for (const k in data) {
        httpUrl.replace(`:${key}`, data[k])
    }
    if (key) {
        const result: any = {};
        result[key] = data[key];
        return {data: result, httpUrl};
    }
    return {data, httpUrl};
}

/**
 * http 请求实体
 * @param type
 * @param url
 * @param data
 * @param options
 * @param reqHttpTransform
 * @param responseType
 */
export function requestData(type: string, url: string, data: { query: any; params: any; postData: any; }, options: any, reqHttpTransform: any, responseType: string) {
    return new Promise(async (resolve, reject) => {
        const {query, params, postData} = data;
        const config: any = getConfig(options);
        const requestData: any = {
            url: url,
            method: type,
            headers: config,
            params: JSON.stringify(query) === "{}" ? params : query,
            data: postData,
            responseType: responseType || 'json'
        }
        if (reqHttpTransform) {
            requestData['transformRequest'] = reqHttpTransform
        }
        httpInstance.request(requestData).then((res: AxiosResponse) => {
            resolve(res);
        }).catch(e => {
            reject(e);
        })
    })
}