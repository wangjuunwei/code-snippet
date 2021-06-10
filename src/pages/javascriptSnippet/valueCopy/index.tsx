import React from 'react'
import {InjectObjAssign, deepCopy3} from './copy'
import CodeWrapper from "@component/createCodeWrapper.tsx";
import valueCopy from './valueCopy.md'
import {Button, Card, Col, Row} from "antd";

/**
 * @summary 深拷贝
 * @param source 拷贝原对象
 */
function deecopy(source: object) {

    console.log("深拷贝结果", deepCopy3(source));
    return deepCopy3(source)
}

/**
 * @summary 浅拷贝
 * @param sources 拷贝愿对象
 */
function copy(...sources: any[]) {

    //@ts-ignore

    console.log("浅拷贝结果", Object.assign2({}, ...sources));
    //@ts-ignore

    return Object.assign2({}, ...sources)
}

const ValueCopy: React.FC = () => {

    InjectObjAssign()
    const [initValue] = React.useState<object>({
        name: "muyiy",
        book: {
            title: "You Don't Know JS",
            price: "45"
        },
        a1: undefined,
        a2: null,
        a3: 123,
    })


    return (
        <>
            <Row>
                <Col span={8}>
                    <Card hoverable title="点击进行浅拷贝" bordered>
                        <Button type="primary" onClick={() => {
                            copy(initValue)
                        }}>点击进行浅拷贝</Button>
                    </Card>
                </Col>
                <Col span={8} push={1}>
                    <Card hoverable title="点击进行深拷贝" bordered>
                        <Button type="primary" onClick={() => {
                            deecopy(initValue)
                        }}>点击进行深拷贝</Button>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

const ValueCopyWrapper: React.FC = () => {

    return (
        <CodeWrapper component={ValueCopy} innerHtml={valueCopy}/>
    )
}

export default React.memo(ValueCopyWrapper)
