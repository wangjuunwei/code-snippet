## UseEffect 的相关用法

### 1、UseEffect 的作用

```js
// @description 
通过这个Hook我们可以在React组件渲染后执行某些操作, 在默认情况下useEffect在每次渲染后都会执行

需要注意的是

1、使用第二个参数的优化方式，请确保数组中包含了所有外部作用域中会随时间变化并且在 effect 中使用的变量

2、建议在Effect内使用的函数全都都放在Effect内部（不过纯计算等可以作为依赖）

3、最差的情况可以将Effect 内部使用的函数放入useCallback 函数内
```

### 2、不需要清除的UseEffect

```js
const [count, setCount] = React.useState < number > (0)

React.useEffect(() => {
    console.log('NotCleanEffect====>effect', count)
})
```

### 3、需要清除的UseEffect

```js
React.useEffect(() => {
    function handleStatusChange(status) {
        setIsOnline(status.isOnline);
    }

    // 订阅好友的状态
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    // 指定此效果后如何清理
    return function cleanup() {
        // 移除订阅
        ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
})
```

### 4、同时使用多个Effect

```js
React.useEffect(() => {
    console.log('MultipleEffect First====>effect', count)
})

React.useEffect(() => {
    console.log('MultipleEffect Second====>effect', count)
})
```

### 5、通过跳过 Effect 进行性能优化

```js
 React.useEffect(() => {
    console.log('NeedJumpEffect ====>effect', value)
}, [value])
```