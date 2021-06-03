import React from "react";
import CodeWrapper from "@component/createCodeWrapper";
import useContext from "./useContext.md";

import ThemeProvide, {ThemeContext} from './contextWrapper'
import {Button} from "antd";
import styled from "styled-components/macro";

/**
 * @description 简单的样式文件
 */
const ThemeInnerWrapper = styled.div`
  width: 100%;
  margin: 0 auto;

  div, p {
    text-align: center;
  }
`


/**
 * @description 子组件的内容
 * @constructor
 */
const ThemeInner: React.FC = () => {
    const {dark, light, handleCl} = React.useContext(ThemeContext)

    return (
        <ThemeInnerWrapper>
            <p>{`dark:${dark.background}:${dark.foreground}`}</p>
            <p>{`light:${light.background}:${light.foreground}`}</p>
            <div><Button type="primary" onClick={() => handleCl()}>点击测试Context的console</Button></div>
        </ThemeInnerWrapper>
    )
}


/**
 * @description 外层包裹子组件
 * @provide ThemeProvide  src/pages/reactSnippet/useContext/contextWrapper.tsx
 * @summary 实际作为包裹组件的外部容器
 *
 */
const UseContext: React.FC = () => {
    return (
        <>
            <ThemeProvide><ThemeInner/></ThemeProvide>
        </>
    )
}


const UseContextWrapper: React.FC = () => {

    return (<CodeWrapper component={UseContext} innerHtml={useContext}/>)
}
export default React.memo(UseContextWrapper)