import React from 'react'
import {renderRoutes, RouteConfigComponentProps} from 'react-router-config'


type NewApiTestIF = RouteConfigComponentProps

const NewApiTest: React.FC<NewApiTestIF> = ({route, ...props}) => {
    return (
        <>{route && renderRoutes(route.routes)}</>
    )
}

export default React.memo(NewApiTest)