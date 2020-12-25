import React from 'react'
import {RouteConfig} from 'react-router-config'
import {Redirect} from 'react-router-dom'

const IocClass = React.lazy(() => import('../pages/iocClass/indes'))
const NewApiTest = React.lazy(() => import('../pages/newApiTest/index'))
const ForwardRef = React.lazy(() => import('../pages/newApiTest/forwardRef'))

export const routes: RouteConfig[] = [
    {path: '/', exact: true, render: () => <div>123123</div>},
    //Typscript中的装饰器配合Ioc容器 完成依赖的 的注入
    {path: '/iocclass', exact: true, component: IocClass},
    {
        path: "/newapitest",
        component: NewApiTest,
        routes: [
            {path: '/newapitest', exact: true, render: () => <Redirect to='/newapitest/forwardRef'/>},
            {path: '/newapitest/forwardRef', exact: true, component: ForwardRef}
        ]
    },
    {path: '*', render: () => <div>405</div>},
]