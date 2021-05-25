## UseContext 用法

### 1、UseContext的概念

```js
接收一个Context对象（React.createContext的返回值）并返回该Context的当前值。
当前的Context
值由上层组件中距离当前组件最近的 < MyContex.Provider > 的
Value
prop决定。
当组件上层最近的 < MyContex.Provider > 更新时，该Hook会触发冲渲染，并使用最新的context
value
```

### 1、创建Provide包裹组件

```js

// 创建向下传递内容以及Provider组件
export const ThemeContext = React.createContext < ThemeContextData > (themes)

const ContextWrapper: React.FC = ({children}) => {

    return (
        <ThemeContext.Provider value={themes}>
            {children}
        </ThemeContext.Provider>
    )
}
```

### 2、创建内部包裹子组件

```js

import ThemeProvide, {ThemeContext} from './contextWrapper'

const ThemeInner: React.FC = () => {
    const {dark, light, handleCl} = React.useContext(ThemeContext)

    return (
        <ThemeInnerWrapper>
            <p>{`dark:${dark.background}:${dark.foreground}`}</p>
            <p>{`light:${light.background}:${light.foreground}`}</p>
            <div>
                <Button type="primary" onClick={() => handleCl()}>点击测试Context的console</Button>
            </div>
        </ThemeInnerWrapper>
    )
}

```

### 3、完成包裹组件的编写

```js
import ThemeProvide, {ThemeContext} from './contextWrapper'

const UseContext: React.FC = () => {
    return (
        <>
            <ThemeProvide>
                <ThemeInner/>
            </ThemeProvide>
        </>
    )
}

```
