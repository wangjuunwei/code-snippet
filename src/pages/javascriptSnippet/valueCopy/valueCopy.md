## 深拷贝与浅拷贝

### 1、浅拷贝的实现

```js

// for..in 遍历对象获取属性值，会检查其原型链上的属性
for (var Key in source) {
    // 判断对象中的是否有nextkey 为name的属性
    // 过滤掉原型链上面的属性
    if (Object.prototype.hasOwnProperty.call(source, Key)) {
        to[Key] = source[Key]
    }
}
```

### 2、深拷贝的实现

```js
function deepCopy3(source: any, hash = new WeakMap()) {

    if (!isobj(source)) return source
    if (hash.has(source)) return hash.get(source)

    let target = Array.isArray(source) ? [...source] : {...source}
    hash.set(source, target)


    Reflect.ownKeys(target).forEach((key) => {
        if (isobj(source[key])) {

            target[key] = deepCopy3(source[key], hash)
        } else {
            target[key] = source[key]
        }
    })

    return target
}
```
