## UseReducer相关概念

### 1、UseReducer概念

```js
1、语法
/**
 * @param reducer 处理函数
 * @param initialArg 初始值
 * @param init 初始化函数
 */
const [state, dispatch] = useReducer(reducer, initialArg, init)
```

### 2、编写初始化函数

```js
const initFunction: (initialCount: number) => object = (initialCount) => {

    return {count: initialCount}
}
```

### 3、书写reducer 处理函数

```js
type reducerData = (state: stateData, action: actionData) => any
const reducer: reducerData = (state, action) => {
    switch (action.type) {
        case 'increment':
            return {count: state.count + 1};
        case 'decrement':
            return {count: state.count - 1};
        case 'reset':
            return initFunction(action.payload);
        default:
            throw new Error();
    }
}
```

### 3、创建Reducer

```js
const [state, dispatch] = React.useReducer(reducer, initialCount, initFunction)
```


### 4、触发当前函数
```js
<Button onClick={() => dispatch({type: 'decrement'})}>-</Button>
<Button onClick={() => dispatch({type: 'reset', payload: initialCount})}>重置</Button>
<Button onClick={() => dispatch({type: 'increment'})}>+</Button>
```