import * as React from "react";

import {base} from './base'

interface IocInterFace {
    children?: React.ReactNode
}

const IOCClass: React.FC<IocInterFace> = props => {
    console.log("base===", base.info());
    return (
        <div>12312312312312313</div>
    )
}
export default React.memo(IOCClass)