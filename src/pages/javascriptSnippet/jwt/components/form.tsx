import React, {MutableRefObject} from 'react'
import Captcha from './captcha'
import {Form, Row, Input, Button, Col, Tabs, message} from 'antd';
import {UserHttpRequest} from '@HttpRequest/jwt/index'
import {RegisterData} from "@typings/jwt/index";
import UserInfo from "./userInfor";
import md5 from 'md5'

const {TabPane} = Tabs;

const layout = {
    labelCol: {push: 6, span: 3},
    wrapperCol: {push: 6, span: 9},
};
const tailLayout = {
    wrapperCol: {offset: 9, span: 16},
};

const FormInner = ({onRemoveAuth}: { onRemoveAuth: () => void }) => {

    const [form] = Form.useForm();
    const onFinish = async (values: RegisterData) => {
        console.log('Success:', values);
        const value = JSON.parse(JSON.stringify(values))
        value.passwd = md5(value)
        const res = await new UserHttpRequest().register(value)
        if (res && res.success === -1) {

            message.error(res.message)

            return
        }
        form.resetFields()
        onRemoveAuth()
        message.success('注册成功，请登陆')
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            {...layout}
            form={form}
            name="basic"
            initialValues={{}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="用户名"
                name="nickName"
                rules={[{required: true, message: '请输入正确的用户名称!'}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="密码"
                name="passwd"
                rules={[{required: true, message: '请输入正确的密码!'}]}
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item name='email' label="Email" rules={[{required: true, type: 'email', message: '请输入正确的Emil!'}]}>
                <Input/>
            </Form.Item>
            <Form.Item
                label="验证码"
                name="captcha"
                rules={[{required: true, message: '请输入正确正确的验证码'}]}
            >
                <Row>
                    <Col span={12}>
                        <Input/>
                    </Col>
                    <Col push={1} span={10}>
                        <Captcha/>
                    </Col>
                </Row>
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    注册
                </Button>
            </Form.Item>
        </Form>
    );
};

const Login = ({onSetToken}: { onSetToken: (value: string) => void }) => {
    const [form] = Form.useForm();
    const onFinish = async (values: RegisterData) => {
        try {
            const value = JSON.parse(JSON.stringify(values))
            value.passwd = md5(value)
            const res = await new UserHttpRequest().login(value)

            if (res && res.success === -1) {

                message.error(res.message)

                return
            }
            console.log("form===", form);
            form.resetFields()
            message.success('登陆成功')
            onSetToken(res.token)

        } catch (e) {
            message.success('登陆失败')
        }

    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            {...layout}
            form={form}
            name="basic"
            initialValues={{}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item name='email' label="Email" rules={[{required: true, type: 'email', message: '请输入正确的Emil!'}]}>
                <Input/>
            </Form.Item>

            <Form.Item
                label="密码"
                name="passwd"
                rules={[{required: true, message: '请输入正确的密码!'}]}
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item
                label="验证码"
                name="captcha"
                rules={[{required: true, message: '请输入正确正确的验证码'}]}
            >
                <Row>
                    <Col span={12}>
                        <Input/>
                    </Col>
                    <Col push={1} span={10}>
                        <Captcha/>
                    </Col>
                </Row>
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    登陆
                </Button>
            </Form.Item>


        </Form>
    );
}

interface RefObject {
    removeUserInfo: () => void
}


const JwtForm: React.FC = () => {

    const [jsToken, setJsToken] = React.useState<string | null>('')

    const childRef: MutableRefObject<any> = React.useRef('');


    const handleRemove = () => {
        setJsToken('')
        const node = childRef.current && childRef.current
        node.removeUserInfo()
    }
    return (
        <>

            <Tabs centered={true} defaultActiveKey="1" onChange={() => {
            }}>
                <TabPane tab="注册" key="1">
                    <FormInner onRemoveAuth={() => handleRemove()}></FormInner>
                </TabPane>
                <TabPane tab="登陆" key="2">
                    <Login onSetToken={(value) => setJsToken(JSON.stringify(value))}></Login>
                </TabPane>
            </Tabs>
            <Button onClick={() => setJsToken(JSON.stringify(localStorage.getItem('token')))}>点击查看JSToken</Button>
            <pre style={{marginTop: '20px'}}>JSTOken: {jsToken}</pre>
            <UserInfo ref={childRef}/>
        </>
    )
}
export default React.memo(JwtForm)
