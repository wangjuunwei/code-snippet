import {
    HttpGet,
    HttpHeader,
    HttpRes,
    HttpBaseUrl,
    HttpParams,
    HttpTransformRequest
} from "@utils/httpRequest/decorartorHttpTp/index"

export class HttpRequest {

    @HttpGet('/commons/health/check/get')
    @HttpBaseUrl('http://127.0.0.1:3001')
    @HttpHeader(['Content-Type: application/json'])
    @HttpTransformRequest(function (data) {
        console.log("data===",data);
        return JSON.stringify({name: '123123', value: '123123'})
    })
    public async test(@HttpParams('name') params: any, @HttpRes() res?: any) {
        // 函数体累不可以拿到后端返回的数据 该res 是 AxiosResponse；也就是说 res.data 才是真正的 数据结果；
        // 当函数体为空时默认返回 res；使用者也可以在函数内部实现自己的业务逻辑；
        console.log(res);
        return res;
    }
}

