import React from "react";
import CodeWrapper from "../../../component/createCodeWrapper";
import useReduder from "./useReducer.md";
import {Button} from "antd";
import styled from "styled-components/macro";

const CounterWrapper = styled.div`
  div, p {
    text-align: center;
  }
`

/**
 * @description state 参数定义
 */
type stateData = {
    count: number
}
/**
 * @description action 参数定义
 */
type actionData = {
    type: string, payload?: any
}
/**
 * @description reducer 函数定义
 */
type reducerData = (state: stateData, action: actionData) => any


/**
 * @description useReducer 初始化函数
 * @param initialCount 初始值
 */
const initFunction: (initialCount: number) => object = (initialCount) => {

    return {count: initialCount}
}


/**
 * @description useReducer reducer函数
 * @param state state值
 * @param action 触发器
 */
const reducer: reducerData = (state, action) => {
    switch (action.type) {
        case 'increment':
            return {count: state.count + 1};
        case 'decrement':
            return {count: state.count - 1};
        case 'reset':
            return initFunction(action.payload);
        default:
            throw new Error();
    }
}

/**
 * @description useReducer 计算函数
 * @param initialCount 初始化值
 * @constructor
 */
const Counter: React.FC<{ initialCount: number }> = ({initialCount}) => {

    const [state, dispatch] = React.useReducer(reducer, initialCount, initFunction)
    return (
        <CounterWrapper>
            <p>当前计数值: {state.count}</p>
            <div>
                <Button onClick={() => dispatch({type: 'decrement'})}>-</Button>
                <Button
                    onClick={() => dispatch({type: 'reset', payload: initialCount})}>
                    重置
                </Button>
                <Button onClick={() => dispatch({type: 'increment'})}>+</Button>
            </div>
        </CounterWrapper>
    )
}
/**
 * @description useReducer 包裹以及初始化函数
 */
const UseReduder: React.FC = () => {

    return (
        <><Counter initialCount={2}/></>
    )

}

const UseReducerWrapper: React.FC = () => {

    return (
        <CodeWrapper component={UseReduder} innerHtml={useReduder}/>

    )
}

export default React.memo(UseReducerWrapper)