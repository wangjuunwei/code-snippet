import React from 'react'
import Form from './components/form'
import CodeWrapper from "@component/createCodeWrapper";
import JWTMD from './jwt.md'

/**
 * @summary 欢迎组件
 * @constructor
 */
const JWT: React.FC<{}> = () => {
    return (
        <>
            <CodeWrapper component={Form} innerHtml={JWTMD}></CodeWrapper>
        </>
    )

}


export default React.memo(JWT)
