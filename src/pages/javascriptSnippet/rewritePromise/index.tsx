import React from "react";
import Rpromise from './Promise'
import CodeWrapper from "@component/createCodeWrapper.tsx";
import RpromiseMd from './rewritePromise.md'

const fn: () => Rpromise<string> = () => {
    return new Rpromise((resolve, reject) => {

        setTimeout(() => {

            resolve('Promise 修改状态')
        }, 2000)
    })
}

const PromisePR: React.FC = () => {

    const [value, setValue] = React.useState<string>('初始状态')
    React.useEffect(() => {
        async function promise() {
            let res: any = await fn()
            setValue(res)
            console.log("res===", res);
        }

        promise()
    }, [])


    return (
        <>我会根据Promise的返回值更改状态：{value}</>
    )
}


const RpromiseWrapper: React.FC = () => {

    return (
        <CodeWrapper component={PromisePR} innerHtml={RpromiseMd}/>
    )
}
export default React.memo(RpromiseWrapper)
