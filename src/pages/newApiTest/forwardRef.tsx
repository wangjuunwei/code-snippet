import React from 'react'

import Copy from './components/copy'

const ForwardRefFun: React.FC = () => {
    let textValue = '什么贵'
    return (
        <Copy>
            <button type='submit'>复制</button>
        </Copy>
    )
}

export default React.memo(ForwardRefFun)


