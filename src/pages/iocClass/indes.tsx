import * as React from "react";

import {base} from './base'

const IOCClass: React.FC = (props) => {
    console.log("props===", props);
    console.log("base===", base);
    return (
        <div>12312312312312313</div>
    )
}
export default React.memo(IOCClass)