import React, {FC, memo, useEffect, useState} from "react";
import {UserHttpRequest} from '@HttpRequest/jwt/index'
import {PicCapchaWrpper} from '../css/index'


const handlercaptch: () => Promise<{ captcha?: string }> = async () => {

    return await new UserHttpRequest().getCaptcha()


}
const Captcha: FC = () => {
    const [imgSrc, setImgSrc] = useState<string | undefined>('')
    useEffect(() => {
        const getCaptcha = async () => {

            try {
                let {captcha} = await handlercaptch()
                captcha && setImgSrc(captcha)
            } catch (e) {
                console.log("e===", e);
            }
        };
        getCaptcha();
    }, [])


    const handlerOnclick = async () => {

        let {captcha} = await handlercaptch()

        setImgSrc(captcha)
    }
    return (
        <>

            {imgSrc &&
            <PicCapchaWrpper className='' onClick={() => handlerOnclick()} dangerouslySetInnerHTML={{__html: imgSrc}}/>}
        </>
    )
}

export default memo(Captcha)
