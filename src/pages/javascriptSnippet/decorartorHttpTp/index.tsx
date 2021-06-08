import React, {useEffect} from "react";
import {HttpRequest} from './HttpRequest'
import CodeWrapper from "@component/createCodeWrapper.tsx";
import decoratorHttp from './decoratorHttp.md'

const DecoratorHttp: React.FC = () => {

    useEffect(() => {
        const testFunction = async () => {
            const test = new HttpRequest()
            let end = await test.test({id: 1})
            console.log(end)
        };
        testFunction();
    }, [])


    return (
        <>我会发送一个请求，请结合Network查看</>
    )
}

const DecoratorHttpWrap: React.FC = () => {

    return (
        <CodeWrapper component={DecoratorHttp} innerHtml={decoratorHttp}/>
    )
}

export default React.memo(DecoratorHttpWrap)
