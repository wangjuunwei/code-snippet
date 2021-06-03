import React from 'react'
import {renderRoutes, RouteConfigComponentProps} from 'react-router-config'


const JsSnippet: React.FC<RouteConfigComponentProps> = ({route, ...props}) => {
    return (
        <>{route && renderRoutes(route.routes)}</>
    )
}

export default React.memo(JsSnippet)