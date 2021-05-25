## UseCallback相关内容

### 1、UseCallBack 概念

```js
1、语法
/**
 * @param fn 回掉执行的函数
 * @param deps 依赖的参数（添加到依赖数组内的内容才会更新）
 */
const handleUseCallback = useCallback(fn, deps)
```

### 2、执行实例

```js
 const [value, setValue] = React.useState < number > (1)
const memoizerCallback = React.useCallback(() => {
    console.log('usecallback 触发', value)
}, [value])


const handleButtonCb = () => {
    setValue((pre) => pre + 1)
    memoizerCallback()
}

return (
    <UseCallbackWp>
        <p>当前valuede的修改值:{value}</p>
        <div>
            <Button type="primary" onClick={handleButtonCb}>点击测试Context的console</Button>
        </div>
    </UseCallbackWp>
)
```