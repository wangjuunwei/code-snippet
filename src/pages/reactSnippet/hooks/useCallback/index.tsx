import React from "react";
import CodeWrapper from "@component/createCodeWrapper.tsx";

import useCallback from './useCallback.md'

import {Button} from "antd";

import styled from "styled-components/macro";

const UseCallbackWp = styled.div`
  div, p {
    text-align: center;
  }
`

const UseCallback: React.FC = () => {

    const [value, setValue] = React.useState<number>(1)
    const memoizerCallback = React.useCallback(() => {
        console.log('usecallback 触发', value)
    }, [value])


    const handleButtonCb = () => {
        setValue((pre) => pre + 1)
        memoizerCallback()
    }

    return (
        <UseCallbackWp>
            <p>当前valuede的修改值:{value}</p>
            <div><Button type="primary" onClick={handleButtonCb}>点击测试Context的console</Button></div>
        </UseCallbackWp>
    )


}

const UseCallbackWrapper: React.FC = () => {

    return (
        <CodeWrapper component={UseCallback} innerHtml={useCallback}/>
    )
}
export default React.memo(UseCallbackWrapper)