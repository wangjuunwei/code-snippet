import React from 'react'
import InitState from './json/init.json'
import {SketchOutlined} from '@ant-design/icons'
import {MapWrapper, Mapitem} from './css/mapComponents'

/**
 * @summary 切换路由地址
 * @param history
 * @param path
 */
const changeRouter: (history: any, path: string) => void = (history, path) => {
    history.push(path)
}

/**
 * @summary 渲染列表详情
 * @param item
 * @param props
 * @constructor
 */
const MapInnerItem: (item: { name: string, components: any }, props: any) => JSX.Element = (item, props) => {
    return (
        item && item.components.map((innerItem: { title: string, href: string }, index: number) => {
            return (<Mapitem key={index} onClick={() => {
                changeRouter(props.history, innerItem.href)
            }}>{innerItem.title}</Mapitem>)
        })
    )

}

/**
 * @summary 渲染一级盒子
 * @param InitObject
 * @param props
 * @constructor
 */
const MapItem: (InitObject: any, props: object) => JSX.Element = (InitObject, props) => {

    return (
        InitObject && InitObject.map((item: { name: string, components: any }, index: number) => {
            return (
                <MapWrapper key={index}>
                    <div className='nya-title'><SketchOutlined/><span>{item.name}</span></div>
                    {MapInnerItem(item, props)}
                </MapWrapper>)
        })
    )

}

/**
 * @summary 主渲染组件
 * @param props
 * @constructor
 */
const MapComponents: React.FC<{ props: object }> = (props) => {
    return (
        <>{MapItem(InitState, {...props.props})}</>
    )
}

export default MapComponents