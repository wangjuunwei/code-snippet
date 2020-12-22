import React from 'react'
import {RouteConfig} from 'react-router-config'
import { Redirect } from 'react-router-dom'

export const routes: RouteConfig[] = [
    {path: '/', exact: true, render: () => <div>123123</div>},
    {par:'*',render:()=><div>404</div>}
]