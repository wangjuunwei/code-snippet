import React from 'react'
import {Wrapper, Title} from './css/useState'
import {Button} from 'antd'

const UseState: React.FC = () => {

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


    const [simpaleText, setSimpleText] = React.useState<string>('我是useState的最基础版本')


    return (
        <>
            <Wrapper>
                <div className='simpleBox'>
                    <Title>{simpaleText}</Title>
                    <Button className='simpleBox-button' type="primary"
                            onClick={() => setSimpleText('我变形成功了')}>点击我我会变形的</Button>
                </div>

            </Wrapper>
        </>
    )
}

export default UseState