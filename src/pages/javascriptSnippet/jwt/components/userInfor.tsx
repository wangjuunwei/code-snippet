import React, {Ref, forwardRef, ForwardRefExoticComponent} from "react";
import {UserHttpRequest} from "@HttpRequest/jwt";
import {Button, message} from "antd";

interface RefObject {
    removeUserInfo: () => void
}

const UserInfo = (props: {}, ref: Ref<RefObject>): JSX.Element => {


    const [userInfor, setUerInfo] = React.useState<string>('')


    const removeUserInfo = React.useCallback(() => {
        setUerInfo('')

    }, [])
    const getUserInfo = async (): Promise<void> => {


        let res = await new UserHttpRequest().info()

        if (res && res.success === -1) {

            message.error(res.message)

            return
        }
        setUerInfo(JSON.stringify(res))
    }

    React.useImperativeHandle(ref, () => {
        return {
            removeUserInfo
        }
    });


    return (
        <>
            <Button onClick={() => getUserInfo()}>点击获取用户信息</Button>
            <pre style={{marginTop: '20px'}}>{userInfor}</pre>
        </>
    )

}
const Wrap: ForwardRefExoticComponent<any> = React.memo(forwardRef(UserInfo))


export default Wrap
