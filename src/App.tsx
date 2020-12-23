import React, {memo, Suspense} from 'react'
import {renderRoutes} from 'react-router-config'
import {HashRouter} from 'react-router-dom'
import {Spin} from 'antd'
import {routes} from './Routes/index'

export default memo(function App() {
    return (
        <HashRouter>
            <Suspense fallback={<Spin/>}>{renderRoutes(routes)}</Suspense>
        </HashRouter>
    )
})