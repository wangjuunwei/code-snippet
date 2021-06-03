import {ReqMethodHeaders} from '../types/index'
import 'reflect-metadata'
/**
 * 请求头部
 * @param headers<string[] | string>
 * @constructor
 */
export function HttpHeader(headers: string | string[]) {

    return headerDecoratorFactory(headers);
}

function headerDecoratorFactory(headers: string | string[]) {

    return function (target: any, propertyKey: string) {

        const headersConfig: string[] = typeof headers === 'string' ? [headers] : headers;
        /**
         * @param metadataKey(ReqMethodHeaders) 设置或获取时的key
         * @param metadataValue(headersConfig) 元数据内容
         * @param target 待装饰的target
         * @param targetKey target的property
         */
        Reflect.defineMetadata(ReqMethodHeaders, headersConfig, target, propertyKey)
    }
}