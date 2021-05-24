## UseState 的相关用法

### 1、函数语法： 
```js 
// @deprecated 返回一个state, 以及更新 state 的函数

const [state, setState] = useState(initialState);
```


### 2、Usestate 的 TypeScript 定义
```js
/**
 * @deprecated useState 的 TypeScript 定义
 *
 * type Dispatch<A> = (value: A) => void
 *
 * type SetStateAction<S> = S | ((prevState: S) => S)
 *
 * function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
 *
 * function useState<S = undefined>(): [S | undefined, Dispatch<SetStateAction<S | undefined>>];
 */
```


### 3、基础用法

```js
const [simpleState, setSimpleState] = React.useState < number > (0);

const changeSimpleState = (count: number) => {

    setSimpleState(count)
}
```

### 4、函数式更新

```js
const [funState, setFunState] = React.useState < number > (count)

return (
    <div className='simpleBox'>
        <Title>{funState}</Title>
        <Button className='simpleBox-button' type="primary"
                onClick={() => setFunState((precode) => precode + 1)}>点击+1
        </Button>
        <Button className='simpleBox-button' type="primary"
                onClick={() => setFunState((precode) => precode - 1)}>点击-1
        </Button>
    </div>
)
```