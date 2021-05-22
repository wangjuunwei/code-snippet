import React from 'react'

import {Wrapper,CodeAction} from "./css/codeWrapper";
import {Divider} from 'antd';
import MarkDownComponent from "./createMarkDown";

interface CodeWrapperType {
    component: React.FC,
    innerHtml: string
}

const CodeWrapper: React.FC<CodeWrapperType> = ({...props}) => {
    console.log("props===", props);
    const [isShow, setIshow] = React.useState<boolean>(false)


    return (
        <div>
            <Wrapper>
                <section className='code-box-demo'>
                    <props.component/>
                </section>
                <Divider orientation="left">内容简介</Divider>
                <section className='code-box-meta'></section>
                <CodeAction className='code-box-actions' isShow={isShow}>
                <span className='code-box-code-action' onClick={() => setIshow((pre) => !pre)}>
                    {!isShow ?
                        <img alt="expand code" src="https://gw.alipayobjects.com/zos/antfincdn/Z5c7kzvi30/expand.svg"
                             className={!isShow ? 'code-expand-icon-show' : 'code-expand-icon-hide'}/> :
                        <img alt="expand code" src="https://gw.alipayobjects.com/zos/antfincdn/4zAaozCvUH/unexpand.svg"
                             className={isShow ? 'code-expand-icon-show' : 'code-expand-icon-hide'}/>}
                </span>
                </CodeAction>
                {isShow && <section className='highlight-wrapper'><MarkDownComponent innerHtml={props.innerHtml}/></section>}
            </Wrapper>
        </div>
    )

}
export default CodeWrapper