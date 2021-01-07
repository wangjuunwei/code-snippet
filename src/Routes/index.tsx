import React from 'react'
import {RouteConfig} from 'react-router-config'
import {Redirect} from 'react-router-dom'

const IocClass = React.lazy(() => import('../pages/iocClass/indes'))
const NewApiTest = React.lazy(() => import('../pages/UseApiDemo/index'))
const ForwardRef = React.lazy(() => import('../pages/UseApiDemo/forwardRef'))
const UseState = React.lazy(() => import('../pages/UseApiDemo/useState'))

export const routes: RouteConfig[] = [
    {path: '/', exact: true, render: () => <div>123123</div>},
    //Typscript中的装饰器配合Ioc容器 完成依赖的 的注入
    {path: '/iocclass', exact: true, component: IocClass},
    {
        path: "/UseApiDemo",
        component: NewApiTest,
        routes: [
            {path: '/UseApiDemo', exact: true, render: () => <Redirect to='/newapitest/forwardRef'/>},
            {path: '/UseApiDemo/forwardRef', exact: true, component: ForwardRef},
            {path: '/UseApiDemo/useState', exact: true, component: UseState}
        ]
    },
    {path: '*', render: () => <div>405</div>},
]