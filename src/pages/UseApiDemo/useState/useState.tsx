import React from 'react'
import {Wrapper, Title} from './css/useState'
import {Button} from 'antd'
import CodeWrapper from '../../../component/createCodeWrapper'

import useState from './useState.md'

interface UseStateInteface<T> {
    count: T
}

/**
 * @deprecated useState 的 TypeScript 定义
 *
 * type Dispatch<A> = (value: A) => void
 *
 * type SetStateAction<S> = S | ((prevState: S) => S)
 *
 * function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
 *
 * function useState<S = undefined>(): [S | undefined, Dispatch<SetStateAction<S | undefined>>];
 */

/**
 * TODO 基础用法
 * @description  setState 函数用于更新 state。它接收一个新的 state 值并将组件的一次重新渲染加入队列。
 * @return 返回一个state，以及更新state的函数
 */
const SimpleUseState: React.FC<{}> = () => {

    const [simpleState, setSimpleState] = React.useState<number>(0);

    const changeSimpleState = (count: number) => {

        setSimpleState(count)
    }
    return (
        <div className='simpleBox'>
            <Title>{simpleState}</Title>
            <Button className='simpleBox-button' type="primary"
                    onClick={() => changeSimpleState(simpleState + 1)}>我是基础用法</Button>
        </div>
    )
}

/**
 * TODO 函数式更新
 * @description 如果新的 state 需要通过使用先前的 state 计算得出，那么可以将函数传递给 setState。该函数将接收先前的 state，并返回一个更新后的值。
 * @param count
 * @constructor
 */
const FunUseState: React.FC<UseStateInteface<number>> = ({count}) => {

    const [funState, setFunState] = React.useState<number>(count)

    return (
        <div className='simpleBox'>
            <Title>{funState}</Title>
            <Button className='simpleBox-button' type="primary"
                    onClick={() => setFunState((precode) => precode + 1)}>我式函数用法点击+1</Button>
            <Button className='simpleBox-button' type="primary"
                    onClick={() => setFunState((precode) => precode - 1)}>我是函数用法点击-1</Button>
        </div>
    )
}

const UseState: React.FC = () => {
    return (
        <>
            <Wrapper>
                <SimpleUseState></SimpleUseState>
                <FunUseState count={0}></FunUseState>
            </Wrapper>
        </>
    )
}

const UseStateWrapper: React.FC = () => {
    return (
        <CodeWrapper component={UseState} innerHtml={useState} />
    )
}

export default React.memo(UseStateWrapper)