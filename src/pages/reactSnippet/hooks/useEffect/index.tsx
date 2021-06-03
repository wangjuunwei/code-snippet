import React from "react";
import CodeWrapper from "@component/createCodeWrapper";
import useEffect from "./useEffect.md";

import {Row, Col, Card, Button} from 'antd'

/**
 * @deprecated useEffect 的 TypeScript 定义
 *
 * function useLayoutEffect(effect: EffectCallback, deps?: DependencyList): void;
 */


/**
 * @TODO  不需要清除的Effect
 * @description 在React 更新DOM之后额外的代码（例如：发送网络请求、手动变更DOM、记录日志）常见的无需清除操作
 */
const NotCleanEffect: React.FC = () => {
    const [count, setCount] = React.useState<number>(0)

    React.useEffect(() => {
        console.log('NotCleanEffect====>effect', count)
    })

    return (
        <>
            <p>点击{count}的次数</p>
            <Button type="primary" onClick={() => setCount(count + 1)}>
                点击
            </Button>
        </>
    )

}

/**
 * @TODO  需要清除的Effect
 * @constructor
 */
const NeedCleanEffect: React.FC = () => {

    const [loading, setloading] = React.useState<boolean>(true)

    React.useEffect(() => {
        let mounted = true
        let timer = setInterval(() => {
            if (mounted) {
                setloading(false)
            }
        }, 1000)

        return () => {
            mounted = false
            clearInterval(timer)
        }
    })

    return (
        <>
            <div>{loading ? <p>loading...</p> : <p>Fetched!!</p>}</div>
            <Button type="primary">
                点击
            </Button>
        </>
    )
}

/**
 * @TODO 同时使用多个Effect
 * @constructor
 */
const MultipleEffect: React.FC = () => {
    const [count, setCount] = React.useState<number>(0)

    React.useEffect(() => {
        console.log('MultipleEffect First====>effect', count)
    })

    React.useEffect(() => {
        console.log('MultipleEffect Second====>effect', count)
    })

    return (
        <>
            <p>点击{count}的次数</p>
            <Button type="primary" onClick={() => setCount(count + 1)}>点击+1</Button>
        </>
    )
}

/**
 * @TDOO 通过跳过 Effect 进行性能优化
 * @constructor
 */
const NeedJumpEffect: React.FC = () => {
    const [count, setCount] = React.useState<number>(0)

    const [value, setValue] = React.useState<number>(0)

    React.useEffect(() => {
        console.log('NeedJumpEffect ====>effect', value)
    }, [value])


    return (
        <>
            <p>无影响{count}的次数,有影响的{value}的次数</p>
            <Button type="primary" onClick={() => setCount(count + 1)}>点击+1</Button>
            <Button style={{marginLeft: '10px'}} type="primary" onClick={() => setValue(value + 1)}>点击+1</Button>
        </>
    )
}


/**
 * @TODO UseEffect 清除函数
 * @constructor
 */
const UseEffect: React.FC = () => {
    return (
        <>
            <Row gutter={16}>
                <Col span={8}>
                    <Card hoverable title="不需清除的effect" bordered>
                        <NotCleanEffect/>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card hoverable title="需要清除的effect" bordered>
                        <NeedCleanEffect/>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card hoverable title="使用多个effect" bordered>
                        <MultipleEffect/>
                    </Card>
                </Col>
            </Row>
            <Row gutter={16} style={{marginTop:'20px'}}>
                <Col span={8}>
                    <Card hoverable title="可以跳过effect的优化" bordered>
                        <NeedJumpEffect/>
                    </Card>
                </Col>

            </Row>
        </>
    )
}

const UseEffectWrapper: React.FC = () => {
    return (
        <CodeWrapper component={UseEffect} innerHtml={useEffect}/>
    )
}

export default React.memo(UseEffectWrapper)

