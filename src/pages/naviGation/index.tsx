import React from 'react'
import {Wrapper, HomeWe} from "./css";

import MapComponents from "./mapComponents";

import {RouteConfigComponentProps} from 'react-router-config'

import WrapperHedaer from '../../component/createHeader'

type routeProps = RouteConfigComponentProps

/**
 * @summary 欢迎组件
 * @constructor
 */
const HomeWelcome: React.FC<{}> = () => {
    return (
        <HomeWe>
            <h2>欢迎使用CodeTools工具合集</h2>
            <p>目前共开发了数十款有趣的小功能，数量还在持续增加中。</p>
        </HomeWe>
    )

}

/**
 * @summary navigation 主组建
 * @param route
 * @param props
 * @constructor
 */
const NaviGation: React.FC<routeProps> = ({route, ...props}) => {
    return (
        <Wrapper>
            <WrapperHedaer></WrapperHedaer>
            <HomeWelcome></HomeWelcome>
            <MapComponents props={props} />
        </Wrapper>
    )
}

export default React.memo(NaviGation)