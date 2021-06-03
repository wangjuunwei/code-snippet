## 装饰器版本网络层请求


### 使用方法
```js
export class HttpRequest {

    @HttpGet('/commons/health/check/get')
    @HttpBaseUrl('http://127.0.0.1:3001')
    @HttpHeader(['Content-Type: application/json'])
    @HttpTransformRequest(function (data) {
        return JSON.stringify({name: 'test', value: 'test'})
    })
    public async test(@HttpParams('name') params: any, @HttpRes() res?: any) {
        
        console.log(res);
        return res;
    }
}

useEffect(() => {
    const testFunction = async () => {
        const test = new HttpRequest()
        let end = await test.test({name: 123, value: 456, seuce: 7890})
        console.log(end)
    };
    testFunction();
}, [])
```