## JWT的生成

### 1、JWT的生成

```javascript
1、在node层使用jsonwebtoken进行Token的生成

jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256' }, function(err, token) {
    console.log(token);n
});

2、生成后在客户端存储当前的token并在执行请求上携带当前token
config.headers.common['Authorization'] = 'Bearer ' + token


3、在node中间件层对当前的请求的token进行校验
var decoded = jwt.decode(token, {complete: true});
```
