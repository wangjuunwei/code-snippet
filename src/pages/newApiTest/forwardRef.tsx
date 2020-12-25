import React from 'react'

const ForwardRef: React.FC = props => {

    return (<div>函数饮用的ForwardRef</div>)
}

export default React.memo(ForwardRef)