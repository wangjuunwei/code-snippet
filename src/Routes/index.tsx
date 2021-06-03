import React from 'react'
import {RouteConfig} from 'react-router-config'
import {Redirect} from 'react-router-dom'

const IocClass = React.lazy(() => import('../pages/iocClass/indes'))

//导航相关地址
const Navigation = React.lazy(() => import('../pages/naviGation/index'))
// React相关地址
const NewApiTest = React.lazy(() => import('../pages/reactSnippet/index'))
const ForwardRef = React.lazy(() => import('../pages/reactSnippet/forwardRef'))
const UseState = React.lazy(() => import('../pages/reactSnippet/hooks/useState/useState'))
const UseEffect = React.lazy(() => import('../pages/reactSnippet/hooks/useEffect/index'))
const UseContext = React.lazy(() => import('../pages/reactSnippet/hooks/useContext/index'))
const UseReducer = React.lazy(() => import('../pages/reactSnippet/hooks/useReducer/index'))
const UseCallback = React.lazy(() => import('../pages/reactSnippet/hooks/useCallback/index'))

//Js/Ts 相关地址
const JsSnippet = React.lazy(() => import('../pages/javascriptSnippet/index'))
const DecoratorHttp = React.lazy(() => import('../pages/javascriptSnippet/decorartorHttpTp/index'))


export const routes: RouteConfig[] = [
    {path: '/', exact: true, component: Navigation},
    //Typscript中的装饰器配合Ioc容器 完成依赖的 的注入
    {path: '/iocclass', exact: true, component: IocClass},
    {
        path: "/reactSnippet",
        component: NewApiTest,
        routes: [
            {path: '/reactSnippet', exact: true, render: () => <Redirect to='/newapitest/forwardRef'/>},
            {path: '/reactSnippet/forwardRef', exact: true, component: ForwardRef},
            {path: '/reactSnippet/useState', exact: true, component: UseState},
            {path: '/reactSnippet/useEffect', exact: true, component: UseEffect},
            {path: '/reactSnippet/useContext', exact: true, component: UseContext},
            {path: '/reactSnippet/useReducer', exact: true, component: UseReducer},
            {path: '/reactSnippet/useCallback', exact: true, component: UseCallback}
        ]
    },
    {
        path: '/javascriptSnippet',
        component: JsSnippet,
        routes: [
            {path: '/javascriptSnippet/DecoratorHttp', exact: true, component: DecoratorHttp}
        ]
    },
    {path: '*', render: () => <div>405</div>},
]