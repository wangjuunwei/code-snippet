import React from 'react'
import {RouteConfig} from 'react-router-config'

const IocClass = React.lazy(() => import('../pages/iocClass/indes'))

export const routes: RouteConfig[] = [
    {path: '/', exact: true, render: () => <div>123123</div>},
    {path: '/iocclass',exact: true, component: IocClass},
    {par: '*', render: () => <div>404</div>},
]