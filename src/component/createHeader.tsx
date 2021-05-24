import React from "react";
import {Header} from "./css/createHeader";

/**
 * @summary header 展示组件
 * @constructor
 */
const WrapperHedaer: React.FC<{}> = () => {
    return (
        <Header><h1><a href='/'>CodeTools - 工具集合</a></h1></Header>
    )
}

export default WrapperHedaer

