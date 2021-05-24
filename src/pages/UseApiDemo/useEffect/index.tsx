import React from "react";
import CodeWrapper from "../../../component/createCodeWrapper";
import useState from "./useEffect.md";

const UseState: React.FC<{}> = () => {

    return (
        <>我是FunUseEffect 函数</>
    )
}

const UseEffectWrapper: React.FC = () => {
    return (
        <CodeWrapper component={UseState} innerHtml={useState} />
    )
}

export default React.memo(UseEffectWrapper)

